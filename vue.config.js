/*
 * @Author:tina.zhang
 * @Date: 2020-12-02 11:29:04
 * @LastEditors:tina.zhang
 * @LastEditTime: 2020-12-02 15:06:51
 * @Description: file content
 */
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const resolve = (dir) => path.resolve(__dirname, dir);
const devServer = require('./devServer.js');

var plugins = [];
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new CompressionPlugin({
            filename: '[path].gzip[query]', // 提示compression-webpack-plugin@2.0.0的话filename改为asset
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 1024, // 内容超过10KB进行压缩
            minRatio: 0.6,
        })
    );
}
module.exports = {
    // 部署应用包时的基本URL
    publicPath: '/',

    // 构建输出目录
    outputDir: 'dist',

    // 静态资源(js、css、img、fonts)目录
    assetsDir: 'static',

    // 是否开启eslint保存检测
    lintOnSave: false,

    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    // 生产环境的 source map
    productionSourceMap: false,

    devServer,

    configureWebpack: {
    // 公用模块引用CDN
        externals: {
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            axios: 'axios',
        },
        plugins,
    },

    // webpack配置
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = 'WMS管理';
            args[0].cdn = process.env.CDN;
            return args;
        });
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('pages', resolve('src/pages'))
            .set('api', resolve('src/api'));
    },

    pluginOptions: {
        autoRouting: {
            chunkNamePrefix: 'page-',
        },
    },
};
