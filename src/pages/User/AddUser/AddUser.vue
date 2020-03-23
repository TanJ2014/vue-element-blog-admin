<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <div>
          <el-form  ref="addUserForm" :model="addUserForm" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item  size="small" label="用户昵称" prop="nick_name">
                  <el-input maxlength="10" v-model="addUserForm.nick_name"></el-input>
                </el-form-item>
                <el-form-item size="small" label="密码"  prop="password">
                  <el-input maxlength="30" v-model="addUserForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item size="small" label="邮箱">
                  <el-input type="email" v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item size="small" label="积分">
                  <el-input type="email" v-model="addUserForm.integral"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item size="small" label="头像">
                  <el-input type="email" v-model="addUserForm.photo"></el-input>
                </el-form-item>
                <el-form-item size="small" label="个性签名">
                <el-input rows="6" type="textarea" v-model="addUserForm.signature"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">添加用户</el-button>
            <el-button size="small" @click="resetForm()">重置</el-button>
          </el-form-item>
          </el-form>
      </div>
    </div>
</template>

<script>
  import {addUser} from '../../../api/index'
  import {mapState} from 'vuex'
  import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
    export default {
      components:{
        Breadcrumb
      },
      data() {
        return {
          addUserForm: {
            nick_name: '',
            password: '',
            email: '',
            photo: '',
            signature: '',
            integral: 0,
          }
        }
      },
      methods: {
        async submitForm() {
          if(!this.addUserForm.nick_name||!this.addUserForm.password) {
            this.$message.error({
              message: '用户名、密码不能为空',
              duration: 2000
            })
            return
          }
          for(let i=0;i<this.userList.length;i++){
            if(this.addUserForm.nick_name==this.userList[i].nick_name){
              this.$message.error({
                message: '用户名已被占用',
                duration: 2000
              })
              return
            }
          }
          console.log(this.addUserForm)
          let result = await addUser(this.addUserForm)
          if(result.status===1){
            this.$message({
              message: '用户添加成功',
              type: 'success',
              position: 'bottom-right',
              duration:2000
            })
            this.$router.go(-1)
          }else{
            this.$message.error({
              message: '用户添加失败',
              duration:2000
            })
          }
        },
        resetForm() {
          this.$refs.addUserForm.resetFields();
        }
      },
      mounted(){
        this.$store.dispatch('getUserList')
      },
      computed:{
        ...mapState(['userList'])
      }
    }
</script>

<style>

</style>
