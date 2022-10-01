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
          <!--编辑
          1.点击编辑打开弹窗框组件(与新增组件公用)
          2.打开弹窗数据回显
            1.如果当前点击项数据包含完整的表单数据,直接赋值当前点击项数据给表单
            2.如果当前点击项数据不完整包含完整的表单数据(调用接口获取完整数据),直接赋值当前点击项数据给表单
          3.表单验证是否需要调整
          4.标题也要调整
          5.定义编辑api
          6.导入编辑api
          7.在表单验证成功后分场景调用
            调用成功
            a:关闭弹框
            b:重置表单数据(包括表单错误)
            c:提示
            d:刷新父级列表数据
          -->

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
          this.$bus.$emit('addEvent', true, this.item, 'add')
          break
        case 'look':
          this.$bus.$emit('addEvent', true, this.item, 'edit')

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
