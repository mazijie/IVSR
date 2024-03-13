const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': { // 请求的代称，写在Axios里的BaseUrl
        target: 'http://localhost:8000', // 真实请求URl
        // ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite:{
          '^/api':'/api'
        }
      }
    }
  },
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => ({
          ...options,
          compilerOptions: {
            isCustomElement: tagName => {
              return tagName === 'vue-advanced-chat' || tagName === 'emoji-picker'
            }
          }
        }))
  },
  configureWebpack: {
    resolve: {
      mainFields: ['main','browser']
    }
  }
})
