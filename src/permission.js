import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { cancelAll } from '@/utils/request'
const whitePage = ['/404', '/login']

router.beforeEach(async(to, from, next) => {
  /*
  * 不需要登陆就可以进入的页面叫白名单那页面
  *
  * 如果有token
  *   进入的页面是登录页=》跳转到首页
  *   进入的页面是非登录页:
  *     如果没有用户信息
  *       调用接口获取用户信息，获取成功=》正常进入
  *     如果有用户信息
  *       直接正常进入
  *       token失效:没有用户信息=》删除token去登录
  * 如果没有token
  *   进入的页面是白名单页面=》正常进入
  *   进入的页面是非白名单页面=》跳转到登录页
  *  */
  Nprogress.start()
  if (store.state.user.token) {
    if (to.path.toLowerCase() === '/login') {
      next('/')
    } else {
      if (store.state.user.userInfo.userId) {
        next()
      } else {
        await store.dispatch('user/getUserInfo')
        // next后面的代码还是会执行 actions内方法调用是异步
        // fullpath带有参数
        next(to.fullPath)
      }
    }
  } else {
    if (whitePage.includes(to.path)) {
      next()
    } else {
      // 跳转登陆页面时传入回跳地址
      next('/login?redirect=' + to.fullPath)
    }
  }
  Nprogress.done()
})
router.afterEach((to, from) => {
  Nprogress.done()
  cancelAll()
})
