
/**
 * 检测auth，登陆者必须带有jwt，不然就挂.
 * @param type 原dcpool APIAccess
 */
 export function Auth(type) {
    return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
        var originFun = descriptor.value
        descriptor.value = async function() {
            var c = <any>this;
            try {
                var token = c.ctx.request.headers['authorization']
                if (token) {
                    token = token.split(' ')[1];
                } else {
                    return c.fail(401, '把Token带上');
                }
                console.log(token, '----token-x----');
                const decode: any = c.app.jwt.verify(token, c.app.config.jwt.secret)
                if (type > decode.scope) {
                    return c.fail(401, '权限不足');
                  }
                c.ctx.auth = decode;
                await originFun.apply(this, arguments)
            } catch (e) {
                console.log(e);
                if (
                    e.message === 'invalid signature' ||
                    e.message === 'jwt malformed'
                ) {
                    c.fail(401, 'login invalid')
                    c.ctx.status = 401;
                }else if(e.message === 'user-fetch-fail'){
                    c.fail(401, 'not such user')
                    c.ctx.status = 401;
                }else{
                    console.log(e);
                }
            }
        }
    }
}