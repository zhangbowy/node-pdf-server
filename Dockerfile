FROM node:14.18.0-alpine as build

WORKDIR /app

ENV NODE_ENV prod

RUN npm config set registry https://registry.npm.taobao.org

COPY . .

RUN npm install

RUN npm run tsc

EXPOSE 8001

CMD [ "npm", "run", "prod" ]
