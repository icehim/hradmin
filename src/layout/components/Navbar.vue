<template>
  <div class="navbar">
    <div class="navbar-icon" @click="toggleSideBar">
      <i v-if="sidebar.opened" class="el-icon-s-fold" />
      <i v-else class="el-icon-s-unfold" />
    </div>
    <div class="navbar-name">
      人力后台
    </div>
    <div class="navbar-user">
      <Fullscreen style="margin-right: 15px" />
      <Lang style="margin-right: 15px" />
      <el-dropdown @command="commandEvent">
        <span class="menu">
          <!--使用自定义指定解决图片出错问题，同时默认图片可以自定义指定-->
          <img v-global-image-error="defaultImg" :src="userInfo.staffPhoto" class="avatar" alt="">
          <span>{{ userInfo.username }}</span>
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Lang from '@/components/lib/lang'
import Fullscreen from '@/components/lib/fullscreen'
export default {
  components: { Lang, Fullscreen },

  // 局部自定义指令
  directives: {
    imgerror: {
      bind() {},
      inserted(dom, obj) {
        dom.src = dom.src || obj.value
        dom.onerror = () => {
          dom.src = obj.value
        }
      },
      update() {},
      componentUpdated(dom, obj) {
        dom.src = dom.src || obj.value
      },
      unbind(dom) {
        dom.onerror = null
      }
    }
  },

  data() {
    return {
      defaultImg: require('@/assets/common/head.jpg')
    }
  },
  computed: {
    ...mapState('app', ['sidebar']),
    ...mapState('user', ['userInfo'])
  },

  methods: {
    ...mapActions('app', ['toggleSideBar']),
    commandEvent(command) {
      switch (command) {
        case 'home':
          this.$router.push('/')
          break
        case 'exit':
          console.log('退出用户登录')
          /*
          * 1.弹出确定框
          *   this.$confirm('提示内容','提示标题',{
          *     cancelButtonText:'取消按钮文本',
          *     confirmButtonText:'确认按钮文本',
          *     type:'warning...'
          *   }).then((
          *       // 点击确定后执行的处理
          *     )=>{
          *     //点击取消后的处理
          * })
          * 2.点击确定后
          *   删除token
          *   删除用户信息
          *   提示
          *   跳转到登录页
          *  */
          this.$confirm('您确定退出嘛？', '温馨提示')
            .then(() => {
              // 点击确定后执行的处理
              // 删除token
              // 删除用户信息
              // 重置路由
              this.$store.commit('user/logout')
              this.$message.success('退出成功')

              // 退出登陆时，传入回跳地址
              this.$router.push('/login?redirect=' + this.$route.fullPath) // fullPath带参数的path地址
            })
            .catch(() => {
              // 点击取消后的处理
            })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar{
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #3e6ef8;
    color: #fff;
    .navbar-icon{
      padding: 0 15px;
      cursor: pointer;
    }
    .navbar-name {
      flex: 1;
    }
    .navbar-user {
      margin-right: 20px;
      display: flex;
      align-items: center;
      .menu {
        display: flex;
        align-items: center;
        color: #ffffff;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 15px;

      }
    }
  }
</style>
