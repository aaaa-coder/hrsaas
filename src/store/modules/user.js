import { setToken, getToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { Message } from 'element-ui'
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
    }
  },
  actions: {
    async login(context, data) {
      // login(data)是自己导入的方法，其中res为result
      const result = await login(data)
      Message.success('登录成功')
      context.commit('setToken', result)
    },
    async getUserInfo(context) {
      const result = await getUserInfo()
      context.commit('setUserInfo', result)
      return result
    }
  }
}
