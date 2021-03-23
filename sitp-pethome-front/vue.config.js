const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '/',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@components', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
      .set('@picture', resolve('src/assets/picture'))
      .set('@common', resolve('src/common'))
      .set('@store', resolve('src/store'))
      .set('@router', resolve('src/router'))
      .set('@', resolve('src'));
  },
  devServer: {
    // 设置主机地址
    //   host: '127.1.0.1',
    // 设置默认端口
    //port: 3000,
    // 设置代理
    proxy: {
      '/gaode': {
        target: 'https://restapi.amap.com', //访问地址
        changeOrigin: true,
        pathRewrite: {
          '^/gaode': ''
        }
      },
      // '/api': {
      //   // 目标 API 地址
      //   target: 'http://127.0.0.1:5000',
      //   // 如果要代理 websockets
      //   ws: true,
      //   // 将主机标头的原点更改为目标URL
      //   changeOrigin: true
      // }
    }
  }
};
