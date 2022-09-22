// export default {
//   install(Vue, options) {
//     Vue.prototype.$num = options
//   }
// }

// import Test from '@/components/test/test'
export default function(Vue, options) {
  Vue.prototype.$num = options
  // 全局注册test组件
  // Vue.component(Test.name, Test)
  // 自动读取当前文件夹下的.vue组件进行全局注册
  // const 返回方法 = require.context(路径,是否读取子文件,匹配规则)
  const req = require.context('./', true, /\.vue$/)
  // req是一个function，他有一个属性方法叫keys()，能拿到所有的读取文件的路径
  // console.log(req.keys())
  // 返回方法(req)它是一个function，传入获取的路径可以实现该文件的导入加载
  req.keys().forEach(item => {
    // req(item).default===import导入的组件
    const com = req(item).default
    Vue.component(com.name, com)
  })
  /*
  * function Toast(){
  *
  * }
  *
  * Toast.succuess.function(){}
  *  */
}
