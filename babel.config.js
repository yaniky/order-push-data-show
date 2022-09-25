module.exports = function (api) {
    api.cache(false);
    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    corejs: "3"
                }
            ]
        ],
        plugins: [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-regenerator",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-transform-modules-umd"
        ],
        env: {
            test: {
                plugins: ["istanbul"]
            }
        }
    };
};
