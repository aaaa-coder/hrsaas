import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/` + id,
    method: 'delete'
  })
}

export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

export function getRoleDetail(id) {
  return request({
    url: '/sys/role/' + id
  })
}

export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

// 添加角色
export function addRole(data) {
  return request({
    method: 'post',
    url: '/sys/role',
    data
  })
}
