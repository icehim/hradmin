<template>
  <div class="top" style="width: 100%;">
    <div class="name">{{ item.name }}</div>
    <div class="manager">{{ item.manager }}</div>
    <el-dropdown @command="commandEvent">
      <div class="other">
        <span>操作</span>
        <i class="el-icon-arrow-down el-icon--right" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="add">添加子部门</el-dropdown-item>
          <el-dropdown-item v-if="!istop" command="look">查看部门</el-dropdown-item>
          <el-dropdown-item v-if="!istop" command="del">删除部门</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    istop: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    commandEvent(command) {
      switch (command) {
        case 'add':
          // 事件触发
          this.$bus.$emit('addEvent', true, this.item)
          break
        case 'look':
          break
        case 'del':
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .top{
    display: flex;
    justify-content: center;
    .name{
      flex: 1;
    }
    .manager{
      width: 80px;
      margin-right: 20px;
    }
  }
</style>
