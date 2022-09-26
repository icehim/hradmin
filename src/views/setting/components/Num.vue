<template>
  <div>
    <button @click="$emit('update:sonNum',sonNum+1)">+</button>
    <input :value="sonNum" type="text">
    <button @click="$emit('update:sonNum',sonNum-1)">-</button>
  </div>
</template>
<script>
export default {
  props: {
    sonNum: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
