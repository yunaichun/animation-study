const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        inline: true, // 默认为true（为false指的是以iframe嵌入页面）
        port: 9091,
        historyApiFallback: {
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
        },
        proxy: {
            '/': {
                target: 'http://10.13.69.104:8287',
                changeOrigin: true,
                logLevel: 'debug', // 设置debug则为控制台打印代理请求信息
                pathRewrite: { // 远程接口 rewrite
                    '^/': '/dpgtool/' 
                },
                headers: { // 设置代理请求头
                    'Cookie': 'test',
                    'User-Agent': '12312313'
                }
            }
        },
        hot: true,
        hotOnly: true, // 某些模块不支持热更新的情况下配置此参数。在该模块调用方法：if(module.hot) { module.hot.accept(); }
        overlay: true // console 控制开启 eslint 提示错误
    },

    plugins: [
        // 模块热更新
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
};
