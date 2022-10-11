<template>
  <el-dialog title="分配权限" width="500px" :visible.sync="isShow" @close="cancelEvent">
    <!--
      选项勾选功能
      el-tree
        show-checkbox:显示复选框
        node-key:设置每条数据选中后对应的字段名
        default-checked-keys:默认选中那些项,他得值可以累加(少用)
        check-strictly:是父子关联，默认是false true:不关联
        setCheckedKeys:用法:this.$refs.el-tree的ref的值.setCheckedKeys([需要勾选项的值])
        getCheckedKeys:作用:获取以勾选的值 this.$refs.el-tree的ref的值.getCheckedKeys()他会返回已经勾选的值
    -->
    <el-tree ref="tree" :data="treeData" :props="{label:'name'}" show-checkbox node-key="id" :default-checked-keys="defaultKeys" check-strictly />
    <template #footer>
      <div style="text-align: center">
        <el-button @click="cancelEvent">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysPermission } from '@/api/permission'
import { changeData } from '@/utils'
import { sysRoleId, sysRoleAssignPrem } from '@/api/setting'
export default {
  name: 'PermissionSet',
  data() {
    return {
      isShow: false,
      treeData: [],
      defaultKeys: [],
      id: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysPermission()
      this.treeData = changeData(res.data, '0')
    },
    cancelEvent() {
      this.isShow = false
      this.$refs.tree.setCheckedKeys([])
    },
    // 获取角色详情
    async getRoleInfo(id) {
      this.id = id
      const res = await sysRoleId(id)
      // this.defaultKeys = res.data.permIds
      this.$refs.tree.setCheckedKeys(res.data.permIds)
    },
    //  修改权限点
    async submit() {
      await sysRoleAssignPrem(this.id, this.$refs.tree.getCheckedKeys())
      this.$message.success('修改权限成功')
      this.cancelEvent()
    }
  }
}
</script>

<style scoped>

</style>
