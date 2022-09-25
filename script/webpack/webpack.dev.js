const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

const {PORT} = process.env;

module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
        port: PORT,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    }
});