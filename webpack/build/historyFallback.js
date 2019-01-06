module.exports = {
    // 否则资源文件 assets 也全部会被重定向
    // acceptHeaders: ['text/html', 'application/xhtml+xml'],
    rewrites: [
        {
            from: '/index',
            to: '/index.html'
        },
        {
            from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
            to: function(context) {
                return '/' + context.match[1] + context.match[2] + '.html';
            }
        }
    ]
};
