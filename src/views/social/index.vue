<template>
  <div>社保
    <el-button @click="btnClick">获取子组件实例对象</el-button>
    <el-card>
      <son ref="son" />

    </el-card>
  </div>
</template>

<script>
import son from '@/views/social/components/son'
export default {
  components: {
    son
  },
  data() {
    return {
      fatherNum: 321
    }
  },
  methods: {
    btnClick() {
      console.log(this.$refs.son, this.$children)
    }
  }
}
</script>

<style scoped>

</style>
