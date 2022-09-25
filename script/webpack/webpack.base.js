const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

const appName = "test-app";

const babelWebpackConfig = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: "3"
            }
        ],
        [
            "@babel/preset-typescript", // 引用Typescript插件
            {
                allExtensions: true // 支持所有文件扩展名，否则在vue文件中使用ts会报错
            }
        ]
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ]
};

module.exports = {
    entry: path.resolve(__dirname, `../../apps/${appName}/src/index.ts`),
    output: {
        filename: "js/[name].[contenthash].js",
        chunkFilename: "js/[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, `../../apps/${appName}/dist`)
    },
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                include: [
                    path.resolve(__dirname, `../../apps/${appName}/src`)
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        ...babelWebpackConfig
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb  指定大小 小于该值则使用inline模式
                    }
                },
                generator: {
                    filename: "static/[hash][ext][query]"
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, `../../apps/${appName}/src`),
            "@comp": path.resolve(__dirname, `../../apps/${appName}/src/components`)
        },
        extensions: [".js", ".ts", ".vue"]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `../../apps/${appName}/public/index.html`)
        })
    ]
};