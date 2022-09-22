import request from '@/utils/request'

// 定义登录api
export function sysLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function sysProfile() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取用户其他信息包括头像
export function sysUser(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
