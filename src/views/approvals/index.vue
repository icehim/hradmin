<template>
  <div>
    审批
    <h1>{{ $t('h') }}</h1>
    <button @click="btnClick">全屏切换</button>
    <button @click="btnClick2">语言切换</button>

  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  created() {
  },
  methods: {
    btnClick() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        this.$message.error('当前浏览器不支持全屏')
      }
    },
    btnClick2() {
      const _lang = ['zh', 'en']
      const _index = 1 - _lang.indexOf(this.$i18n.locale)
      this.$i18n.locale = _lang[_index]
    }
  }
}
</script>

<style scoped>

</style>
