import request from '@/utils/request'
// 获取员工列表
export function sysUser(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 新增员工
export function sysUserPost(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 删除员工
export function sysUserDelete(id) {
  return request({
    // url: '/sys/user/' + id,
    url: `/sys/user/${id}`,
    method: 'delete'

  })
}

// 批量导入
export function sysUserBatch(data) {
  return request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
}
// 修改用户基本信息
export function sysUserPut(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
