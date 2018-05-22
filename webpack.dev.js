const   webpack = require('webpack'),
        merge = require('webpack-merge'),
        common = require('./webpack.common'),
        autoprefixer = require('autoprefixer'),
        BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
        mode: 'development',
        devServer: {
            stats: "errors-only",
            overlay: true,
            compress: true
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new BrowserSyncPlugin(
                {
                    host: 'localhost',
                    port: 3000,
                    proxy: 'http://localhost:8080/'
                },
                {
                    reload: false
                }
            ),
        ]
});