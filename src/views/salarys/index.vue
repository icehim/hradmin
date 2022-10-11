<template>
  <div>
    <canvas ref="canvas" />
    <button @click="btnClick">生成二维码</button>
  </div>
</template>

<script>
import Qrcode from 'qrcode'
export default {
  data() {
    return {
      key: ''
    }
  },
  methods: {
    btnClick() {
      Qrcode.toCanvas(this.$refs.canvas, '111', { width: 200, height: 200 })
    }
  }
}
</script>

<style scoped>

</style>
