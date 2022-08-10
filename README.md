# pu-node-server


## Dev

```
$ npm run dev
```

## UnitTest

```
$ npm run test
```

## Debug

Debugging in vscode, just need to press `F5`;

## 配置
prisma
> .env 放置根目录文件下
```
DATABASE_URL="mysql://账号:密码@ip:端口/库名"
```

## 实现

- 增加路由自动加载
- 日志打印
- 路径别名 拒绝 ../../../app/service/xx 用 @/service/xx
- 增加限流功能

## docker部署


```shell
# 打包基础镜像包
sudo docker build -f Dockerfile_base -t puppeteer_base:0.0.1 .

# 打tag
docker tag dcpool_api_base repository/dcpool_api_base:0.1.0

# 推到阿里云仓库
docker push registry.cn-hangzhou.aliyuncs.com/zhangbo007/puppeteer_base:0.0.1 
````

## Author

zhangbo


