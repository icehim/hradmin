<template>
  <div class="sona">
    我是sona

    <button @click="btnClick">触发atob</button>
  </div>
</template>

<script>
export default {
  name: 'Sona',
  methods: {
    btnClick() {
      this.$bus.$emit('atob', 123)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sona{
    width: 200px;
    height: 300px;
    border: 5px solid red;
  }
</style>
