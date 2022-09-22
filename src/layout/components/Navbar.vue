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
      <el-dropdown @command="commandEvent">
        <span class="menu">
          <img class="avatar" :src="userInfo.staffPhoto" alt="">
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
export default {
  data() {
    return {
      key: 'value'
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
              this.$store.commit('user/logout')
              this.$message.success('退出成功')
              this.$router.push('/login')
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
