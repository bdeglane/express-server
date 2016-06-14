var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: {
        app: ['babel-polyfill', path.join(__dirname, 'app', 'main.js')],
        //vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
        // publicPath: path.join(__dirname, 'dist', 'static', '/')
        publicPath: path.join('./', 'static', '/')
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.json',
            '.css',
            'jsonp'
        ]
    },
    externals: nodeModules,
    target: "node",
    module: {
        loaders: [
            {
                test: /\.(css|scss|sass)$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                plugins: ['transform-runtime'],
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                //loader: 'url?limit=10000!img?progressive=true'
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.json$/,
                loaders: [
                    "json",
                ]
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        //new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('../style/style.css', {
            allChunks: true
        }),
        new webpack.BannerPlugin('require("source-map-support").install();',
            {raw: true, entryOnly: false})
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ],
    stats: {
        colors: true
    }
};
