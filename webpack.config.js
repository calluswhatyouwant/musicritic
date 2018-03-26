const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    devServer: {
        port: 3000,
        contentBase: __dirname + '/dist',
        historyApiFallback: true
    },
    stats: {
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-2']
                    }
                },
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
            },
            { 
                test: /\.(ttf|eot|svg|woff|woff2|png|gif)$/, 
                use: 'url-loader?limit=10000'
            }
        ]
    },
    plugins: [new ExtractTextPlugin('style.bundle.css'), new HtmlWebpackPlugin({
        filename: 'index.html',
        template: __dirname + '/src/index.html'
    })]
}