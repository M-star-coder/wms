/*
 * @Author:tina.zhang
 * @Date: 2020-12-02 09:51:18
 * @LastEditors:tina.zhang
 * @LastEditTime: 2020-12-02 10:41:27
 * @Description: 本地开发配置接口路径
 */
// const target = 'https://devapi.henglink.com'
const target = 'http://10.11.18.35:9527'    //刘星语

module.exports = {
  port: '8080',
  proxy: {
    '/api': {
      target,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
  }
}
