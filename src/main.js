import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 引入自定义组件
import * as directives from '@/directives'
Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

import components from '@/components'
Vue.use(components)

import * as filters from '@/filters'
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
// 引入打印组件
import Print from 'vue-print-nb'
Vue.use(Print)

// 混入mixin
import { checkPermissionMiXin } from '@/mixin'
Vue.mixin(checkPermissionMiXin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
