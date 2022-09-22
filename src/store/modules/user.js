// 调用登录api并存储token到vuex,并存储到浏览器
/*
* cookie存储到浏览器
* js-cookie.js  已封装了cookie操作
* 获取：get(ket)
* 设置：set(key,value)
* 删除:remove(key)
*  */
import { sysLogin, sysProfile } from '@/api/user'
// import { getToken, setToken } from '@/utils/auth'
const state = {
  token: '',
  userInfo: ''
}
const mutations = {
  setToken(state, value) {
    state.token = value
    // setToken(value)
  },
  setUserInfo(state, value) {
    state.userInfo = value
  },
  logout(state) {
    state.token = ''
    state.userInfo = ''
  }
}
const actions = {
  async toLogin({ commit }, value) {
    // sysLogin(value).then((res) => {
    //   commit('setToken', res.data)
    // })
    //   .catch((err) => {
    //     console.log('错误:', err)
    //   })

    const res = await sysLogin(value)
    console.log(res)
    commit('setToken', res.data)

    // console.log(res)
    // if (res.success) {
    //   commit('setToken', res.data)
    // } else {
    // 提醒用户
    /*
      * message:
      * this.$message.success/error/warning/info('消息内容')
      * this.$message({
      *   type:'success/error/warning/info'
      *   message:'消息内容'
      * })
      * 在js中调用
      * import {Message} from 'element-ui'
      * Message === this.$message
      *  */
    // Message.error(res.message)
    // }
  },
  async getUserInfo(store) {
    const res = await sysProfile()
    store.commit('setUserInfo', res.data)
    console.log(res)
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
