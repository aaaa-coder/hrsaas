import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置白名单
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  // 设置进度条
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  // 强制关闭
  NProgress.done()
})

router.afterEach(() => {
  // 修复跳转无法关闭的bug
  NProgress.done()
})
