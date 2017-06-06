let path = require('path');
let webpack = require('webpack');

let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let Dotenv = require('dotenv-webpack');


const distPath = path.join(__dirname, '../dist');
const appPath = path.join(__dirname, '../app');

let ENV = process.env.npm_lifecycle_event;

let isServe = ENV === 'serve';
let isDev = ENV === 'dev';
let isUat = ENV === 'uat';
let isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    let config = {};

    config.entry = {
        'app': ['./app/index.js'],
        'global': ['jquery', 'moment', 'lodash'],
        'vendor': ['angular', 'angular-local-storage', 'angular-ui-router', 'oclazyload', 'restangular', 'ngstorage']
    };

    if (isServe) {
        config.entry.app.push('./app/app.config.serve.js');
    }

    config.output = {
        // path: path.resolve(__dirname, "../dist"),
        path: distPath,
        // path: '/dist/',
        // publicPath: './dist/',
        filename: 'js/[name].js'
    };

    config.resolve = {
        extensions: ['.js', '.json', '.css', '.scss', '.html'],
        // modules: [
        //     path.resolve('./app')
        // ],
        // alias: {
        //     'angular': path.resolve(path.join(__dirname, '../node_modules', 'angular'))
        // },
    };

    config.module = {
        rules: [
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, "../app")
                ],
                exclude: [
                    path.resolve(__dirname, "../(node_modules|bower_components)")
                ],
                use: [
                    {
                        loader: 'ng-annotate-loader'
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },

            {
                test: /\.json$/,
                use: 'json-loader'
            },

            {
                test: /\.html$/,
                include: [
                    path.resolve(__dirname, "../app")
                ],
                use: [
                    'html-loader',
                    // {
                    //     loader: 'ngtemplate-loader',
                    //     options: {
                    //         module: 'signApp'
                    //     }
                    // }
                ]
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: 'images/[name].[ext]',
                    //         publicPath: './dist'
                    //     }
                    // },

                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]'
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, "../app")
                ]
            },

            {
                test: /\.css$/,
                include: path.resolve(__dirname, "../app"),
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']})
            },

            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, "../app"),
                use: ['raw-loader', 'postcss-loader']
            },

            {
                test: /\.(scss|sass)$/,
                include: path.resolve(__dirname, "../app/sass"),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },

                        {
                            loader: 'postcss-loader'
                        },

                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [
                                    path.resolve(__dirname, "../node_modules/compass-mixins")
                                ]
                            }
                        }
                    ]
                })
            },

            {
                test: /\.(scss|sass)$/,
                exclude: path.resolve(__dirname, "../app/src"),
                use: [
                    {
                        loader: 'raw-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, "../node_modules/compass-mixins")
                            ]
                        }
                    }
                ]
            },
        ]
    };

    // if ( isServe ) {
    //     config.module.rules.push({
    //         test: /\.js$/,
    //         include: path.resolve(__dirname, "../app"),
    //         // exclude: path.resolve(__dirname, "../node_modules"),
    //         loader: "eslint-loader",
    //         options: {
    //             emitError: true,
    //             quiet: true
    //         }
    //     });
    // }

    config.plugins = [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['vendor'],
            minChunks: Infinity,
            filename: 'js/vendor.min.js',
        }),

        new webpack.NamedModulesPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'global',
        //     chunks: ['global'],
        //     minChunks: Infinity,
        //     filename: 'js/global.min.js',
        // }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     chunks: ['vendor'],
        //     minChunks: Infinity,
        //     filename: 'js/vendor.min.js',
        // }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'app',
        //     chunks: ['app'],
        //     minChunks: Infinity,
        //     filename: 'js/app.min.js',
        // }),
        //
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.min.js',
        }),

        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: isServe
        }),

        // new ExtractTextPlugin("css/styles.css"),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../app/src/images"),
            to: path.resolve(__dirname, "../dist/images")
        }]),

        new HtmlWebpackPlugin({
            inject: false,
            cache: false,
            filename: 'index.html',
            template: 'index.html',
            title: 'My App',
            baseURL: isServe ? '/' : '/wallet/visa/'
        }),

        new Dotenv({
            path: './.env.' + ENV,
            safe: false,
            systemvars: false
        }),

        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.npm_lifecycle_event)
        // }),

        // new webpack.ProvidePlugin({
        //     jQuery: 'jquery',
        //     $: 'jquery',
        //     jquery: 'jquery'
        // })

        // new webpack.HotModuleReplacementPlugin()
        // new webpack.optimize.DedupePlugin()
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.bundle.js'
        // }),
        //
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         context: __dirname
        //     }
        // })
    ];

    if ( !isProd ) {
        config.plugins.push(
            new webpack.SourceMapDevToolPlugin({
                filename: 'js/[name].js.map'
            })
        );
    } else {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                    drop_console: false
                },
                output: {
                    comments: false
                },
                mangle: {
                    keep_fnames: true
                }
            })
        );
    }

    config.devServer = {
        contentBase: './dist',
        // historyApiFallback: true,
        quiet: true,
        // host: '10.10.72.155',
        stats: 'none' // none (or false), errors-only, minimal, normal (or true) and verbose
    };

    return config;
}();

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);

    return path.join.apply(path, [__dirname].concat(args));
}