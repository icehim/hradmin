import VueI18n from 'vue-i18n'
import Vue from 'vue'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en'
import zh from './zh'
//  1.读取本地cookie存储  2.修改时存储到cookie  有get set remove 方法
import cookieJs from 'js-cookie'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: cookieJs.get('lang') || 'zh', // zh：中文 en:代表英文
  messages: {
    zh: {
      h: '首页',
      ...zhLocale,
      ...zh
    },
    en: {
      h: 'home',
      ...enLocale,
      ...en
    }
  }
})
export default i18n
