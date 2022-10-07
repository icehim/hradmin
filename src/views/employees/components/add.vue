<template>
  <el-dialog title="新增员工" width="600px" :visible.sync="isShow">
    <el-form label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.username" prop="username" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.mobile" prop="mobile" />
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="form.timeOfEntry" type="date" prop="timeOfEntry" />
      </el-form-item>
      <el-form-item label="聘用形式">
        <!--
枚举数据渲染
  1.导入
  2.在data中复制定义
  3.渲染
-->
        <el-select v-model="form.formOfEmployment" prop="formOfEmployment">
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
      <el-form-item label="工号">
        <el-input v-model="form.workNumber" prop="workNumber" />
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="form.departmentName" prop="departmentName" />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="form.correctionTim" type="date" prop="correctionTim" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align: center">
        <el-button type="primary">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import employeesData from '@/api/constant/employees'
export default {
  data() {
    return {
      isShow: false,
      employeesData,
      form: {
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
