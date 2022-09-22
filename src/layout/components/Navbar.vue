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
      <el-dropdown @commond="commandEvent">
        <span class="menu">
          <img class="avatar" src="@/assets/common/head.jpg" alt="">
          <span>管理员</span>
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
    ...mapState('app', ['sidebar'])
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
