module.exports = {
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
