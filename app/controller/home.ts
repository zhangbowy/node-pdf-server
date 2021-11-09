import BaseController from '@/core/baseController';
import { SelfController as Controller, Get } from './../router';
// import { Auth } from '@/lib//decorator/auth';
// import { LoginType } from '@/lib/enum';
@Controller('/')
export default class HomeController extends BaseController {
  // @Auth(LoginType.ADMIN)
  @Get('/')
  public async index(): Promise<void> {
    this.success('请熟读文档', '请求成功');
  }

  /**
   * 
   */
  // @Auth(LoginType.ADMIN)
  @Get('/list')
  public slider() {
    this.success([], '请求成功');
  }
  public async error() {
    throw new Error('see the error stack!!');
  }
}
