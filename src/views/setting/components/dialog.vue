<template>
  <div>
    <!--el-dialog内 this.$emit('update:visible',false)-->
    <el-dialog title="弹框标题" width="500px" :visible="value" @close="$emit('update:value',false)">
      <h1>我是弹框</h1>
      <template #footer>
        <div>
          <el-button @click="$emit('update:value',false)">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
