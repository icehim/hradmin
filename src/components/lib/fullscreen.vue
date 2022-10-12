<template>
  <div>
    <svg-icon icon-class="fullscreen" @click="svgClick" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'Fullscreen',
  methods: {
    svgClick() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        this.$message.error('该浏览器不支持全屏')
      }
    }
  }
}
</script>

<style scoped>

</style>
