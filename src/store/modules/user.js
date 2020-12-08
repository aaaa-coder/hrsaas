import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'
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
      const result = await login(data)
      console.log(result)
      if (result.data.message === '操作成功！') {
        context.commit('setToken', result.data.data)
      }
    }
  }
}
