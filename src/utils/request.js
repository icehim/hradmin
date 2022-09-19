/*
* 1.安装axios npm i axios
* 2.导入axios import axios from ‘axios’
* 3.创建axios符文
*   create _axios = axios.create({
*     baseURL:process.env.VUE_APP_BASE_API
* })
* 4.创建请求拦截与响应拦截
* 5.暴露（export ）出去
* */

import axios from 'axios'
const _axios = axios.create({
  baseURL: process.env['VUE_APP_BASE_API']
})

_axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

_axios.interceptors.response.use((res) => {
  // 在响应拦截器内之返回对应的data数据
  return res.data
}, (error) => {
  return Promise.reject(error)
})

export default _axios
