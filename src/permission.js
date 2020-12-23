import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置白名单
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  // 设置进度条
  NProgress.start()
  if (store.getters.token) {
    // 前往登录页
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果没id就获取，有就执行
      if (!store.getters.userId) {
        // debugger
        // 获取用户信息
        const { roles } = await store.dispatch('user/getDetailById')
        console.log('---------------')
        console.log(roles)
        const MyRoutes = await store.dispatch('permission/filterRoutes')
        // 添加动态路由
        router.addRoutes(MyRoutes)
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 如果是白名单
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
