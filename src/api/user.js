import request from '@/utils/request'

// 定义登录api
export function sysLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
