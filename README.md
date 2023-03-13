# pu-node-server
nodejs生成服务

## 在线体验
例如百度 
https://daily-qapi.forwe.store/api/node/getPdf?url=https://www.baidu.com/

## Dev本地开发

```
$ npm run dev
```

## 本地启动

```
$ npm run start
```

## UnitTest单元测试

```
$ npm run test
```

## Debug断点调试

Debugging in vscode, just need to press `F5`;

## 数据库配置
prisma
> .env 放置根目录文件下
```
DATABASE_URL="mysql://账号:密码@ip:端口/库名"
```

## 增加实现

- 增加路由自动加载
- 日志打印
- 路径别名 拒绝 ../../../app/service/xx 用 @/service/xx
- 增加限流功能

## docker部署

#### 基础镜像包
```shell
# 打包基础镜像包
sudo docker build -f Dockerfile_base -t puppeteer_base:0.0.1 .

# 打tag
docker tag dcpool_api_base repository/dcpool_api_base:0.1.0

# 推到阿里云仓库
docker push registry.cn-hangzhou.aliyuncs.com/zhangbo007/puppeteer_base:0.0.1 
````

#### 本地测试
```shell
# 打包
sudo docker build -f Dockerfile -t pu-node-server .

# 运行
docker run -p 7001:8001 -d --name pu-node pu-node-server
```

#### 流水线部署命令
```angular2html
#部署脚本会在部署组的每台机器上执行。一个典型Docker部署脚本如下：
#示例中使用的$image是您在脚本下方的变量处定义的变量（上游输出或自定义）
#docker run $image
#!/bin/bash

docker pull registry.cn-hangzhou.aliyuncs.com/zhangbo007/pu-pdf-node-server:${DATETIME}

if [[ -n $(docker ps -aq -f "name=pu-pdf-node-server") ]];then
    docker rm -f pu-pdf-node-server
    
fi

sudo docker run --name pu-pdf-node-server -p 7001:8001 -d registry.cn-hangzhou.aliyuncs.com/zhangbo007/pu-pdf-node-server:${DATETIME}
```

##
```angular2html
# 重启容器
docker container restart pu-pdf-node-server
```





## 前端本地开发

### 启动服务
```angular2html
# 安装依赖
npm install
# 启动
npm run start
```
### 使用
前端本地生成PDF测试接口

GET http://127.0.0.1:8001/getPdf?url=你的前端页面

返回值是PDF Buffer ，浏览器打开可以直接预览。


## Author

zhangbo


