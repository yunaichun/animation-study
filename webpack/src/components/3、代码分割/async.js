// 提取公共代码
require.include('./sameModule');

// require.ensure 异步加载第三方依赖
require.ensure(['lodash'], function() {
	// require.ensure：加载到页面，不会执行
	var _ = require('lodash');
	_.join([1, 2], 3);
}, 'vendor');

// import 动态引用模块，指定模块名称
import(
	/* webpackChunkName: async-chunk-name */
    /* webpackMode: lazy */
	'./pageB'
).then(function(pageB) {console.log(pageB)});


let currentPage = 'pageA'
if (currentPage === 'pageA') {
	require.ensure(['./pageA'], function() {
		// require.ensure：加载到页面，不会执行；当使用 require 的时候才会执行 pageA 的代码
		var pageA = require('./pageA');
	}, 'pageA');
} else {
	require.ensure(['./pageB'], function() {
		var pageB = require('./pageB');
	}, 'pageB');
}
