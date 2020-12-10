import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(data)
    }
  },
  actions: {
    async login(context, data) {
      // login(data)是自己导入的方法，其中res为result
      try {
        const result = await login(data)
        Message.success('登录成功')
        context.commit('setToken', result)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
