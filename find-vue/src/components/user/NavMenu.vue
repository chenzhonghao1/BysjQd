<template>
    <el-menu
      :default-active="'/userindex'"
      router
      mode="horizontal"
      background-color="white"
      text-color="#888888"
      active-text-color="red"
      style="min-width: 1300px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      
      
      <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;margin-right:50px;margin-top:10px"></i>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 15px;font-weight: bold">失物招领系统</span>
      
    </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/userindex', navItem: '首页'},
          {name: '/fabu', navItem: '发布信息'},
          {name: '/chaxun', navItem: '查询信息'},
          {name: '/person', navItem: '个人中心'}
        ]
      }
    },
    methods:{
      logout () {
        var _this = this
        // 前后端状态保持一致
        _this.$store.commit('logout')
        _this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

    .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }

</style>

