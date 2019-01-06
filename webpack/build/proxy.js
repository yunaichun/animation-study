module.exports = {
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
};
