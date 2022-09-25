const path = require("path");
const { nodeResolve } = require("@rollup/plugin-node-resolve"); // 依赖引用插件
const commonjs = require("@rollup/plugin-commonjs");
const { eslint } = require("rollup-plugin-eslint");
const ts = require("rollup-plugin-typescript2");
const { babel } = require("@rollup/plugin-babel");
const rollup = require("rollup");
const fs = require("fs");
const { terser } = require("rollup-plugin-terser");

const getPath = _path => path.resolve(__dirname, _path);
const libName = process.env.LIB;
const libOutName = process.env.OUT_NAME;

const extensions = [
    ".js",
    ".ts",
    ".tsx"
];

const tsPlugin = ts({
    tsconfig: getPath(`../../packages/${libName}/tsconfig.json`), // 导入本地ts配置
    extensions
});

const esPlugin = eslint({
    throwOnError: true,
    include: ["src/**/*.ts"],
    exclude: ["node_modules/**", "lib/**"]
});

const babelRollupConfig = {
    babelHelpers: "runtime",
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: "3"
            }
        ]
    ],
    exclude: /node_modules/,
    extensions,
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-transform-regenerator",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ]
};

// 基础配置
const commonConf = {
    input: getPath(`../../packages/${libName}/src/index.ts`),
    plugins:[
        nodeResolve(extensions),
        esPlugin,
        tsPlugin,
        babel(babelRollupConfig),
        commonjs(),
        terser()
    ]
};

// 需要导出的模块类型
const ouputOption = {
    name: libOutName,
    file: "lib/index.js", // 通用模块
    format: "umd",
    sourcemap: true
};

async function exitsFolder(absPath) {
    try {
        await fs.promises.stat(absPath);
    } catch (e) {
        // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
        await fs.promises.mkdir(absPath, {recursive: true});
    }
}

function emptyDir(filePath) {
    const files = fs.readdirSync(filePath);//读取该文件夹

    files.forEach((file) => {
        const nextFilePath = `${filePath}/${file}`;
        const states = fs.statSync(nextFilePath);

        if (states.isDirectory()) {
            emptyDir(nextFilePath);
        } else {
            fs.unlinkSync(nextFilePath);
        }
    });
}

async function build() {
    const outDir = path.resolve(__dirname, `./../../packages/${libName}/lib`);

    await exitsFolder(outDir);
    emptyDir(outDir);

    const bundle = await rollup.rollup(commonConf);

    // generate code and a sourcemap
    // const { code, map } = await bundle.generate(ouputOption);

    // or write the bundle to disk
    try {
        await bundle.write(ouputOption);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
}

build();