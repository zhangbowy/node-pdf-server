const puppeteer = require('puppeteer');
import { Service } from 'egg';
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

    // private MAX_WSE = 1; // 启动几个浏览器
    // private WSE_LIST = []; // 存储browserWSEndpoint列表

    // private async init() {
    //         for (let i = 0; i < this.MAX_WSE; i++) {
    //             const browser = await puppeteer.launch(this.config);
    //             // @ts-ignore
    //             const v = await browser.version()
    //             // @ts-ignore
    //             this.WSE_LIST[i] = await browser.wsEndpoint();
    //             console.log(this.WSE_LIST[i], 'contect-------')
    //         }
    //
    //     // // @ts-ignore
    //     // process.exit(async () => {
    //     //     for (let i = 0; i < this.MAX_WSE; i++) {
    //     //         const browserWSEndpoint = this.WSE_LIST[i];
    //     //         const browser = await puppeteer.connect({browserWSEndpoint});
    //     //         await browser.close()
    //     //     }
    //     //     this.WSE_LIST = []
    //     // })
    // }


    /**
     * 生成PDF
     */
    public async buildPdf(url): Promise<Buffer> {
        // if(!this.WSE_LIST.length) {
        //     await this.init()
        // }
        const browser = await puppeteer.launch(this.config);
        //
        // const tmp = Math.floor(Math.random() * this.MAX_WSE);
        // const browserWSEndpoint = this.WSE_LIST[tmp];
        // const browser = await puppeteer.connect({browserWSEndpoint});
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


        // await this.sleep(5000)

        // this.ctx.logger.info('page2');
        // 页眉模板（图片使用base64，此处的src的base64为占位值）
        // const headerTemplate = ``;
        // 页脚模板（pageNumber处会自动注
        // 入当前页码）
//         const footerTemplate = `<div
// style="width:calc(100% - 28px);margin-bottom: -20px; font-size:8px; padding:15px 14px;display: flex; justify-content: space-between; ">
// <span style="color: #9a7ff7; font-size: 10px;">蒲公英绩效</span>
// <span style="color: #9a7ff7; font-size: 13px;" class="pageNumber"></span>
// </div>`;
//         await page.emulateMedia('screen');

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
        browser.close()
        return pdfBuffer
    }


   public async createPdf(url, taskId) {
        try {
            const pdf = await this.buildPdf(url)
            const fileName = await this.service.oss.createFileName()
            const ossResult = await this.service.oss.putFile(pdf, `${fileName}.pdf`)
            // if (!ossResult.url) {
            //     return  this.fail(0, ossResult || '服务器错误' );
            // }
            const params = {
                taskId,
                url: ossResult.url
            }
            await this.notify(params)
            this.ctx.logger.info('生成成功taskId: ',taskId)
        } catch (e: any) {
            this.ctx.logger.error('生成失败taskId: ',taskId, e.message || e)
            // await this.notify(params)
        }
    }

    private async notify(data) {
        return this.ctx.curl('https://open.feishu.cn/open-apis/authen/v1/access_token', {
            method: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        });
    }


    // @ts-ignore
    private sleep(time) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            },time)
        })
    }

}

