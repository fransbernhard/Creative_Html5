const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    name: 'Client',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        hot: true,
        watchContentBase: true,
        port: 8080,
    },
    context: path.join(__dirname, 'app'),
    entry: {
        main: './main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '' } // in order to make loader work with webpack5
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
                include: /assets/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: '[path][name].[ext]' }
                    },
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'assets/**',
                from: 'index.html',
            }]
        }),
        new webpack.HotModuleReplacementPlugin(), // Only update what has changed on hot reload
    ],
};