<template>
  <div>
    <hr>
    <h2>abc组件:</h2>
    <h3>{{ num }}</h3>
    <button @click="num++">修改num的值</button>
    <h3>{{ obj }}</h3>
    <button @click="btnClick">修改bj的值</button>
  </div>
</template>

<script>
export default {
  name: 'Abc',
  props: {
    num: {
      type: Number,
      default: 0,
      required: true,
      validator(value) {
        return value < 10
      }
    },
    obj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    btnClick() {
      // this.obj.a++
      // console.log(this.obj)
      this.obj = { a: 2 }
    }
  }
}
</script>

<style scoped>

</style>
