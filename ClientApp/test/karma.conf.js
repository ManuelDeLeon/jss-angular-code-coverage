// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

var path = require('path');
var webpackConfig = require('../../webpack.config.js').filter(config => config.target !== 'node')[0];
webpackConfig.module.postLoaders = [{
    test: /\.ts$/,
    include: [path.resolve(__dirname, "../app")],
    loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true',
    exclude: [/\.spec\.ts$/]
}];

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            '../../wwwroot/dist/vendor.js',
            './boot-tests.ts'
        ],
        preprocessors: {
            './boot-tests.ts': ['webpack']
        },
        reporters: ['progress', 'karma-remap-istanbul'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        webpack: webpackConfig,
        webpackMiddleware: { stats: 'errors-only' },
        remapIstanbulReporter: {
            reports: {
                html: 'ClientApp/test/coverage'
            }
        }
    });
};
