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

export const getType = () => {
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      return 'mobile';
    }else {
      return 'pc';
    }
};
