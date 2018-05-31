;(function(win) {
	var doc = win.document;
	var docEl = doc.documentElement;
	var tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;

		if (width >=750) width = 750;//最大宽度
		if(width<=320) width=320;//最小宽度
		var rem = width / 7.5; // 将屏幕宽度分成10份， 1份为1rem
		docEl.style.fontSize = rem + 'px';
		
	}
	win.addEventListener('resize', function() {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);
	win.addEventListener('pageshow', function(e) {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);
	refreshRem();
})(window);