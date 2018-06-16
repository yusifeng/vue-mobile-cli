const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const miniCssExtractPlugin = require("mini-css-extract-plugin")





let resolve = (dist) => path.resolve(__dirname, dist)

module.exports = () => {


    return {
        entry: {
            app: [
                resolve('./auto.js'),
                resolve('./src/main.js')
            ]
        },
        output: {
            filename: '[name].min.js',
            path: resolve('dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                },
                {
                    test: /\.styl(us)?$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'px2rem-loader',
                            options: {
                                remUnit: 40,
                                remPrecision: 8
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'stylus-loader'
                        },
                        {
                            loader: 'style-resources-loader',
                            options: {
                                patterns: [
                                    resolve('./src/css/layout.styl'),
                                    resolve('./src/css/var.styl'),
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: 'vue-loader',
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                },
            ]
        },
        resolve: {
            extensions: [
                '.js',
                '.vue'
            ],
            alias: {
                css: resolve('./src/css/')
            }
        },
        plugins: [
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, './index.html')
            }),
            new webpack.HotModuleReplacementPlugin(),
            new VueLoaderPlugin(),
            // new miniCssExtractPlugin({
            //     filename: "[name].css",
            //     chunkFilename: "[id].css"
            // }),
        ],
        devServer: {
            port:8085,
            compress: true,
            hot: true
        },
        
    }
}