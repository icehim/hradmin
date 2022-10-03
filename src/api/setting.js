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
