<template>
  <div class="departments">
    <el-card class="card">
      <template #header>
        <div>组织结构</div>
      </template>
      <div class="other-content">
        <div class="top">
          <div class="name">人力公司</div>
          <div class="manager">负责人</div>
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
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: 'value'
    }
  }
}
</script>

<style lang="scss" scoped>
  .departments {
    padding: 15px;
    .card {
      padding: 15px;
      .other-content{
        padding: 0 30px;
      }
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
    }

  }
</style>
