const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HelloWorldPlugin = require('./src/plugins/hello-world');
const FileListPlugin = require('./src/plugins/file-list');

module.exports = {
    mode: 'development',
    // mode: 'production',
    output: {
        filename: '[name]_[hash:6].js'
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new CleanWebpackPlugin(),
        new HelloWorldPlugin(),
        new FileListPlugin(),
    ]
}
