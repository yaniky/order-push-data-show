const commonConfig = require("../../karma.base");

module.exports = function(config) {
    config.set({
        ...commonConfig,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO
    });
};