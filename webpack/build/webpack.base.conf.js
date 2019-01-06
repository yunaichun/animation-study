const productionConfig = require('./webpack.prod.conf.js');
const developmentConfig = require('./webpack.dev.conf.js');

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = env => {
    /*一、loaders 相关*/
    // 加载es
    const esLoader = ['babel-loader'].concat(env === 'production'
        ? []
        : [{
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }]
    );
    // 加载ts
    const tsLoader = ['ts-loader'];
    // 加载css、less
    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: env === 'development'
                // minimize: true, // 压缩
                // modules: true, // 模块化
                // localIdentName: '[path][name]__[local]--[hash:base64:5]' // 模块化样式名称
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: env === 'development'
            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'development'
            }
        }
    ];
    const styleLoader = env === 'production' 
        ? ExtractTextWebpackPlugin.extract({
            // 不提取的话，用什么方式将样式加载到页面上
            fallback: {
                loader: 'style-loader',
                options: {
                    singleton: true,
                    transform: './src/css/css.transform.js',
                    sourceMap: false
                }
            },
            use: cssLoaders
        })
        : [
            {
                loader: 'style-loader',
                options: {
                    // singleton: true, // 以同一个style标签显示所有import的样式
                    transform: './src/css/css.transform.js', // JS形变css，是在浏览器环境下；而postcss是在打包时机形变css的
                    sourceMap: true
                }
            }
        ].concat(cssLoaders);
    // 加载图片
    const imgLoader = env === 'production' 
        ? [
            {
                loader: 'url-loader',
                options: {
                    limit: 5000, // 最大为b（字节）时，将使用base64编码
                    outputPath: 'assets/image', // 可以将html中引入的图片与css中引入的图片放到一个目录下
                    name: '[name]-[hash:5].[ext]' // 打包后文件名
                    // outputPath: '/', // 打包后整体放在哪个文件下：output 中配置的 path 为跟目录
                    // useRelativePath: true,  // 使用相对目录：根据css打包文件的相对路径
                    // publicPath: '../assets/image', // 打包后图片具体目录：相对css.min.css目录
                    // name: '[name]-[hash:5].[ext]' // 打包后文件名
                }
            },
            {
                loader: 'img-loader',
                options: {
                    pngquant: {
                        quality: 80
                    }
                }
            }
        ]
        : [
            {
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/image', // 打包后整体放在哪个文件下：output 中配置的 path 为跟目录
                    name: '[name]-[hash:5].[ext]' // 打包后文件名
                    // outputPath: '/', // 打包后整体放在哪个文件下：output 中配置的 path 为跟目录
                    // useRelativePath: true,  // 使用相对目录：根据css打包文件的相对路径
                    // publicPath: '../assets/image', // 打包后图片具体目录：相对css.min.css目录
                    // name: '[name]-[hash:5].[ext]' // 打包后文件名
                }
            },
        ];
    // 加载字体
    const fontLoader = env === 'production' 
        ? [
            {
                loader: 'url-loader',
                options: {
                    limit: 5000, // 最大为b（字节）时，将使用base64编码
                    outputPath: 'assets/font', // 可以将html中引入的图片与css中引入的图片放到一个目录下
                    name: '[name]-[hash:5].[ext]' // 打包后文件名
                    // outputPath: '/', // 打包后整体放在哪个文件下：output 中配置的 path 为跟目录
                    // useRelativePath: true,  // 使用相对目录：根据css打包文件的相对路径
                    // publicPath: '../assets/image', // 打包后图片具体目录：相对css.min.css目录
                    // name: '[name]-[hash:5].[ext]' // 打包后文件名
                }
            }
        ]
        : [
            {
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/font', // 打包后整体放在哪个文件下：output 中配置的 path 为跟目录
                    name: '[name]-[hash:5].[ext]' // 打包后文件名
                    // outputPath: '/', // 打包后整体放在哪个文件下：output 中配置的 path 为跟目录
                    // useRelativePath: true,  // 使用相对目录：根据css打包文件的相对路径
                    // publicPath: '../assets/image', // 打包后图片具体目录：相对css.min.css目录
                    // name: '[name]-[hash:5].[ext]' // 打包后文件名
                }
            },
        ];
    return {
        entry: {
            app: path.join(__dirname, '../src/app.js'),
            vendor: [path.resolve(__dirname, '../src/lib/jquery.min.js'), 'vue']
            // app2: './src/app2.js',
            // vendor: ['lodash']
        },

        output: {
            path: path.resolve(__dirname, '../dist'), // 打包文件存放路径
            publicPath: '/', // 动态打包的代码的路径：相对打包的根目录（也可以为线上绝对地址） 
            // 利用 chunkhash 可以保证第三方代码的版本号不会因为业务代码的改变而改变
            filename: 'js/[name]-bundle-[chunkhash:5].js', // 打包文件名称
            chunkFilename: '[name].chunk.js' // 异步 chunk（require.ensure、动态import）
        },

        /*本地模块添加别名：可以像引入npm包一样直接引用。需要在babel中配置：exclude: [path.resolve(__dirname, '../src/lib'), '/node_modules/'] */
        resolve: {
            alias: {
                jquery$: path.resolve(__dirname, '../src/lib/jquery.min.js') /*$指的是确切的匹配，将jquery解析到此文件内，而不是目录下*/
            }
        },
        
        module: {
            rules: [
                /*加载es*/
                {
                    test: /\.js$/,
                    use: esLoader,
                    include: path.resolve(__dirname, '../src'),
                    exclude: [
                        path.resolve(__dirname, '../src/lib'),
                        path.resolve(__dirname, '../node_modules/')
                    ],
                },
                /*加载ts*/
                {
                    test: /\.tsx?$/,
                    use: tsLoader,
                    exclude: path.resolve(__dirname, '../node_modules/')
                },
                /*加载css、less*/
                {
                    test: /\.(css|less)$/,
                    use: styleLoader
                },
                /*加载图片*/
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: imgLoader
                },
                /*加载字体*/
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fontLoader
                },
                /*html中引入图片*/
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['img:src', 'img:data-src'] // 左边标识html标签，右边标识html的属性
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            // 提取html
            new HtmlWebpackPlugin({
                template: './index.html',// 模板文件，不只是html文件
                filename: 'index.html',    // 在输入目录中生成的文件名
                inject: true, // 是不是让插件帮助我们插入 link 和 script 标签文件
                // chunks: ['app'], // 默认为所有 entry 对应的 chunk
                minify: {
                    collapseWhitespace: true // 是否压缩空格
                }
            }),
            // 引入第三方模块
            new webpack.ProvidePlugin({
                $: 'jquery' // npm模块注入：注入jquery到每一个模块，别名是$
            })
        ]
    }
};

module.exports = env => {
    let config = env === 'production'
                 ? productionConfig 
                 : developmentConfig;
    return merge(baseConfig(env), config);
};