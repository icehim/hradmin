<template>
  <div class="detail">
    <!--
      1.用户信息获取
        a:定义api
        b:导入api
        c:调用并存储数据
      2.回显用户名
      3.修改
        a:定义api
        b:表单验证成功后调用
        c:调用成功
          提示
    -->
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <el-form ref="form" label-width="100px" :model="form" :rules="rules">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">更新</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" lazy>
          <!--<Info :user-info="initUserInfo" @setUserName="setUserName" />-->
          <component :is="'Info'" :user-info="initUserInfo" @setUserName="setUserName" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" lazy>
          <!--
            1.组件创建
            2.异步组件结合动态组件使用
            3.调用接口获取数据并渲染
              a:定义api
              b:导入api
              c:调用存储
            4.修改
              a:定义修改api
              b:导入
              c:调用
              d:调用完成，提示
          -->

          <component :is="'Job'" /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// Object(...)这个错误都是来自于import，常见的{}没写,名字写错了
import { sysUser } from '@/api/user'
import { sysUserPut } from '@/api/employees'
export default {
  components: {
    //  异步组件加载
    //  异步组件与动态组件结合
    Info: () => import('./components/info'),
    Job: () => import('./components/job')
  },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        username: '',	// string	非必须
        password: ''	// string	非必须
      },
      userInfo: {},
      initUserInfo: {},
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'change' }
        ],	// string	非必须
        password: [
          { required: true, message: '必填', trigger: 'change' },
          { min: 6, max: 12, message: '请输入6~12位密码', trigger: 'change' }
        ]// string	非必须
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysUser(this.id)
      this.userInfo = res.data
      this.initUserInfo = JSON.parse(JSON.stringify(res.data))
      this.form.username = res.data.username
    },
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          //  修改用户信息接口，需求所有用户信息都要传入
          // 合并对象 {...对象a,...对象b}返回新对象=Object.assign(目标对象，需要合并的对象,...)后面覆盖前面
          await sysUserPut({ ...this.userInfo, ...this.form })
          // 用户名修改后要同步到初始化数据，两边保持同步
          this.initUserInfo.username = this.form.username
          this.$message.success('修改成功')
        }
      })
    },
    setUserName(str) {
      this.form.username = str
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail{
    padding: 20px;
  }
</style>
