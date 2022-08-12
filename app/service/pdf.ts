const puppeteer = require('puppeteer');
import { Service } from 'egg';
const dayjs = require('dayjs');
const FormStream = require('formstream');

export default class PDFService extends Service {
    // @ts-ignore
    readonly config = {
        headless: true,
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
    readonly callBackUrl: string = this.app.config.callBackUrl
    // readonly callBackUrl: string = 'http://10.255.8.78:8083/api/spf-cc/html2pdf/html2PdfResult'
    /**
     * dinging通知1地址
     */
    readonly web_hook: string = this.app.config.web_hook;
    /**
     * 生成PDF
     */
    public async buildPdf(url): Promise<Buffer> {
        const browser = await puppeteer.launch(this.config);
        try {
            const page = await browser.newPage();
            await page.setViewport({
                width: 1920,
                height: 1080
            });
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
        const params = {
            success: true,
            errorMessage: '',
            taskId,
            ossUrl: '',
        }
        try {
            const pdf = await this.buildPdf(url)
            const fileName = await this.service.oss.createFileName()
            const ossResult = await this.service.oss.putFile(pdf, `${fileName}.pdf`)
            if (!ossResult.url) {
                params.errorMessage = '上传oss失败 taskId'
                params.success = false
                this.ctx.logger.error('上传oss失败 taskId: ',taskId, ossResult)
                // await this.ddBot('上传oss失败 taskId: '+ taskId, ossResult);
            } else {
                params.ossUrl = ossResult.url
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
            params.errorMessage = '生成失败taskId' + e.message
            params.success = false
            await this.notify(params)
        }
    }


    /**
     * 生成PDF
     */
    public async buildImage(url): Promise<Buffer> {
        const browser = await puppeteer.launch(this.config);
        try {
            const page = await browser.newPage();

            await page.goto(url, {
                waitUntil: 'networkidle0',
                timeout: 0
            })



            // 这里我们获取到页面的宽度和高度
            const documentSize = await page.evaluate(() => {
                return {
                    // @ts-ignore
                    width: document.documentElement.clientWidth,
                    // @ts-ignore
                    height : document.body.offsetHeight,
                }
            })

            await page.setViewport({
                width: 832,
                height: documentSize.height
            });



            // 截屏的时候只截取当前浏览器窗口的尺寸大小
            // await page.screenshot({path:"example.png", clip : {x:0, y:0, width:1920, height:documentSize.height}});
            const imageBuffer = await page.screenshot({clip : {x:0, y:0, width:832, height: documentSize.height}});
            return imageBuffer
        } catch (e) {
            throw e;
        } finally {
            browser.close()
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
            form.field('errorMessage', data.errorMessage);
            form.field('success', data.success ? 1: 0);
            const result = await this.ctx.curl(this.callBackUrl, {
                method: 'POST',
                dataType: 'json',
                headers: form.headers(),
                stream: form,
                timeout: 20000,
            });
            return !!result;
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

