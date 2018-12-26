const webpack = require('webpack');
const path = require('path');
const glob = require('glob-all');

const PurifyCSS = require('purifycss-webpack');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    plugins: [
        /*提取 公共 代码（异步加载模块）
            new webpack.optimize.CommonsChunkPlugin({
             async: "async-common",
             children: true,
             minChunks: 2
            }),
        */
        /*提取 公共 代码（同步加载模块）
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                minChunks: 2,
                chunks: ['app', 'app2'] // 必须指定范围！！！！！！！！！！
            }),
        */
        /*提取 第三方依赖 代码
            new webpack.optimize.CommonsChunkPlugin({
             name: "vendor",
             minChunks: Infinity
            }),
        */
        // 提取css
        new ExtractTextWebpackPlugin({
            filename: 'css/[name]-bundle-[hash:5].css',
            allChunks: false // 如果为true，指的是将所有import的css文件提取到一个文件中；如果为false，只会提取同步import的css文件
        }),
        // 压缩css：必须放在 ExtractTextWebpackPlugin 之后
        new PurifyCSS({
            paths: glob.sync([ // 指定多路径、同时加载多路径
                path.join(__dirname, './src/**/*.js'),
                path.join(__dirname, './*.html')
            ])
        }),
        // 提取 webpack 生成代码
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new HtmlWebpackInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),
        // 压缩JS
        new webpack.optimize.UglifyJsPlugin(),
        // 清空已打包内容
        new CleanWebpackPlugin(['dist'])
    ],
};
