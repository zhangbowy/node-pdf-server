FROM registry.cn-hangzhou.aliyuncs.com/zhangbo007/node:14.18.0-alpine
#FROM alpine
# 设置镜像作者
LABEL MAINTAINER="zhangbo"

# 设置工作目录
WORKDIR /app

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


# 设置国内阿里云镜像站、安装chromium 102、文泉驿免费中文字体等依赖库
#RUN echo "https://mirrors.aliyun.com/alpine/v3.11/main/" > /etc/apk/repositories \
#    && echo "https://mirrors.aliyun.com/alpine/v3.11/community/" >> /etc/apk/repositories \
#    && echo "https://mirrors.aliyun.com/alpine/edge/testing/" >> /etc/apk/repositories \
#    && apk -U --no-cache update && apk -U --no-cache --allow-untrusted add \
#      zlib-dev \
#      xorg-server \
#      dbus \
#      ttf-freefont \
#        nss \
#        freetype \
#        freetype-dev \
#        harfbuzz \
#        ca-certificates \
#      chromium \
#      wqy-zenhei@edge \
#      bash \
#      bash-doc \
#      bash-completion -f



#RUN echo @edge http://nl.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories && apk add


# Installs latest Chromium (100) package.
#RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories




RUN echo "https://mirrors.aliyun.com/alpine/v3.11/main/" > /etc/apk/repositories \
    && echo "https://mirrors.aliyun.com/alpine/v3.11/community/" >> /etc/apk/repositories \
    && echo "https://mirrors.aliyun.com/alpine/latest-stable/testing" >> /etc/apk/repositories \
 && apk --no-cache  update && apk add --no-cache --force-broken-world --allow-untrusted add  \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn \
      zlib-dev \
 wqy-zenhei@edge \
      bash \
      bash-doc \
      bash-completion \
      font-adobe-100dpi \
      ttf-dejavu \
      fontconfig
#      && rm -rf /var/cache/*


#RUN apk add wqy-zenhei --update-cache --repository https://mirrors.aliyun.com/alpine/edge/testing --allow-untrusted

## Add user so we don't need --no-sandbox.
#RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#    && mkdir -p /home/pptruser/Downloads /app \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /app/ \
#    && chown -R pptruser:pptruser /usr
#
## Run everything after as non-privileged user.
#USER pptruser



# 设置时区
#RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
#RUN npm -v && npm config set registry="http://r.dtwave-inc.com"

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
 docker tag node:14.18.0-alpine  registry.cn-beijing.aliyuncs.com/zhangbo/node:14.18.0-alpine
