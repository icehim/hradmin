<template>
  <div class="sonb">
    我是sonb
  </div>
</template>

<script>
export default {
  name: 'Sonb',
  mounted() {
    this.$bus.$on('atob', (msg) => {
      // console.log(msg)
    })
  },
  beforeDestroy() {
    this.$bus.$off('atob')
  }
}
</script>

<style lang="scss" scoped>
  .sonb{
    width: 200px;
    height: 300px;
    border: 5px solid green;
  }
</style>
