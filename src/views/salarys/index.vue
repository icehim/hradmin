<template>
  <div style="display: flex">
    <!--兄弟组件传值：
      1.Vue.prototype.$bus = new Vue()
          监听: this.$bus.$on('事件名',(参数值)=>{})
          触发: this.$bus.$emit('事件名',参数值))
          销毁: this.$bus.$off('事件名‘)
        注意:一定要销毁，$on他有累加功能
-->
    <!--sona传值给sonb-->
    <sona />
    <span ref="span">
      <sonb />
    </span>
  </div>
</template>

<script>
import sonb from '@/views/salarys/components/Sonb'
import sona from '@/views/salarys/components/Sona'

export default {

  components: {
    sona,
    sonb
  },
  mounted() {
    document.addEventListener('click', this.documentClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {
    documentClick(e) {
      // 点击项dom：e.target
      //  span的dom:this.$refs.span
      // 判断span的dom是否包含（contains）点击项的dom
      if (this.$refs.span.contains(e.target)) {
        console.log('点击了span')
      } else {
        console.log('span之外')
      }
    }
  }
}
</script>

<style scoped>

</style>
