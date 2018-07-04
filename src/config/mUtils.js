/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 是否是图片
 */
export const isImg = path => {
    if( /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(path) ) return true;
    else return false;
}
/**
 * 获取浏览器传递参数
 */
export const getParams = url => {
	var params = {};
	var paramString = (url === undefined || url === null) ? window.location.search.substr(1) : url;
	var paramArray = paramString.split('&');
	for( let i = 0; i < paramArray.length; i ++ ){
		var itemArray = paramArray[i].split('=');
		var key = '';
		var value = null;
		if( itemArray.length > 0 ) key = decodeURIComponent(itemArray[0]);
		if( itemArray.length > 1 ) value = decodeURIComponent(itemArray[1]);
		if( !key ) continue;
		params[key] = value;
	}
	return params;
};
/**
 * Pc or Mobile
 */
export const getType = () => {
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      return 'mobile';
    }else {
      return 'pc';
    }
};

/**
 * throttle 节流
 */
 export const throttle = (func, wait, mustRun) => {
	var timeout,
		startTime = new Date();

	return function() {
		var context = this,
			args = arguments,
			curTime = new Date();

		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if(curTime - startTime >= mustRun){
			func.apply(context,args);
			startTime = curTime;
		// 没达到触发间隔，重新设定定时器
		}else{
			timeout = setTimeout(func, wait);
		}
	};
};
/**
 * 根据产品检验批次获取相应文字（ TJ-20180808-000001 ）=> 田间 质检
 */
export const getModuleType = (code) => {
	let tab = '';
	code = code.split('-')[0] || '';
	switch (code) {
		case 'JB': tab = '基本'; break;
		case 'ZZ': tab = '种植'; break;
		case 'TJ': tab = '田间'; break;
		case 'CS': tab = '采收'; break;
		case 'CJG': tab = '加工'; break;
		case 'SJG': tab = '加工'; break;
		case 'BZ': tab = '包装'; break;
		case 'CCC': tab = '仓储'; break;
		case 'YCC': tab = '仓储'; break;
		default: tab = '';
	}
	return tab + '质检';
}

/**
 * 获取 scrollTop
 */

export const getScrollTop = () => {
	return document.documentElement.scrollTop || document.body.scrollTop;
}

 /**
  * 设置scrollTop
  */
export const setScrollTop = (code) => {
	document.documentElement.scrollTop = code;
	document.body.scrollTop = code;
}

