<template>
  <div>
    <el-button @click="outputClick">导出excel</el-button>
    <TestUpload :before-upload="beforeUpload" :on-success="onSuccess" />
  </div>
</template>
<script>
import TestUpload from './components/testUpload.vue'
// import { export_json_to_excel } from '@/vendor/Export2Excel'
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
    },
    outputClick() {
      import('@/vendor/Export2Excel')
        .then(res => {
          res.export_json_to_excel({
            header: ['姓名', '转正时间'],
            data: [['张三', '2021-1-1'], ['里斯', '2021-1-1']],
            filename: '导出测试'
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style></style>
