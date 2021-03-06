import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

export function getDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
// 获取员工详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

