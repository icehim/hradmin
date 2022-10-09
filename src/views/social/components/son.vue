<template>
  <div class="son">我是son
    <h1>{{ sonNum }}</h1>
    <el-button @click="btnClick">子获取父组件实例对象</el-button></div>
</template>

<script>
export default {
  data() {
    return {
      sonNum: 123
    }
  },
  methods: {
    btnClick() {
      // console.log(this.$parent)
      this.sonNum++
    }
  }
}
</script>

<style lang="scss" scoped>
  .son{
    width: 300px;
    height: 300px;
    background-color: #8a97f8;
  }
</style>
