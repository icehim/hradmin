import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from '@/store/modules/user'
import persistedstate from 'vuex-persistedstate'
import routes from '@/store/modules/routes'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    routes
  },
  getters,
  plugins: [
    persistedstate({
      paths: ['user.token']
    })
  ]
})

export default store
