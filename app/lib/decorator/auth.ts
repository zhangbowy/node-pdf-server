interface JwtError extends Error {
    code: number;
    message: string;
}
const isJwtError = (x: any): x is JwtError => {
    return typeof x.message === 'string';
};

/**
 * 检测auth，登陆者必须带有jwt，不然就挂.
 * @param type 原dcpool APIAccess
 */
export function Auth() {
    return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
        const originFun = descriptor.value;
        descriptor.value = async function () {
            const c = this as any;
            try {
                const { userInfo } = c.ctx.session;
                if (!userInfo) {
                    c.ctx.status = 401;
                    return c.fail(401, '请先登录');
                }
                // const decode: any = c.app.jwt.verify(token, c.app.config.jwt.secret);
                // if (type > decode.scope) {
                    // return c.fail(401, '权限不足');
                // }
                // c.ctx.auth = decode;
                await originFun.apply(this, arguments);
            } catch (e) {
                console.log(e);
                if (isJwtError(e)) {
                    if (
                        e.message === 'invalid signature' ||
                        e.message === 'jwt malformed'
                    ) {
                        c.fail(401, 'login invalid');
                        c.ctx.status = 401;
                    } else if (e.message === 'user-fetch-fail') {
                        c.fail(401, 'not such user');
                        c.ctx.status = 401;
                    } else {
                        console.log(e);
                    }
                }
            }
        };
    };
}
