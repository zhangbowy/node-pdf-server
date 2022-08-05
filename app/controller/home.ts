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

  @Get('/getPdf')
  public async getPdf() {
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({ headless: true });
    this.ctx.logger.info('browser');
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080
    });
    this.ctx.logger.info('page');
    await page.goto('https://juejin.cn/user/3104676568630520', {waitUntil: 'networkidle0'});
    this.ctx.logger.info('page2');


    // 页眉模板（图片使用base64，此处的src的base64为占位值）
    const headerTemplate = `<div
style="width: calc(100% - 28px); margin-top: -13px; font-size:8px;border-bottom:2px solid #e1dafb;padding:6px 14px;display: flex; justify-content: space-between; align-items:center;">
<span style="color: #9a7ff7; font-size: 12px; font-family: my-font;">张博的模板</span>
<img style="width: 80px; height: auto;" src="data:image/png;base64,iVBORw0KGgoAAAxxxxxx" />
</div>`;
    // 页脚模板（pageNumber处会自动注入当前页码）
    const footerTemplate = `<div 
style="width:calc(100% - 28px);margin-bottom: -20px; font-size:8px; padding:15px 14px;display: flex; justify-content: space-between; ">
<span style="color: #9a7ff7; font-size: 10px;">蒲公英绩效</span>
<span style="color: #9a7ff7; font-size: 13px;" class="pageNumber"></span> 
</div>`;

    const pdf = await page.pdf({
      headerTemplate,
      footerTemplate,
      margin: {
        top: 50,
        bottom: 50,
        left: 0,
        right: 0
      },
      displayHeaderFooter: true,
      printBackground: true,
    });
    this.ctx.logger.info('pdf');
    // const pdf = await page.pdf({ format: 'A4' });
    await browser.close();
    this.ctx.res.setHeader('Content-Type','application/pdf');
    this.ctx.res.setHeader('Content-Length', pdf.length );
    this.ctx.body = pdf;
    // this.success([], '请求成功');
  }
}
