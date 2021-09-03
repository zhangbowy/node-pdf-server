'use strict';
import { Application, Context } from 'egg';
import 'reflect-metadata';

const CONTROLLER_PREFIX: string = '';
const methodMap: Map<string, any> = new Map<string, any>();
const rootApiPath: string = '';

interface CurController {
  pathName: string;
  fullPath: string;
}

/**
 * controller 装饰器，设置api公共前缀
 * @param pathPrefix {string}
 * @constructor
 */
export const SelfController = (pathPrefix?: string): ClassDecorator => (targetClass): void => {
  // 在controller上定义pathPrefix的元数据
  // https://github.com/rbuckton/reflect-metadata

  Reflect.defineMetadata(CONTROLLER_PREFIX, pathPrefix, targetClass);
};

const methodWrap = (path: string, requestMethod: string): MethodDecorator => (target, methodName): void => {
  // 路由装饰器参数为空时，路由为方法名
  const key = path ? `${requestMethod}·${path}·${String(methodName)}` : `${requestMethod}·${String(methodName)}·/${String(methodName)}`;
  methodMap.set(key, target);
};

// Post 请求
export const Post = (path: string = ''): MethodDecorator => methodWrap(path, 'post');

// Get 请求
export const Get = (path: string = ''): MethodDecorator => methodWrap(path, 'get');

export default (app: Application): void => {
  const { router } = app;
  // 遍历methodMap， 注册路由
  methodMap.forEach((curController: CurController, configString: string) => {
    // 请求方法, 请求路径, 方法名 
    const [ requestMethod, path, methodName ] = configString.split(`·`);
    // 获取controller装饰器设置的公共前缀
    // 如果controller没有添加SelfController装饰器，则取文件名作为路径
    let controllerPrefix: string | undefined | null = Reflect.getMetadata(CONTROLLER_PREFIX, curController.constructor);
    if (!Reflect.hasMetadata(CONTROLLER_PREFIX, curController.constructor)) {
      controllerPrefix = `/${curController.pathName.split(`.`).reverse()[0]}`;
    }
    const func: (this: Context, ...args: any[]) => Promise<any> = async function (...args: any[]): Promise<any> {
      return new (curController.constructor as any)(this)[methodName](...args);
    };
    // 注册路由
    router[requestMethod](rootApiPath + controllerPrefix + path, func);
  });
};

