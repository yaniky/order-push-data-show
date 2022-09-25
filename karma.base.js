// Karma configuration
// Generated on Tue Oct 19 2021 11:26:50 GMT+0800 (中国标准时间)

module.exports = {
    // 识别ts
    mime: {
        "text/x-typescript": ["ts", "tsx"]
    },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ["mocha", "karma-typescript"],


    // list of files / patterns to load in the browser
    files: [
        "src/**/*.ts",
        "test/*.spec.ts"
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
        "!(node_modules|Server|dist)/**/*.+(ts|tsx)": "karma-typescript"
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ["progress"],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: [
        "ChromeHeadless"
        // "Chrome"
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

    plugins : [
        "karma-mocha",
        "karma-typescript",
        "karma-chrome-launcher"
    ]
};
