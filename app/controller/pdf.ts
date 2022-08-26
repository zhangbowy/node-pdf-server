import BaseController from '@/core/baseController';
import { SelfController as Controller, Get, Post } from '@/router';
const pdfService = require('@/service/pdf');
const pdfCreateRule = {
    htmlUrl: { type: 'string', required: true },
    taskId: { type: 'number', required: true },
};
/**
 * PDF控制器
 */
@Controller('/pdf')
export default class PDFController extends BaseController {
    /**
     * 创建PDF
     * @param taskId {number} 任务id
     * @param htmlUrl {string} 报告链接
     */
    @Post('/create')
    public async create(): Promise<void> {
        try {
            const { ctx } = this;
            /**
             * 获取POST参数
             */
            const body = ctx.request.body;
            /**
             * 校验参数
             */
            const err = ctx.app.validator.validate(pdfCreateRule, body);
            if (err) {
                const [errFiled]  = err;
                const errMsg: string = `${errFiled.field } ${errFiled.message}`
                return this.fail(0, errMsg)
            }
            const { htmlUrl, taskId } = body
            /**
             * 异步执行生成PDF和通知
             */
            this.ctx.service.pdf.createPdf(htmlUrl, taskId)
            this.success([], '操作成功');
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
            this.fail(0, e.message || '服务器错误');
        }
    }
}
