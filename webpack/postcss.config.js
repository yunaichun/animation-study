module.exports = {
    plugins: [
        // require('postcss-sprites')({
        // 	spritePath: './dist/assets/image', // 合成图的地址，配置后url-loader不需要options配置了
        // 	retina: true // 处理retina屏幕图片的大小（文明名称命名为：文件名@2x.png，css文件中width和height写为一半）
        // }),
        require('autoprefixer')(),
        require('postcss-preset-env')()
    ]
};
