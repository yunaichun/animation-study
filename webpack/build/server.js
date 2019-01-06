const express = require('express');
const webpack = require('webpack');
const opn = require('opn');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware= require('webpack-hot-middleware');
const httpProxyMiddleware= require('http-proxy-middleware');
const historyApiFallback= require('connect-history-api-fallback');

const config = require('./webpack.base.conf.js')('development');
const proxy = require('./proxy');
const historyFallback = require('./historyFallback');
const compiler = webpack(config);

const app = express();
const port = 3000;

// webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
// webpack-hot-middleware
app.use(webpackHotMiddleware(compiler));
// http-proxy-middleware
for (let key in proxy) {
    app.use(httpProxyMiddleware(key, proxy[key]));
}
//connect-history-api-fallback
app.use(historyApiFallback(historyFallback));

app.listen(port, function() {
    console.log('success listen to ' + port);
    opn('http://localhost:' + port);
});
