<template>
  <div id="app">
    <Header v-show="!$route.meta.NoShowHeader"></Header>
    <LeftMenu v-show="!$route.meta.NoShowLeftMenu"></LeftMenu>
    <router-view class="right_content"></router-view>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue'
  import LeftMenu from './components/LeftMenu/LeftMenu.vue'
  export default {
    name: 'App',
    components:{
      Header,
      LeftMenu
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #009A61;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .right_content{
    position: absolute;
    top:60px;
    left:150px;
    bottom: 0;
    right: 0;
    padding: 15px;
    padding-top: 0;
  }
</style>
