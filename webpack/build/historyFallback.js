module.exports = {
    // 不然资源文件也全部会被重定向
    acceptHeaders: ['text/html', 'application/xhtml+xml'],
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
