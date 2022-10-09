<template>
  <div>
    <TestUpload :before-upload="beforeUpload" :on-success="onSuccess" />
  </div>
</template>
<script>
import TestUpload from './components/testUpload.vue'
export default {
  components: {
    TestUpload
  },
  methods: {
    beforeUpload(file) {
      console.log(file)
      const isLimit1M = file.size / 1024 / 1024 < 1
      if (!isLimit1M) {
        this.$message.error('请上传1m内的文件')
      }
      return isLimit1M
    },
    onSuccess(obj) {
      console.log(obj)
    }
  }
}
</script>
<style></style>
