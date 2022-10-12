// 与路由的配置数据保持同步
import { constantRoutes } from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, value) {
    state.routes = value
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
