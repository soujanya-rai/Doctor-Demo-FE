const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  devServer: {
    port: 3000,
      proxy: {
          '/api': {
              target: 'http://localhost:18091',
              ws: true,
              changeOrigin: true
          }
      }
  },


  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})
