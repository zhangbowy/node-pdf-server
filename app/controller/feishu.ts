import BaseController from '@/core/baseController';
import { SelfController as Controller, Get, Post } from '@/router';
import crypto from 'crypto';

// import { Auth } from '@/lib//decorator/auth';
// import { LoginType } from '@/lib/enum';
@Controller('/feishu')
export default class FeishuController extends BaseController {
    /**
     * 飞书收到消息
     * @returns 
     */
    @Post('/recivedMsg')
    public async recievedMessage(): Promise<void> {
        const { ctx } = this;
        const { encrypt, type } = ctx.request.body;
        if (type === 'url_verification') {
            const cipher = new AESCipher('test key');
            console.log(cipher.decrypt(encrypt));
            this.ctx.body = {
                challenge: cipher.decrypt(encrypt)
            };
            return;
        }
    }

    @Get('/list')
    public slider() {
        this.success([], '请求成功');
    }
    public async error() {
        throw new Error('see the error stack!!');
    }
}


class AESCipher {
    key: Buffer;
    constructor(key: string) {
        const hash = crypto.createHash('sha256');
        hash.update(key);
        this.key = hash.digest();
    }
    decrypt(encrypt: string) {
        const encryptBuffer = Buffer.from(encrypt, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, encryptBuffer.slice(0, 16));
        let decrypted = decipher.update(encryptBuffer.slice(16).toString('hex'), 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
