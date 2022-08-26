import BaseController from '@/core/baseController';
import { SelfController as Controller, Get } from '@/router';
// import { Auth } from '@/lib//decorator/auth';
// import { LoginType } from '@/lib/enum';
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
   * @return
   */
  @Get('getPdf')
  public async getPdf(): Promise<void> {
    try {
      const { url = 'http://localhost:8001/public/index.html' } = this.ctx.request.query;
      const pdf = await this.service.pdf.buildPdf(url)
      this.ctx.logger.info('pdf');
      this.ctx.res.setHeader('Content-Type', 'application/pdf');
      this.ctx.res.setHeader('Content-Length', pdf.length);
      this.ctx.body = pdf;
    } catch (e: any) {
      this.fail(0, e.message || '服务器错误' );
    }
  }

  /**
   * html2Image
   * @param url {string} 链接
   */
  @Get('html2Image')
  public async html2Image(): Promise<void> {
    try {
      const { url = 'http://localhost:8001/public/index.html' } = this.ctx.request.query;
      const image = await this.service.pdf.buildImage(url)
      // const ossResult = await this.service.oss.putFile(pdf)
      this.ctx.logger.info('pdf');
      // const pdf = await page.pdf({ format: 'A4' });
      const fileName = this.service.oss.createFileName()

      this.ctx.res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}.PNG`);
      this.ctx.res.setHeader('Content-Type', 'image/png');
      this.ctx.res.setHeader('Content-Length', image.length);
      this.ctx.body = image;
      // this.success(ossResult, '请求成功');
    } catch (e: any) {
      this.fail(0, e.message || '服务器错误' );
    }
  }
}
