/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 *
 */

let baseUrl = '';
let routerMode = 'hash';


if (process.env.NODE_ENV == 'development') {
    baseUrl = '/apis';
}else if(process.env.NODE_ENV == 'production'){
	// 线上地址
	baseUrl = 'http://cs.nongchangyun.cn';
}
export {
	baseUrl,
	routerMode
}