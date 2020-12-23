import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: []
}

const mutations = {
  setRoutes(state, payload) {
    state.routes = [...constantRoutes, ...payload]
  }
}

const actions = {
  filterRoutes(context, payload) {
    // 过滤掉权限路由以外的路由
    const MyRoutes = asyncRoutes.filter(item => { payload.menus.indexOf(item.name) > -1 })
    // 404 page must be placed at the end !!!
    MyRoutes.push({ path: '*', redirect: '/404', hidden: true })
    context.commit('setRoutes', MyRoutes)
    return MyRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
