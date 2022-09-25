const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const libName = process.env.LIB;
const libOutName = process.env.OUT_NAME;
const exportTop = !!process.env.EXPORT_TOP;

const packagePath = path.resolve(__dirname, `../../packages/${libName}`);

const includePath = [
    path.resolve(packagePath, "../")
];

const outPut = {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(packagePath, "./lib"),
    libraryTarget: "umd",
    library: libOutName,
    globalObject: "this",
    publicPath: "auto"
};

if (exportTop) {
    outPut["libraryExport"] = libOutName;
}

module.exports = {
    mode: "production",
    entry: {
        index: path.resolve(packagePath, "./src/index.ts")
    },
    output: outPut,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: includePath,
                use: {
                    loader: "babel-loader?cacheDirectory=true"
                }
            },
            {
                test: /\.ts$/,
                include: includePath,
                use: [
                    "babel-loader?cacheDirectory=true",
                    "ts-loader"
                ]
            },
            {
                test: /\.(glsl|vs|fs)$/,
                loader: "webpack-glsl-loader"
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        },
        extensions: [".js", ".ts"],
        fallback: {
            fs: false
        }
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    externals: [{
        xmlhttprequest:"{XMLHttpRequest:XMLHttpRequest}"
    }],
    optimization: {
        minimizer: [
            new TerserPlugin()
        ]
    }
};