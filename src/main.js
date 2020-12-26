/*
 * @Author:tina.zhang
 * @Date: 2020-12-02 14:57:23
 * @LastEditors:tina.zhang
 * @LastEditTime: 2020-12-02 15:11:26
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/element'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
