<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="@/assets/common/login-logo.png">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" prefix-icon="el-icon-user-solid" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" show-password @keyup.enter.native="submit" />
          <!--.native能让组件使用vue原生方法-->
          <!--this.$emit('方法名')-->
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%; background:#407ffe" :loading="loading" @click="submit">{{ $t('login.login') }}</el-button>
          <!--<el-button style="width: 100%; background:#407ffe" @click="submit">登录</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        mobile: '13800000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { required: true, message: '必填项', trigger: 'change' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'change' },
          { validator: (rules, value, callback) => {
            // rules:当前规则
            // value:当前验证项的值
            // callback：验证成功，callback()  验证失败：callback（new Error(’错误)）
            const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            if (reg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          }, trigger: 'change' }
        ],
        password: [
          { required: true, message: '必填项', trigger: 'change' },
          { min: 6, max: 12, message: '请输入6~12位密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 全局触发表单验证
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          this.loading = true
          try {
            await this.$store.dispatch('user/toLogin', this.form)
            this.loading = false
            // 登录时如果有回跳地址，就跳入回跳地址，如果没有就跳入首页
            const redirect = this.$route.query.redirect || '/'
            this.$router.push(redirect)
          } catch {
            this.loading = false
          }
        } else {
          console.log('验证失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//@代表src 只能用于js与html，不能用于css，css用~@
//scoped:只管当前组件与子组件最外层
//v-html的东西，也管不到
//插槽内的内容可以管到
//scoped:看得到的都可以管到，看不到的都管不到
//希望它管到：  ::v-deep 希望管到的class{...}
  .login {
    width: 100%;
    height: 100%;
    background: url('~@/assets/common/login.jpg');
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
      text-align: center;
      width: 580px;
      .logo{
        margin-bottom: 20px;
      }
      .el-button{
        border: none;
        color: #ffffff;
      }
    }
    ::v-deep .el-input__inner {
      height: 50px;
    }
  }
</style>
