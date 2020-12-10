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

export function logout() {}
