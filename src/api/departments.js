import request from '@/utils/request'
// 获取部门数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function addDepartments(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/` + id
  })
}
export function getDeptDetails(id) {
  return request({
    url: '/company/department/' + id
  })
}

export function updateDepartments(data) {
  return request({
    method: 'put',
    url: '/company/department/' + data.id,
    data
  })
}
