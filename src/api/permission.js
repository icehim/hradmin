import request from '@/utils/request'

// 获取权限点数据
export function sysPermission() {
  return request({
    url: '/sys/permission'
  })
}
// 新增权限点数据
export function sysPermissionPost(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 删除权限点数据
export function sysPermissionDelete(id) {
  return request({
    url: '/sys/permission/' + id,
    method: 'delete'
  })
}

// 编辑权限点数据
export function sysPermissionPut(data) {
  return request({
    url: '/sys/permission/' + data.id,
    method: 'put',
    data
  })
}
