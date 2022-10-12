<template>
  <!--
      el-dropdowm @command="function(command){...}"
      默认插槽:显示的内容
      具名插槽  dropdown
      template #dropdown
        el-dropdown-menu
          el-dropdown-item command="zh"中文...
    -->
  <el-dropdown @command="commandEvent">
    <span style="color: #fff">
      <!--<h1>{{ appNum }}</h1>-->
      <svg-icon style="width: 20px;height: 20px;" icon-class="language" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="$i18n.locale ==='zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="$i18n.locale ==='en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import cookieJs from 'js-cookie'
export default {
  name: 'Lang',
  inject: ['appNum', 'reload'],
  methods: {
    commandEvent(command) {
      this.$i18n.locale = command
      cookieJs.set('lang', command)
      // 刷新页面
      // this.$router.go(0)
      // 无感刷新
      this.reload()
    }
  }
}
</script>

<style scoped>

</style>
