! function(a) {
	function e() {
		var b, a = c.getBoundingClientRect().width;
		a >= 750 && (a = 750), 320 >= a && (a = 320), b = a / 7.5, c.style.fontSize = b + "px"
	}
	var d, b = a.document,
		c = b.documentElement;
	a.addEventListener("resize", function() {
		clearTimeout(d), d = setTimeout(e, 300)
	}, !1), e()
}(window);