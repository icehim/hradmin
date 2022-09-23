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
  }
}
