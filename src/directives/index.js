export default {
  // 指令名:生命周期
  globalImageError: {
    bind() {},
    inserted(dom, obj) {
      dom.src = dom.src || obj.value
      dom.onerror = () => {
        dom.src = obj.value
      }
    },
    update() {},
    componentUpdated(dom, obj) {
      dom.src = dom.src || obj.value
    },
    unbind(dom) {
      dom.onerror = null
    }
  },
  //  点击指令所在dom外时执行一个传入的方法
  outClick: {
    inserted(dom, obj, vnode) {
      vnode.fn = (e) => {
        //  判断点击是否在dom内还是dom外
        if (!dom.contains(e.target)) {
          obj.value() // 执行传入的treeCloseEvent()方法
        }
      }
      document.addEventListener('click', vnode.fn)
    },
    unbind(dom, obj, vnode) {
      document.removeEventListener('click', vnode.fn)
    }
  }
}
