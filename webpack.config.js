// 
var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.join(__dirname, 'dist');
var APP_DIR = path.join(__dirname, 'src');

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
];

var config = {
    // entry: ['babel-polyfill',APP_DIR + '/app.js'],
    //
    entry: {
        bandle: APP_DIR + '/app.js',
        vendor: VENDOR_LIBS
    },
    //chunkhash tells webpack to add hash to the end of the filename 
    // so if the file is cached it will refresh automatically
    output: {
        path: BUILD_DIR,
        filename: '[name].[hash].js'
        // path: path.resolve(__dirname, 'dist'),
        // filename: '[name].[hash.js]',
        // publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                //include: APP_DIR,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ["env","react","stage-2", "flow"],
                    plugins:["syntax-dynamic-import"]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|svg)$/i,
                use: 'file-loader'
            },


        ]
    },
    devServer: {
        //contentBase: [BUILD_DIR, path.join(__dirname, assets)],
        contentBase: BUILD_DIR,
        compress: true,
        port: 9000,
        disableHostCheck: false,
        headers:{
            "X-Custom-header":"custom"     // to add custom header
        },
        open: false,    // will open the browser window authomatically
        hot: true,      // to authomatically reload React modules
        historyApiFallback: true

    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        //after you split your code into two files bundle and vender,
        //this plugin removed duplicate code from bundle and vendor
        // as a result the resulting bundle.js will not contain code that comes from 
        // react lib ...
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}

module.exports = config;