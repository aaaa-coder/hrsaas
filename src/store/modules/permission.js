import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: []
}

const mutations = {
  setRoutes(state, payload) {
    console.log('动态路由---------------------')
    console.log(payload)
    state.routes = [...constantRoutes, ...payload]
    console.log(state.routes)
  }
}

const actions = {
  filterRoutes(context, payload) {
    // 过滤掉权限路由以外的路由
    console.log('传递的payload------------------------------------------')
    console.log(payload)
    const myRoutes = asyncRoutes.filter(item => payload.menus.indexOf(item.name) > -1)
    // 404 page must be placed at the end !!!
    myRoutes.push({ path: '*', redirect: '/404', hidden: true })
    context.commit('setRoutes', myRoutes)
    return myRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
