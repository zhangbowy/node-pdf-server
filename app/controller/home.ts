import BaseController from '@/core/baseController';
import { SelfController as Controller, Get } from '@/router';
// import { Auth } from '@/lib//decorator/auth';
// import { LoginType } from '@/lib/enum';
const pdfService = require('@/service/pdf')
@Controller('/')
export default class HomeController extends BaseController {
  @Get('/')
  public async index(): Promise<void> {
    const header = this.ctx.request.headers;
    this.success({header, ctx: this.ctx}, '请求成功');
  }
  /**
   * 生成PDF
   * @param url {string} 链接
   */
  @Get('getPdf')
  public async getPdf(): Promise<void> {
    try {
      const { url = 'http://localhost:8001/public/index.html' } = this.ctx.request.query;
      const pdf = await pdfService.buildPdf(url)
      // const ossResult = await this.service.oss.putFile(pdf)
      this.ctx.logger.info('pdf');
      // const pdf = await page.pdf({ format: 'A4' });
      this.ctx.res.setHeader('Content-Type', 'application/pdf');
      this.ctx.res.setHeader('Content-Length', pdf.length);
      this.ctx.body = pdf;
      // this.success(ossResult, '请求成功');
    } catch (e: any) {
      this.fail(0, e.message || '服务器错误' );
    }
  }
}
