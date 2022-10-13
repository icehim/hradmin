<template>
  <div id="app">
    <!--路由出口-->
    <router-view v-if="bol" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      bol: true
    }
  },
  provide() {
    return {
      appNum: 1,
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
    }
  }
}
</script>
