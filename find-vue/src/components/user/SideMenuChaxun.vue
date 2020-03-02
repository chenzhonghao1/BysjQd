<template>
  <el-menu :default-active="'/fabushiwu'" class="categories"  router active-text-color="red">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" >
      <i class="el-icon-menu"></i>
      <span slot="title">{{ item.navItem }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'SideMenu',
    data () {
      return {
        navList: [
          {name: '/fabushiwu', navItem: '查询失物信息'},
          {name: '/fabuzhaoling', navItem: '查询招领信息'}
        ]
      }
    }
  }
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 50%;
    width: 180px;
    position:relative;
    right:10px;
    top:60px;
    border:1px solid #C0C0C0;
  }
</style>

