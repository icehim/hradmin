// 调用登录api并存储token到vuex,并存储到浏览器
/*
* cookie存储到浏览器
* js-cookie.js  已封装了cookie操作
* 获取：get(ket)
* 设置：set(key,value)
* 删除:remove(key)
*  */
import { sysLogin, sysProfile, sysUser } from '@/api/user'
import { syncRoutes, constantRoutes } from '@/router'
// import { getToken, setToken } from '@/utils/auth'
import router from '@/router'
import { resetRouter } from '@/router'
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
    resetRouter()
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
    // console.log(res)
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
    // 获取员工其他信息包括头像
    const res2 = await sysUser(res.data.userId)
    /*
    * 对象合并:
    *   a,b ===>[...a,...b]
    *   返回一个新对象（目标对象）=Object.assign(目标对象，需要合并的对象1,需要合并的对象2,...)
    *  */
    // console.log(res2)
    // store.commit('setUserInfo', { ...res.data, ...res2.data })
    const info = Object.assign({}, res.data, res2.data)
    store.commit('setUserInfo', info)
    //  动态添加路由
    // 先匹配出应该天际的路由
    // 动态路由与权限数据
    // 权限数据info.roles.menus
    // 动态路由在
    // 动态路由过滤，当前项的mate.name值在权限数据中存在
    const newArr = syncRoutes.filter(item => {
      return info.roles.menus.includes(item.meta.name)
    })
    newArr.push({ path: '*', redirect: '/404', hidden: true })
    // 动态添加相应路由
    //  当前模块调用其他模块的mutations方法
    // commit('模块名/方法名'，参数值,{root:true})
    store.commit('routes/setRoutes', [...constantRoutes, ...newArr], { root: true })
    router.addRoutes(newArr)
    // addRoutes:坑点
    //  path与fullPath区别：path带上参数
    //  1.刚添加的路由不能立马使用，再经过一次导航守卫就可以用了 next(to.fullPath)
    //  2.404的全局匹配要放到动态路由添加内
    // console.log(newArr)
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
