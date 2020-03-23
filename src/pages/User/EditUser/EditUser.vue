<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <div>
      <el-row>
        <el-col>
           <el-form :model="edituserinfo"  label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名：">
                {{userDetail.nick_name}}
              </el-form-item>
              <el-form-item label="选择身份：">
                <el-radio v-model="userRole" label="普通用户">普通用户</el-radio>
                <el-radio v-model="userRole" label="版主">版主</el-radio>
                <el-radio v-model="userRole" label="管理员">管理员</el-radio>
              </el-form-item>
              <el-form-item  v-if="userRole==='版主'">
                <el-select size="small" v-model="edituserinfo.plate_id" placeholder="请选择版块">
                  <el-option v-for="item in noPlateList" :key="item.plateid" :label="item.plate_name" :value="item.plateid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="修改密码：">
                <el-switch v-model="editPassword" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </el-form-item>
             <el-col :span="7">
               <el-form-item v-if="editPassword">
                 <el-input size="small" placeholder="请输入密码" v-model="password1" show-password></el-input>
               </el-form-item>
               <el-form-item v-if="editPassword">
                 <el-input size="small" placeholder="请重新输入密码" v-model="password2" show-password></el-input>
               </el-form-item>
               <el-form-item>
                 <el-button size="small" type="primary" @click="submitForm()">确认修改</el-button>
                 <el-button size="small" @click="$router.go(-1)">返回</el-button>
               </el-form-item>
             </el-col>
           </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {addUser,reqUserDetail,reqNoPlateList,edituserinfo} from '../../../api/index'
  import {mapState} from 'vuex'
  import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
  export default {
    components:{
      Breadcrumb
    },
    data() {
      return {
        userid:"",
        userDetail:{},
        userRole: "",
        selectedUserid:'',
        editPassword:false,
        noPlateList:[],
        password1:'',
        password2:'',
        edituserinfo:{
          role_name:"",
          plate_id:"",
          password:"",
        }
      }
    },
    methods: {
      async init(){
        let result = await reqUserDetail(this.userid)
        this.userDetail = result
        let result2 = await reqNoPlateList(this.userid)
        this.noPlateList = result2
        if(this.userDetail.plate_name!=""){
          this.userRole = "版主"
          this.edituserinfo.plate_id = this.userDetail.plate_id
        }
      },
      async submitForm(){
        let data = {}
        data.plate_id = this.edituserinfo.plate_id
        data.role_name = this.edituserinfo.role_name
        if(data.role_name==='2'&&data.plate_id==''){
          this.$message.error('请选择要分配的版块');
          return
        }
        if(this.editPassword===true){
          if(this.password1!== this.password2){
            this.$message.error('两次输入的密码不一致，请重新输入');
            return
          }else{
            this.edituserinfo.password = this.password1
            data.password = this.password1
          }
          let result3 = await edituserinfo(this.userid,data)
          if(result3.status ===1){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          }
        }else{
          let result4 = await edituserinfo(this.userid,data)
          if(result4.status ===1){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }
        }
        console.log(data)
      }
    },
    mounted(){
      this.userid = this.$route.params.userid
      this.init()
    },
    computed:{
    },
    watch:{
      edituserinfo(val){
        console.log(this.edituserinfo)
      },
      userRole(val){
        //如果设置为普通用户，plate_id为NULL
        if(this.userRole === '普通用户'){
          this.edituserinfo.role_name = '普通用户'
          this.edituserinfo.plate_id = ''
        }else if(this.userRole === '管理员'){
          this.edituserinfo.role_name = '管理员'
          this.edituserinfo.plate_id = ''
        }
        else{
          this.edituserinfo.role_name = '版主'
        }
      }
    }
  }
</script>

<style>

</style>
