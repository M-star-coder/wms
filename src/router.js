/* eslint-disable eqeqeq */
/*
 * @Author:tina.zhang
 * @Date: 2020-12-02 15:04:32
 * @LastEditors:tina.zhang
 * @LastEditTime: 2020-12-02 15:15:06
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'

Vue.use(Router)
console.log(routes)
const routers = new Router({
  mode: 'history',
  routes: [{
    path: '/main',
    name: 'main',
    component: () => import('@/pages/index'),
    redirect: '',
    children: routes
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }]
})
export default routers
