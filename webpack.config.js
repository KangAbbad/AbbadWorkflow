const   path = require('path'),
        webpack = require('webpack'),
        autoprefixer = require('autoprefixer'),
        HtmlWebPackPlugin = require('html-webpack-plugin'),
        CleanWebpackPlugin = require('clean-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].bundle.js'
    },
    module: {
        rules: [
            // babel-loader
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            // html-loader
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // sass-loader
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMaps: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => autoprefixer({
                                    browsers: ['last 10 versions', '> 1%']
                                })
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMaps: true
                            }
                        }
                    ]
                })
            },
            // images
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/images/[name].[ext]'
                }
            },
            // fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            }
        ]
    },
    devServer: {
        stats: "errors-only",
        overlay: true,
        compress: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: './css/styles.min.css'
        }),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/'
            },
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: false
            }
        ),
        new CleanWebpackPlugin(['dist'])
    ],
    devtool: 'source-maps'
};