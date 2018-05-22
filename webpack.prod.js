const   merge = require('webpack-merge'),
        common = require('./webpack.common'),
        autoprefixer = require('autoprefixer'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
        CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-maps',
    module: {
        rules: [
            // sass-loader
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../../',
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => autoprefixer({
                                    browsers: ['last 10 versions', '> 1%']
                                })
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './assets/css/style.css'
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            cache: true,
            parallel: true,
            sourceMap: true,
            warningsFilter: false,
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
        })
    ]
});