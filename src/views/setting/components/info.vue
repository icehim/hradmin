<template>
  <el-form label-width="100px">
    <el-form-item label="企业名称">
      <el-input v-model="info.name" disabled />
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input v-model="info.companyAddress" disabled />
    </el-form-item>
    <el-form-item label="公司电话">
      <el-input v-model="info.companyPhone" disabled />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="info.mailbox" disabled />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="info.remarks" disabled />
    </el-form-item>
  </el-form>
</template>

<script>
import { company } from '@/api/setting'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      info: []
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  async created() {
    const res = await company(this.userInfo.companyId)
    this.info = res.data
  }
}
</script>

<style lang="scss" scoped>

</style>
