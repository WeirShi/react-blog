const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra');
const path = require('path');
const addCustomize = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    // webpack config  
    return config;
  }

module.exports = {
    webpack: override(
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
        }),

        addCustomize()
    )
}

