<template>
  <div class="dashboard-container">
    <el-calendar v-model="value" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      value: new Date()
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
