import BaseController from '@/core/baseController';
import { SelfController as Controller, Post, Get } from '@/router';
import { create as captchaCreate } from 'svg-captcha';
import { Auth } from '@/lib//decorator/auth';
// import { LoginType } from '@/lib/enum';
@Controller('/user')
export default class UserController extends BaseController {
  // @Auth(LoginType.ADMIN)
  /**
   * 登陆
   */
  @Post('/login')
  @Get('/login')
  public async login(): Promise<void> {
    // this.ctx.setToken({
    //   name: 1,
    //   userUuid: 1,
    //   userName: 2,
    //   userType: 3,
    //   orgUuid: 5
    // });
    // const captcha = this.ctx.cookies.get('captcha', { encrypt: true } );
    // this.ctx.logger.info(captcha);
    const host = this.ctx.request.host;
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      this.ctx.session.userInfo = {
        access_token: 'u-PIVb1Apyf91cUt2Cj9Lnsf',
        name: 'Taylor',
        avatar_url: 'https://s3-imfile.feishucdn.com/static-resource/v1/v2_26cec684-3bf4-406c-854c-50a3d79320ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp',
        avatar_thumb: 'https://s3-imfile.feishucdn.com/static-resource/v1/v2_26cec684-3bf4-406c-854c-50a3d79320ag~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp',
        union_id: 'on_2b01e84dba5cea2618a5b54b6d820de1',
        token_type: 'Bearer'
      };
      return this.ctx.redirect('/#/salesInformation');
    }
    const url = `https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=http://maitian2.dcpool.net/api/user/auth&app_id=cli_a02b668b45799013&state=HtU64rLTVEH6M8YZuItgHg4xQLCKQuqf`;
    // this.success(url, '登陆成功!');
    this.ctx.redirect(url);
    
  }

  @Get('/info')
  @Auth()
  public userInfo() {
    const userinfo = this.ctx.session.userInfo;
    this.success(userinfo);
  }

  /**
   * 飞书授权回调接口
   */
  @Get('/auth')
  public async auth() {
    const { ctx } = this;
    const { code } = ctx.request.query;
    if (!code) {
      return this.fail(0, '飞书授权回调code不存在');
    }
    const result = await ctx.service.feishu.getUserAccessToken(code);
    const userInfo = {
      access_token: result.access_token,
      name: result.name,
      avatar_url: result.avatar_url,
      avatar_thumb: result.avatar_thumb,
      open_id: result.openid,
      union_id: result.union_id,
      token_type: result.token_type
    };
    this.ctx.session.userInfo = userInfo;
    this.ctx.service.feishu.sendLoginNotice(userInfo);
    this.ctx.redirect('/#/salesInformation');
  }

  /**
   * 登出
   */
  @Auth()
  @Post('/logOut')
  public async loginOut(): Promise<void> {
    // this.ctx.removeToken();
    this.ctx.session.userInfo = null;
    this.success([], '操作成功');
  }
  /**
   * 获取验证码
   */
  @Get('/getCaptcha')
  public async getCaptcha(): Promise<void> {
    /** 验证码默认配置 */
    const defaultOptions = {
      size: 4, // size of random string
      ignoreChars: '', // filter out some characters
      noise: 1, // number of noise lines
      color: false, // default grey, true if background option is set
      background: '#ffffff', // background color of the svg image
      width: 120, // width of captcha
      height: 40, // height of captcha
      // fontPath: './fonts/Comismsh.ttf', // your font path
      fontSize: 60, // captcha text size
      charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // random character preset
    };
    const { data, text } = captchaCreate(defaultOptions);

    // this.ctx.session.captcha = text;
    this.ctx.cookies.set('captcha', text, { sameSite: 'none', encrypt: true });
    this.ctx.type = 'svg';
    this.ctx.body = data;
  }

  public async error() {
    throw new Error('see the error stack!!');
  }
}
