/**
 * [exports 浏览器环境下，css形变]
 * @param  {[type]} css [import的css]
 * @return {[type]}     [返回形变的css]
 */
//执行的时机：
module.exports = function(css) {
	console.log(css);
	console.log(window.innerWidth);
	if (window.innerWidth > 768) {
		return css.replace('#ff3333', 'green');
	} else {
		return css.replace('#ff3333', 'orange');
	}
}
