import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

const timeOut = 7200
// create an axios instance
const service = axios.create({
  // 设置开发基准路径
  baseURL: process.env.VUE_APP_BASE_API,
  // 延时
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      // 报告错误类型
      return Promise.reject(new Error('token过期了'))
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(res => {
  // 将获取的数据进行结构
  const { success, message, data } = res.data
  // 成功就返回数据
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  console.dir(error)
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error(error.response.data.message + '，请登录')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error.message)
})

function isTimeOut() {
  const nowDate = Date.now()
  const timeStamp = getTimeStamp()
  return (nowDate - timeStamp) / 1000 >= timeOut
}
export default service

