const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        // vue: ['vue', 'vue-router', 'vuex', 'vue-i18n'],
        // ui: ['element-ui'],
        vue: ['vue'],
        ui: ['element-ui']
    },
    output: {
        path: path.join(__dirname, '../dist/dll/'),
        filename: '[name].dll.js',
        // 当前 Dll 的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与 DllPlugin 的 name 参数保持一致
        library: '[name]'
    },
    plugins: [
        // 清空已打包内容：根目录不变，删除 dll
        new CleanWebpackPlugin(['dll'], { root: path.resolve(__dirname, '../dist') }),
        new webpack.DllPlugin({
            // 打包后的 map 放在哪里：会生成一个 map 的 JSON 文件，与打包文件一一对应映射关系
            path: path.join(__dirname, '../dist/dll/', '[name].manifest.json'),
            // 对应 output 中的 library
            name: '[name]'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};