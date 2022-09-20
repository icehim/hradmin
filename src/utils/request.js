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
import { Message } from 'element-ui'
const _axios = axios.create({
  baseURL: process.env['VUE_APP_BASE_API']
})

_axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

_axios.interceptors.response.use(
  // 2：表示成功
  (res) => {
  // 在响应拦截器内之返回对应的data数据
    // 判断请求是否正常
    if (res.data.success) {
      return res.data
    } else {
      // 错误提示
      Message.error(res.data.message)
      // 让api调用执行.catch，终止了.then执行
      // 如果没有这行代码，const res = await 接口方法，res值将为undefined
      return Promise.reject(res.data.message)
    }
  }, (error) => {
    return Promise.reject(error)
  })

export default _axios
