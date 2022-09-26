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
    <sonb />
  </div>
</template>

<script>
import sonb from '@/views/salarys/components/Sonb'
import sona from '@/views/salarys/components/Sona'

export default {

  name: 'Index',
  components: {
    sona,
    sonb
  }
}
</script>

<style scoped>

</style>
