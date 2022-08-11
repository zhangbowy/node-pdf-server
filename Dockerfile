#FROM registry.cn-hangzhou.aliyuncs.com/zhangbo007/node:14.18.0-alpine
FROM registry.cn-hangzhou.aliyuncs.com/zhangbo007/c_base:0.0.1
#FROM alpine
# 设置镜像作者
LABEL MAINTAINER="zhangbo"

# 设置工作目录
WORKDIR /app

# 清除npm缓存文件
RUN npm cache clean --force && npm cache verify


# 设置环境变量
ENV NODE_ENV prod

# 设置yuan
RUN npm config set registry https://registry.npm.taobao.org

# 复制文件
COPY . .


# 手动将字体复制到目录
RUN mkdir -p /usr/share/fonts/win
RUN cp /app/font/Microsoft-YaHei.ttf  /usr/share/fonts/win/Microsoft-YaHei.ttf
RUN cp /app/font/Arial.ttf  /usr/share/fonts/win/Arial.ttf
RUN chmod 777 /usr/share/fonts/win/*  \
  && fc-cache -fv  && fc-list



RUN npm install cnpm -g

# 安装依赖
RUN cnpm install

RUN npm run tsc

# 暴露端口
EXPOSE 8001

CMD [ "npm", "run", "prod" ]
#curl -d '{"url": "http://127.0.0.1:7001/public/index.html"}' -H 'Content-Type: application/json' http://127.0.0.1:7001/pdf/create
#curl -d '{"url": "https://www.baidu.com/"}' -H 'Content-Type: application/json' http://127.0.0.1:7001/pdf/create
#
#
#{"code":1,"data":{"name":"eval_pdf_daily/zhangbotest.pdf","url":"http://spf-material-input.oss-cn-shanghai.aliyuncs.com/eval_pdf_daily/zhangbotest.pdf","res":{"status":200,"statusCode":200,"statusMessage":"OK","headers":{"server":"AliyunOSS","date":"Wed, 10 Aug 2022 04:39:59 GMT","content-length":"0","connection":"keep-alive","x-oss-request-id":"62F3369FB9FD8B39319AFA17","etag":"\"D55BCF9F7102257D008A5A022AE55AF3\"","x-oss-hash-crc64ecma":"16662105587250485876","content-md5":"1VvPn3ECJX0AiloCKuVa8w==","x-oss-version-id":"CAEQJhiBgID23ZqYlBgiIDRmMWMwNzE1YTUzZDQzNjc4Y2ZiMmEyNmJkMWEzMGJk","x-oss-server-time":"91"},"size":0,"aborted":false,"rt":104,"keepAliveSocket":false,"data":{"type":"Buffer","data":[]},"requestUrls":["http://spf-material-input.oss-cn-shanghai.aliyuncs.com/eval_pdf_daily/zhangbotest.pdf"],"timing":null,"remoteAddress":"106.14.229.14","remotePort":80,"socketHandledRequests":1,"socketHandledResponses":1}},"msg":"创建成功"}
