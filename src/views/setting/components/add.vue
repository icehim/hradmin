<template>
  <el-dialog :title="title" width="500px" :visible="show" @close="closeEvent">
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div>
        <el-button @click="closeEvent">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysRolePost, sysRolePut } from '@/api/setting'
export default {
  // model: {
  //   prop: 'show',
  //   event: 'input'
  // },
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      // isShow: false
      mode: 'add',
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'change' },
          { min: 1, max: 10, message: '请输入1~10位内的字符', trigger: 'change' }
        ],
        description: [
          { required: true, message: '必填', trigger: 'change' },
          { min: 1, max: 100, message: '请输入1~100位内的字符', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    title() {
      return { add: '新增角色', edit: '编辑角色' }[this.mode]
    }
  },
  methods: {
    closeEvent() {
      // this.isShow = false
      this.$emit('update:show', false)
      // 表单重置
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    // 确定按钮点击
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          if (this.mode === 'add') {
            await sysRolePost(this.form)
            this.$message.success('新增成功')
          } else if (this.mode === 'edit') {
            await sysRolePut(this.form)
            this.$message.success('编辑成功')
          }
          this.closeEvent()
          this.$emit('getData')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
