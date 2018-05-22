const   path = require('path'),
        CleanWebpackPlugin = require('clean-webpack-plugin'),
        HtmlWebPackPlugin = require('html-webpack-plugin'),
        FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        bootstrap: './src/assets/js/bootstrap.js',
        fontawesome: './src/assets/js/fontawesome.js',
        app: './src/assets/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/[name].bundle.js',
    },
    module: {
        rules: [
            // babel-loader untuk JSnya
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            // html-loader
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false
                }
            },
            // images
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[ext]'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
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
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            minify: {
                removeScriptTypeAttributes: true
            }
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/images/favicon.png',
            prefix: 'assets/images/icons/',
        })
    ]
}