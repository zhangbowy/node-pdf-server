const puppeteer = require('puppeteer');
import { Service } from 'egg';
const dayjs = require('dayjs');
const FormStream = require('formstream');

export default class PDFService extends Service {
    // @ts-ignore
    readonly config = {
        headless: true,
        // executablePath: '/usr/bin/chromium-browser',
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
        ],
    };

    /**
     * 回调地址
     */
    readonly callBackUrl: string = 'http://daily-qapi.forwe.store/api/spf-cc/html2pdf/html2PdfResult'
    /**
     * dinging通知1地址
     */
    readonly web_hook: string = this.ctx.app.config.web_hook;
    /**
     * 生成PDF
     */
    public async buildPdf(url): Promise<Buffer> {
        const browser = await puppeteer.launch(this.config);
        try {
            const page = await browser.newPage();
            // this.ctx.logger.info('browser');
            await page.setViewport({
                width: 1920,
                height: 1080
            });
            // this.ctx.logger.info('page');
            await page.goto(url, {
                waitUntil: 'networkidle0',
                timeout: 0
            })

            const pdfBuffer = await page.pdf({
                // headerTemplate,
                // footerTemplate,
                margin: {
                    top: 50,
                    bottom: 50,
                    left: 0,
                    right: 0
                },
                displayHeaderFooter: false,
                printBackground: true,
            });
            this.ctx.logger.info('pdfBuffer');
            return pdfBuffer
        } catch (e) {
            throw e;
        } finally {
            browser.close()
        }
    }


    /**
     * 异步执行Html转PDF
     * @param url
     * @param taskId
     */
   public async createPdf(url, taskId): Promise<void> {
        try {
            const pdf = await this.buildPdf(url)
            const fileName = await this.service.oss.createFileName()
            const ossResult = await this.service.oss.putFile(pdf, `${fileName}.pdf`)
            if (!ossResult.url) {
                this.ctx.logger.error('上传oss失败 taskId: ',taskId, ossResult)
                await this.ddBot('上传oss失败 taskId: '+ taskId, ossResult);
                return
            }
            const params = {
                taskId,
                ossUrl: ossResult.url
            }
            const result = await this.notify(params)
            if (!result) {
                await this.ddBot('通知回调失败 taskId: '+ taskId, params);
                return
            }
            this.ctx.logger.info('通知成功taskId: ',taskId)
        } catch (e: any) {
            await this.ddBot('生成失败taskId: ' + taskId, e)
            this.ctx.logger.error('生成失败taskId: ',taskId, e.message || e)
        }
    }

    /**
     * 通知生成成功
     * @param data
     * @private
     */
    private async notify(data): Promise<boolean> {
        try {
            const form = new FormStream();
            form.field('ossUrl', data.ossUrl);
            form.field('taskId', data.taskId);
            const result = await this.ctx.curl(this.callBackUrl, {
                method: 'POST',
                dataType: 'json',
                headers: form.headers(),
                stream: form,
                timeout: 20000,
            });
            if (result) {
                return true
            }
            return false
        } catch (e) {
            return false
        }
    }

    /**
     * 钉钉机器人群消息推送
     * @param $msg
     * @param $start_time
     * @param $success
     */
    private ddBot(title,$msg: any) {
        const end_time: string = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const msg: string = "### 通知\n" +
            '--- \n' +
            "- 时间： " + end_time + '\n' +
            `- 主题： ${title} \n` +
            `- 内容： ${JSON.stringify($msg)}\n`
            // `- 状态： ${$success ? '<font  color=green>成功!</font>' : '<font color=red>失败!</font>' }\n`;
        this.pushMsg(msg);
    }

    private async pushMsg(msg: any = {}){
        try {

            let options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                dataType: 'json',
                data: {
                    "msgtype": "markdown",
                    "markdown": {
                        "title":"消息推送",
                        "text": msg
                    },
                    "at": {
                        "atMobiles": [
                        ],
                        "isAtAll": false
                    }
                }
            };

            // @ts-ignore
            const result = await this.ctx.curl(this.web_hook, options);
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }


    // @ts-ignore
    private sleep(time): Promise {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            },time)
        })
    }

}

