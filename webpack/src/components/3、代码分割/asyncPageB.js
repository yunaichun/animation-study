let currentPage = 'pageA'
if (currentPage === 'pageA') {
	require.ensure(['./pageA'], function() {
		// require.ensure：加载到页面，不会执行；当使用 require 的时候才会执行 pageA 的代码
		var pageA = require('./pageA');
	}, 'asyncpageA');
} else {
	require.ensure(['./pageB'], function() {
		var pageB = require('./pageB');
	}, 'asyncpageB');
}
