import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//mathjax全局配置
import globalVariable from '@/js/globalVariable.js'
Vue.prototype.commonsVariable = globalVariable;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
