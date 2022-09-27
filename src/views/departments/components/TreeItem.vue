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
          <!--新增：
          1.定义新增api
          2.导入
          3.在表单验证成功后调用
            调用成功
              关闭弹框（清空表单数据，清除验证）
              提示一下
              刷新父级列表数据
          -->
          <el-dropdown-item command="add">添加子部门</el-dropdown-item>
          <el-dropdown-item v-if="!istop" command="look">查看部门</el-dropdown-item>
          <!--删除
          1.点击删除时，弹出确定框
          2.定义删除api
          3.导入
          4.点击确定后调用
            调用成功:
              a:提示
              b:刷新父级列表数据
          -->
          <el-dropdown-item v-if="!istop" command="del">删除部门</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { companyDepartmentDelete } from '@/api/departments'
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
          this.$confirm(`您确定删除[${this.item.name}]部门嘛?`, '提示')
            .then(async() => {
              await companyDepartmentDelete(this.item.id)
              this.$emit('getData')
              this.$message.success('删除成功')
            })
            .catch(() => {})
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
