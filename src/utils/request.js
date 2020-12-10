import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // 设置开发基准路径
  baseURL: process.env.VUE_APP_BASE_API,
  // 延时
  timeout: 5000
})

// request interceptor
service.interceptors.request.use()

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
})

export default service
