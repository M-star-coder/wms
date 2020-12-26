/*
 * @Author:tina.zhang
 * @Date: 2020-12-02 11:29:04
 * @LastEditors:tina.zhang
 * @LastEditTime: 2020-12-02 15:10:08
 * @Description: file content
 */
import axios from 'axios'
import { Notification } from 'element-ui'
import router from '../router'
const instance = axios.create({
  // baseURL: "",
  timeout: 20000
  // headers: { }
})
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => response.data,
  error => {
    // eslint-disable-next-line eqeqeq
    if (error?.response?.status == 401) {
      // 网关不通过，即用户登录信息校验失败，需要用户重新登录
      Notification({
        type: 'warning',
        title: '登录异常',
        message: '登录信息校验失败，请重新登录'
      })
      // 跳转回login路由，并把目标路由的url路径保存在login的query中
      top.postMessage({
        handlerType: 'reLogin',
        params: {}
      }, '*')
      // window.location.href = '/home?redirect=' + router.currentRoute.fullPath
    } else {
      const message = error?.response?.data?.msg || error.message || '网络异常'
      Notification({
        type: 'error',
        title: '网络异常',
        message
      })
    }
    return Promise.reject(error)
  }
)

export default instance
