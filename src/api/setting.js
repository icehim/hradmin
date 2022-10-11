import request from '@/utils/request'
// 角色列表api
export function sysRole(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 获取企业信息
export function company(id) {
  return request({
    url: `/company/${id}`
  })
}

// 新增角色
export function sysRolePost(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 删除角色
export function sysRoleDelete(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}
// 编辑角色
export function sysRolePut(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}
// 角色详情
export function sysRoleId(id) {
  return request({
    url: '/sys/role/' + id
  })
}
// 为角色分配权限数据
export function sysRoleAssignPrem(id, permIds) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data: {
      id,
      permIds
    }
  })
}
