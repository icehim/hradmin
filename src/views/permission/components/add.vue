<template>

  <el-dialog :title="{add:'新增权限点',edit:'编辑权限点'}[mode]" width="600px" :visible="isShow" @close="cancelEvent">
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="企业可见" prop="enVisible">
        <!--
          el-switch
            v-model:默认是Boolean值
            active-value:打开时的值
            inactive-value:关闭时的值
            active-text：打开时的文本
            inactive-text:关闭时的文本
        -->
        <el-switch
          v-model="form.enVisible"
          active-text="可见"
          inactive-text="不可见"
          active-value="0"
          inactive-value="1"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align: center">
        <el-button @click="cancelEvent">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysPermissionPost, sysPermissionPut } from '@/api/permission'

export default {
  name: 'Add',
  model: {
    prop: 'isShow'
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mode: 'add',
      form: {
        name: '',	// string	非必须
        code: '',	// string	非必须
        description: '',	// string	非必须
        enVisible: '0',	// string	非必须   “0”时可见与“1”不可见
        type: '',	// number	非必须 页面：1  按钮:2
        pid: ''	// string	非必须 点击项的id
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'change' }],	// string	非必须
        code: [{ required: true, message: '必填', trigger: 'change' }],	// string	非必须
        description: [{ required: true, message: '必填', trigger: 'change' }],	// string	非必须
        enVisible: [{ required: true, message: '必填', trigger: 'change' }]	// string	非必须
      }
    }
  },
  methods: {
    cancelEvent() {
      this.$emit('input', false)
      this.$refs.form.resetFields()
      this.form = {
        name: '',	// string	非必须
        code: '',	// string	非必须
        description: '',	// string	非必须
        enVisible: '0',	// string	非必须   “0”时可见与“1”不可见
        type: '',	// number	非必须 页面：1  按钮:2
        pid: ''	// string	非必须 点击项的id
      }
    },
    submit() {
      this.$refs.form.validate(async result => {
        if (result) {
          if (this.mode === 'add') {
            await sysPermissionPost(this.form)
            this.$message.success('新增成功')
          } else if (this.mode === 'edit') {
            await sysPermissionPut(this.form)
            this.$message.success('编辑成功')
          }
          this.cancelEvent()
          this.$emit('getData')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
