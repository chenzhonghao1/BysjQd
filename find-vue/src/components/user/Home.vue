<template>
  <div class="home">
    <nav-menu></nav-menu>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from './NavMenu'
  export default {
    name: 'UserHome',
    components: {NavMenu}
  }
</script>

<style scoped>
.home {
    background-color:#E0E0E0;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

</style>
