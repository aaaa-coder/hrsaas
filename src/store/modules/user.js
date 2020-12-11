import { setToken, getToken } from '@/utils/auth'
import { login, getInfo as getUserInfo, getDetailById } from '@/api/user'
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
    // 登录
    async login(context, data) {
      // login(data)是自己导入的方法，其中res为result
      const result = await login(data)
      Message.success('登录成功')
      context.commit('setToken', result)
    },
    // 获取用户简单信息
    async getUserInfo({ commit }) {
      const result = await getUserInfo()
      commit('setUserInfo', result)
      return result
    },
    // 获取详细信息
    async getDetailById(context) {
      // result 是用户的信息
      const result = await getUserInfo()
      const baseInfo = await getDetailById(result.userId)
      // 解开拼接
      const baseResult = { ...result, ...baseInfo }
      console.log(baseResult)
      context.commit('setUserInfo', baseResult)
      return baseResult
    }
  }
}
