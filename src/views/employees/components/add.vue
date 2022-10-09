<template>
  <el-dialog title="新增员工" width="600px" :visible.sync="isShow" @close="closeEvent">
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="form.timeOfEntry" type="date" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <!--
          枚举数据渲染
            1.导入
            2.在data中复制定义
            3.渲染
        -->
        <el-select v-model="form.formOfEmployment">
          <!--key：用于底层vue虚拟dom进行对比渲染时的标识
          ul:
            li  a key="1"
            li  b
          ul:
            li  c
            li  a key="1"
            li  b
          -->
          <el-option v-for="item in employeesData.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="form.workNumber" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <div v-outClick="treeCloseEvent">
          <el-input v-model="form.departmentName" readonly @focus="focusEvent" />
          <!--
          el-tree
            data="树形数据"
            prop="{
              label:'label',
              children:'children'
            }"
            插槽:自定义树形组件的每一项
            v-slot="{node,data}"
            node:elementui提供的一些内部使用数据
            data:当前项的数据

            1:点击部门输入框调用接口获取组织架构数据并渲染
              a:绑定输入框的聚焦
              b:导入组织架构api
              c:点击聚焦事件中调用api存储数据并渲染(显示树形控制)
            2.殿中组织架构中每一项都要实现
              a:关闭组织架构
              b:输入框赋值组织架构的名称
          -->

          <!--
          自定义指令，用于解决当点击在相应的dom外时，执行一个方法
          1.创建自定义指令
              inserted中绑定document点击事件
                点击事件需要执行一个传入的方法（点击在指定所在dom外时执行）
              unbind中销毁相应的点击事件
          -->

          <!--
            新增：
              1.表单验证
              2.调用新增api
                a:定义新增api
                b:导入
                c:在表单验证通过后调用
                d:调用成功
                  a:关闭弹框
                  b:关闭时要重置数据，并移除错误验证信息
                  c:提示一下
                  d:刷新父级列表数据
          -->
          <el-tree v-if="treeShow" :data="treeData" :props="{label:'name'}" @node-click="nodeClick" />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTim">
        <el-date-picker v-model="form.correctionTim" type="date" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align: center">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="isShow=false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import employeesData from '@/api/constant/employees'
import { companyDepartment } from '@/api/departments'
import { validatePhone } from '@/utils/validate'
import { sysUserPost } from '@/api/employees'
export default {
  data() {
    return {
      isShow: false,
      treeShow: false, // 默认树形组件展示
      employeesData,
      treeData: [],
      form: {
        username: '',	// string	非必须		姓名
        mobile: '',	// string	非必须		手机号
        timeOfEntry: '',	// string	非必须		入职时间
        formOfEmployment: '',	// number	非必须		聘用形式
        workNumber: '',	// string	非必须		工号
        departmentName: '',	// string	非必须		组织名称
        correctionTim: ''	// string	非必须		转正时间
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'change' }
        ],	// string	非必须		姓名
        mobile: [
          { required: true, message: '必填', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              validatePhone(value) ? callback() : callback(new Error('请正确输入手机号'))
            }
          }
        ],	// string	非必须		手机号
        timeOfEntry: [{ required: true, message: '必填', trigger: 'change' }],	// string	非必须		入职时间
        formOfEmployment: [{ required: true, message: '必填', trigger: 'change' }],	// number	非必须		聘用形式
        workNumber: [{ required: true, message: '必填', trigger: 'change' }],	// string	非必须		工号
        departmentName: [{ required: true, message: '必填', trigger: 'change' }],	// string	非必须		组织名称
        correctionTim: [{ required: true, message: '必填', trigger: 'change' }]	// string	非必须		转正时间
      }
    }
  },
  methods: {
    async focusEvent() {
      this.treeShow = true
      if (this.treeData.length === 0) {
        const res = await companyDepartment()
        this.treeData = this.changeData(res.data.depts, '')
      }
    },
    changeData(arr, pid = '') {
      return arr.filter(item => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    nodeClick(data) {
      this.treeShow = false
      this.form.departmentName = data.name
    },
    treeCloseEvent() {
      this.treeShow = false
    },
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          await sysUserPost(this.form)
          this.isShow = false
          this.$message.success('添加成功')
          // this.$parent.getData()
          this.$emit('getData')
        }
      })
    },
    closeEvent() {
      this.$refs.form.resetFields()
      this.form = {
        username: '',	// string	非必须		姓名
        mobile: '',	// string	非必须		手机号
        timeOfEntry: '',	// string	非必须		入职时间
        formOfEmployment: '',	// number	非必须		聘用形式
        workNumber: '',	// string	非必须		工号
        departmentName: '',	// string	非必须		组织名称
        correctionTim: ''	// string	非必须		转正时间
      }
    }
  }
}
</script>

<style scoped>

</style>
