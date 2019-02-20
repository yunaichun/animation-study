/**
 * [randomHexColor 随机生成十六进制颜色]
 * @return {[String]} [十六进制颜色值（#000000-#FFFFFF）]
 */
function randomHexColor() {
   return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

/**
 * [randomAllLine 生成7行，98列随机颜色值]
 * @return {[Array]} [行：共7行。列：有颜色值的48列 + 列与列间隙48列]
 */
function randomAllLine() {
    var res = [];
    // 共7行
    for (var i = 0; i < 7; i++) {
        // 每一行列数：有颜色值的48列 + 列与列间隙48列
        for(var j = 0; j < 96; j++) {
            if (j % 2 === 0) {
                // 有颜色值的48列的背景颜色随机
                res.push({'color': randomHexColor(), showLine: (i * 96 + j) % 96 === 0 });
            } else {
                // 列与列间隙48列背景颜色与主背景一样
                res.push({ 'color': '#ffffff', showLine: (i * 96 + j) % 96 === 0 });
            }
        }
    }
    return res;
}

var template = [
    '{{#data}}',
        '{{#showLine}}',
            '<div class="line"></div>',
        '{{/showLine}}',
        '<div class="item" style="background-color: ' + '{{ color }}' + ';color: ' + '{{ color }}' + ';">1</div>',
    '{{/data}}'
].join('');
var output = Mustache.to_html(template, { data: randomAllLine() });
var parentEl = document.getElementsByClassName('main')[0];
parentEl.innerHTML = parentEl.innerHTML + output;