
import { Service } from 'egg';

export default class TestService extends Service {
    // tslint:disable-next-line:variable-name
    private app_access_token: string | null = null;
    /**
     * 获取飞书自建应用的Token
     */
    private async getAccessToken() {
        console.log(this.config.feishu);
        if (!this.app_access_token) {
            const result = await this.ctx.curl('https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal', {
                method: 'POST',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    app_id: this.config.feishu.appid,
                    app_secret: this.config.feishu.app_secret
                }
            });
            const { data: { app_access_token, expire, code } } = result;
            if (code === 0) {
                this.app_access_token = app_access_token;
                setTimeout(() => {
                    this.app_access_token = null;
                }, expire);
            }
        }
        return this.app_access_token;
    }

    /**
     * 获取登陆用户身份
     */
    public async getUserAccessToken(code: string) {
        // tslint:disable-next-line:variable-name
        const app_access_token = await this.getAccessToken();
        const result = await this.ctx.curl('https://open.feishu.cn/open-apis/authen/v1/access_token', {
            method: 'POST',
            dataType: 'json',
            headers: {
                Authorization: `Bearer ${app_access_token}`,
                'Content-Type': 'application/json',
            },
            data: {
                grant_type: 'authorization_code',
                code
            }
        });
        return result.data.data;
    }
}
