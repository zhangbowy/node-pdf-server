#FROM registry.cn-hangzhou.aliyuncs.com/zhangbo007/node:14.18.0-alpine
FROM registry.cn-hangzhou.aliyuncs.com/zhangbo007/puppeteer_base:0.0.1
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
