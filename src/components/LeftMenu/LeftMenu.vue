<template>
  <el-aside class="leftMenu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu router :default-active="currentRoute" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#fff" text-color="#666" active-text-color="#666">
          <el-menu-item index="/homepage" >
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/plate">
            <i class="el-icon-folder"></i>
            <span slot="title" v-if="loginUser.role_name==='版主'">{{loginUser.plate_name}}版块</span>
            <span slot="title" v-else>版块</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-reading"></i>
            <span slot="title">文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">评论</span>
          </el-menu-item>
          <el-menu-item index="/user" v-if="loginUser.role_name==='管理员'">
            <i class="el-icon-user"></i>
            <span slot="title">用户</span>
          </el-menu-item>
          <!--<el-menu-item index="/system">-->
            <!--<i class="el-icon-document"></i>-->
            <!--<span slot="title">系统设置</span>-->
          <!--</el-menu-item>-->
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
      data(){
        return {
          currentRoute:"",
        }
      },
      mounted(){
        this.init()
      },
      computed:{
        ...mapState(['loginUser'])
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        init(){
          let routePath = this.$route.path
//          console.log(routePath)
          if(routePath.indexOf('plate')>=0){
            this.currentRoute = '/plate'
            return
          }else if(routePath.indexOf('article')>=0){
            this.currentRoute = '/article'
            return
          }else if(routePath.indexOf('user')>=0){
            this.currentRoute = '/user'
            return
          }else if(routePath.indexOf('system')>=0){
            this.currentRoute = '/system'
            return
          }else if(routePath.indexOf('comment')>=0){
            this.currentRoute = '/comment'
            return
          }else{
            this.currentRoute = '/homepage'
            return
          }
        }
      },
      watch:{
        $route(value){
          this.init()
        }
      }
    }
</script>

<style scoped>
.leftMenu{
  background: #F3F8FB;
  position: fixed;
  top: 60px;
  bottom: 0px;
  width: 150px!important;
}
.el-submenu .el-menu-item{
  min-width: 150px!important;
  padding-left: 50px!important;
}
.el-menu{
  border: 0;
}
.el-menu-item:hover,el-submenu__title:hover {
  background-color: #EDF2F5 !important;
}
.el-menu-item.is-active{
  color:  #409EFF!important;
}
  .el-menu-item{
    background-color: #F3F8FB!important;
  }
</style>
