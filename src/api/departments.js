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
    url: '/company/department'
  })
}

export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}
