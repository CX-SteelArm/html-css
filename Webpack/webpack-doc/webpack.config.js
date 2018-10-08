const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        // another: './src/indexB.js'
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.(gif|ico|png)$/,
                use: 'file-loader'
            }
        ]
    },
    devtool: 'none',
    devServer: {
        contentBase: './dist',
        // hot: true
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: "output management"
        // }),
        // new CleanWebpackPlugin(['dist']),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development')
        // }),
        new webpack.ProvidePlugin({
            // '_': "lodash"
            hi: ['./print', 'hi']
        })
    ]
}
