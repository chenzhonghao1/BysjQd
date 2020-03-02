<template>
  <el-container class="container" >
    <el-aside class="side" >
      <switch></switch>
      <SideMenu></SideMenu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>


<script>

  import SideMenu from './SideMenuChaxun'
  export default {
    name: 'Person',
    components: {SideMenu}
  }
</script>

<style scoped>
.container{
    height:660px;
}

.side{
    width:600px !important;
}




</style>

