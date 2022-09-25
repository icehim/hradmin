<template>
  <div class="top" style="width: 100%;">
    <div class="name">{{ item.name }}</div>
    <div class="manager">{{ item.manager }}</div>
    <el-dropdown>
      <div class="other">
        <span>操作</span>
        <i class="el-icon-arrow-down el-icon--right" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>添加子部门</el-dropdown-item>
          <el-dropdown-item>查看部门</el-dropdown-item>
          <el-dropdown-item>删除部门</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
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
