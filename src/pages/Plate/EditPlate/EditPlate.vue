<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <el-row>
        <el-col :span="12">
          <el-form :model="plateDetail"  label-width="100px" class="demo-ruleForm">
            <el-form-item label="版块名称" prop="plate_name">
              <el-input size="small" v-model="plateDetail.plate_name"></el-input>
            </el-form-item>
            <el-form-item label="版块描述" prop="desciption">
              <el-input rows="5" size="small" type="textarea" v-model="plateDetail.description"></el-input>
            </el-form-item>
            <el-form-item label="选择版主" prop="moderator" v-if="loginUser.role_name=='管理员'">
              <el-select size="small"  v-model="plateDetail.moderator_name" placeholder="请选择版主">
                <el-option v-for="(user,id,index) in userList" v-if="user.postNum>=50" :label="user.nick_name" :value="user.id" :key="id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm()">确认修改</el-button>
              <el-button size="small" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {reqPlateDetail,editPlateDetail} from '../../../api/index'
  import {mapState} from 'vuex'
  import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
  export default {
    data(){
      return {
        plateid:Number,
        plateDetail:{},
      }
    },
    components:{
      Breadcrumb
    },
    mounted(){
      this.plateid = this.$route.params.plateid
      this.init()
      console.log(this.plateDetail)
      this.$store.dispatch('getUserList')
    },
    computed:{
      ...mapState(['userList','loginUser'])
    },
    methods:{
      async init(){
        let result = await reqPlateDetail(this.plateid)
        if(result){
          this.plateDetail = result
        }else{
          this.$message.error('请求错误！');
          this.$router.go(-1)
        }
      },
      async submitForm(){
        let result = await editPlateDetail(this.plateid,this.plateDetail)
        console.log(this.plateDetail)
        if(result.status===1){
          this.$message({
            message: '修改成功',
            type: 'success',
            position: 'bottom-right',
            duration:2000
          })
        }else{
          this.$message.error({
            message: '修改失败',
            duration:2000
          })
        }
      }
    }
  }
</script>

<style>

</style>
