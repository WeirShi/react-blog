const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra');
const path = require('path');


module.exports = override(
    // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css', // 自动打包相关的样式
    }),

    addLessLoader({
        sourceMap: true,
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: { "@primary-color": "#1DA57A" }
        }
    }),

    addWebpackAlias({
        '@': path.resolve('./src')
    })
);
