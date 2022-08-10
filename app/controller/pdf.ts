import BaseController from '@/core/baseController';
import { SelfController as Controller, Get, Post } from '@/router';
// import { Auth } from '@/lib//decorator/auth';
// import { LoginType } from '@/lib/enum';
const pdfService = require('@/service/pdf');

const pdfCreateRule = {
    url: { type: 'string', required: true },
};

/**
 * PDF生成控制器
 */
@Controller('/pdf')
export default class PDFController extends BaseController {
    @Get('/')
    public async index(): Promise<void> {
        const header = this.ctx.request.headers;
        this.success({header, ctx: this.ctx}, '请求成功');
    }

    /**
     * 创建PDf
     * @param url {string} 报告链接
     */
    @Post('/create')
    public async create(): Promise<void> {
        try {
            const {ctx} = this;
            const body = this.ctx.request.body;
            const err = ctx.app.validator.validate(pdfCreateRule, body);
            if (err) {
                const [errFiled]  = err;
                const errMsg: string = `${errFiled.field } ${errFiled.message}`
                return  this.fail(0, errMsg)
            }
            const { url } = body
            const pdf = await pdfService.buildPdf(url)
            const fileName = await this.service.oss.createFileName()
            const ossResult = await this.service.oss.putFile(pdf, `${fileName}.pdf`)
            if (!ossResult.url) {
                return  this.fail(0, ossResult || '服务器错误' );
            }
            this.ctx.logger.info('pdf');
            this.success(ossResult, '创建成功');
        } catch (e: any) {
            this.fail(0, e.message || '服务器错误' );
        }
    }


    /**
     * 生成PDF
     * @param url {string} 报告链接
     */
    @Get('test')
    public async getPdf(): Promise<void> {
        try {
            const { url = 'http://localhost:7001/public/index.html' } = this.ctx.request.query;
            const pdf = await pdfService.buildPdf(url)
            const ossResult = await this.service.oss.putFile(pdf, `zhangbotest.pdf`)

            // this.ctx.logger.info('pdf');
            // this.ctx.res.setHeader('Content-Type', 'application/pdf');
            // this.ctx.res.setHeader('Content-Length', pdf.length);
            // this.ctx.body = pdf;
            this.success(ossResult, '请求成功');
        } catch (e: any) {
            this.fail(0, e.message || '服务器错误' );
        }
    }
}
