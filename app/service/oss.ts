import { Service } from 'egg';
const OSS = require('ali-oss');
const _ = require('lodash');

let client: any = null;

export default class OssService extends Service {
    constructor(props) {
        super(props);
        client = new OSS({
            // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
            region: '',
            // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
            accessKeyId: '',
            accessKeySecret: '',
            endpoint: '',
            bucket: ''
        });
    }
    /**
     * 前缀
     */
    readonly prefix: string = this.app.config.ossPrefix;
    /**
     * 上传文件单个文件
     * @param fileBuffer {buffer} 文件流
     * @param filePath {string} 文件路径
     * @return Promise<any>
     */
    public async putFile(fileBuffer: Buffer, fileName: string, options?: object): Promise<any> {
        try {
            const filePath = `${this.prefix}/${fileName}`;
            const r1 = await client.put(filePath, fileBuffer, options);
            console.log('put success: %j', r1.url);
            return r1;
            // let r2 = await client.get(filePath);
        } catch(e) {
            console.error('error: %j', e);
            return e;
        }
    }
    /**
     * @description 创建文件名
     * @rule 年(4) + 月(2) + 日(2) + 时(2) + 分(2) + 秒(2) + 毫秒(3) + 随机数(3), 共计 20位(固定长度)。
     * @return {string} FileName
     * @example
     *  // => '20210729171210973281724'
     *
     * create by zhangbo
     */
    public createFileName = function () {
        const date = new Date();
        return (
            date.getFullYear()
            + _.padStart(date.getMonth() + 1, 2, '0')
            + _.padStart(date.getDate(), 2, '0')
            + _.padStart(date.getHours(), 2, '0')
            + _.padStart(date.getMinutes(), 2, '0')
            + _.padStart(date.getSeconds(), 2, '0')
            + _.padStart(date.getMilliseconds(), 3, '0')
            + _.random(100, 999)
        );
    };
}

