const webpackPlugin = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        static: '.',
        historyApiFallback: true,
    },
    plugins: [
        // new ReactRefreshWebpackPlugin(),
        new webpackPlugin.DefinePlugin({
            'process.env.name': JSON.stringify(''),
        }),
        new ReactRefreshWebpackPlugin(),
    ],
};
