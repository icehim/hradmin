<template>
  <el-dialog title="分配角色" width="500px" :visible="isShow" @close="cancelEvent">
    <!--
      el-checkbox-group v-model=“非数组(一定是一个Boolean值) 数组(选中某项相当于数组中添加该项的值)”
      label：选中该项后的值
        <el-checkbox label="">内容</el-checkbox>
    -->
    <el-checkbox-group v-model="value">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div style="text-align: center">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancelEvent">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysRole } from '@/api/setting'
import { sysUser } from '@/api/user'
import { sysUserAssignRoles } from '@/api/employees'
export default {
  name: 'Role',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      value: [],
      id: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    cancelEvent() {
      this.$emit('update:isShow', false)
      this.value = ''
    },
    async getData() {
      const res = await sysRole({
        page: 1,
        pagesize: 1000
      })
      this.list = res.data.rows
    },
    // 获取当前打开账号的详情信息
    async getUserInfo(id) {
      this.id = id
      const res = await sysUser(id)
      this.value = res.data.roleIds
    },
    // 提交点击
    async submit() {
      await sysUserAssignRoles(this.id, this.value)
      this.cancelEvent()
      this.$message.success('分配成功')
    }
  }
}
</script>

<style scoped>

</style>
