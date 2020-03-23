<template>
  <el-row :gutter="20" class="panel-top">
    <el-col :span="4">
      <div class="grid-content">
        <el-row :gutter="20">
          <el-col :span="6">
            <img src="../../assets/img/logo2.png" alt="" class="logo">
          </el-col>
          <el-col :span="16" :offset="2">
            <div class="grid-content bg-purple">
              <span class="header_title">管理系统</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="grid-content bg-purple">
        &nbsp;
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span v-if="loginUser.role_name==='版主'">{{loginUser.plate_name}}版主 &nbsp;&nbsp;{{loginUser.nick_name}}</span>
            <span v-if="loginUser.role_name==='管理员'">管理员 &nbsp;&nbsp;{{loginUser.nick_name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item>修改密码</el-dropdown-item>-->
            <el-dropdown-item  command="logout" @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {mapState} from 'vuex'
  import {reqLogout} from '../../api/index'
  import {getStore,removeStore} from '../../config/mUtils'
  export default {
    computed:{
      ...mapState(['loginUser'])
    },
    mounted(){
    },
    methods:{
      handleCommand(command) {
        if(command=='logout'){
            this.logout()
        }
      },
      async logout(){
        let result = await reqLogout()
        this.$confirm('确定要退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await reqLogout()
          if(result.status===1){
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            removeStore('bbs_user_id')
            this.$router.push('/login')
          }else{
            this.$message({
              type: 'danger',
              message: '退出失败'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      }
    }
  }
</script>

<style>
  .panel-top {
    position: fixed;
    width: 100%;
    z-index: 1000;
    height: 60px;
    line-height: 60px;
    background: #409EFF;
    color: #fff;
    margin: 0!important;
  }
  .logo{
    width: 40px;
    margin: 10px;
  }
  .header_title{

  }
  .el-dropdown-link {
    cursor: pointer;
    color: #f8f8f8;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
