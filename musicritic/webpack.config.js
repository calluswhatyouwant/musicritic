const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'app.bundle.js',
        publicPath: '/',
    },
    devServer: {
        port: process.env.CLIENT_PORT || 3000,
        contentBase: path.join(__dirname, 'dist/'),
        historyApiFallback: true,
    },
    stats: {
        errorDetails: true,
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-flow',
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-class-properties'],
                            [
                                '@babel/plugin-transform-runtime',

                                {
                                    regenerator: true,
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|png|gif)$/,
                use: 'url-loader?limit=10000',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('style.bundle.css'),
        new webpack.EnvironmentPlugin(config),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'public/index.html'),
        }),
    ],
};
