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
