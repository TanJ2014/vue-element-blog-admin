<template>
    <div class="login">
      <div class="loginHeader">
        <!--<h2>团队知识共享系统后台管理</h2>-->
        <img class="logoImg" src="../../assets/img/logo.png" alt="">
        <h2>博客后台管理系统</h2>
      </div>
      <el-form class="loginForm">
        <el-form-item >
          <el-input v-model="nick_name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="loginTxt clearfix">
        <a class="fl"><i class="el-icon-back"></i> 博客系统</a>
        <a class="fr">忘记密码？</a>
      </div>
    </div>
</template>

<script>
  import {getStore} from '../../config/mUtils'
  import {mapState} from 'vuex'
  import qs from 'qs'
    export default {
      data() {
        return {
          nick_name:'',
          password:'',
        }
      },
      computed:{
        ...mapState(['userId','isLogin'])
      },
      mounted(){
        let userid = getStore('bbs_user_id')
        if(userid!=""&&userid!="undefined"&&userid!=null){
          this.$message({
            message: '您最近登录过，为您自动登录',
            duration:2000,
            type: 'success'
          })
          this.$store.dispatch('getLoginUserInfo',userid)
          this.$router.push('/homepage')
        }
      },
      methods:{
         submitForm(){
           if(!this.nick_name||!this.password){
             this.$message({
               message: '用户名或密码不能为空',
               duration:2000,
               type: 'warning'
             })
           }else{
             var data = qs.stringify({
               nick_name: this.nick_name,
               password: this.password
             })

             this.$store.dispatch('getLoginUserId',{nick_name:this.nick_name,password:this.password,callback:()=>{
               if(this.userId&&this.isLogin) {
                 this.$message({
                   message: '登录成功,欢迎您！',
                   type: 'success',
                   duration: 2000
                 })
                 this.$router.push('/homepage')
               }else{
                 this.$message.error({
                   message: '登陆失败',
                   duration:2000
                 })
               }
             }})

           }
        }
      }
    }
</script>

<style scoped>
.login{
  width: 300px;
  position: absolute;
  left: 50%!important;
  top: 50%;
  margin-left: -185px;
  margin-top: -200px;
}
.loginHeader{
  color: #000;
  height: 90px;
}
.loginHeader h2{
  line-height: 30px;
  font-size: 21px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 30px;
}
.loginBtn{
  width: 100%;
}
.el-form-item__content{
  margin-left: 0!important;
}
.logoImg{
  display: block;
  width: 70px;
  height: 70px;
  margin: auto;
}
.loginForm{
  margin-top: 30px;
}
.loginTxt a{
  color: #888;
  font-size: 12px;
}
.fl{
  display: inline-block;
  float: left;
}
.fr{
  display: inline-block;
  float: right;
}
  .clearfix{
    clear: both;
  }
</style>
