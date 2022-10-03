import request from '@/utils/request'
// import axios from 'axios'

// 定义登录api
// let fn = () => {}
export function sysLogin(data) {
  // fn()
  return request({
    url: '/sys/login',
    method: 'post',
    noCancel: true,
    // cancelToken:生成一个取消该请求的方法
    // cancelToken: new axios.CancelToken((cancelFn) => {
    //   // cancelFn:当前请求的取消方法
    //   fn = cancelFn
    // }),
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

