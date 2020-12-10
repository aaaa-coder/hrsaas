import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

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
    config.headers.Authorization = `Bearer ${store.getters.token}`
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
}, err => {
  console.dir(err)
  Message.error(err.message)
  return Promise.reject(err.message)
})

export default service
