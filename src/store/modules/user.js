import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getInfo as getUserInfo, getDetailById } from '@/api/user'
import { Message } from 'element-ui'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(data)
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
    // 删除token
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    // 删除用户数据
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录
    async login(context, data) {
      // login(data)是自己导入的方法，其中res为result
      const result = await login(data)
      Message.success('登录成功')
      context.commit('setToken', result)
      setTimeStamp()
    },
    // 获取用户简单信息
    async getUserInfo({ commit }) {
      const result = await getUserInfo()
      commit('setUserInfo', result)
      return result
    },
    // 获取详细信息
    async getDetailById({ commit }) {
      // result 是用户的信息
      const result = await getUserInfo()
      const baseInfo = await getDetailById(result.userId)
      // 解开拼接
      const baseResult = { ...result, ...baseInfo }
      commit('setUserInfo', baseResult)
      return baseResult
    },
    async logout({ commit }) {
      // 删除token
      commit('removeToken')
      // 删除用户信息
      commit('removeUserInfo')
      resetRouter()
    }
  }
}
