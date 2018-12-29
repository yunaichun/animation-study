const webpack = require('webpack');
const proxy = require('./proxy');
const historyFallback = require('./historyFallback');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        inline: true, // 默认为true（为false指的是以iframe嵌入页面）
        port: 9091,
        historyApiFallback: historyFallback,
        proxy: proxy,
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
