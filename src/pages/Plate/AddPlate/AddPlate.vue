<template>
    <div class="addPlate">
      <Breadcrumb></Breadcrumb>
      <el-row>
        <el-col :span="12">
          <el-form :model="plateDataForm"  ref="plateDataForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="版块名称" prop="plate_name">
              <el-input size="small" v-model="plateDataForm.plate_name"></el-input>
            </el-form-item>
            <el-form-item label="版块描述" prop="desciption">
              <el-input rows="5" size="small" type="textarea" v-model="plateDataForm.desciption"></el-input>
            </el-form-item>
            <el-form-item label="选择版主" prop="moderator">
              <el-select size="small" v-model="plateDataForm.moderator" placeholder="请选择版主">
                <el-option v-for="(user,userid,index) in toPlateUser"  :label="user.nick_name" :value="user.userid" :key="userid"></el-option>
                <!--<el-option v-for="(user,userid,index) in toPlateUser"  :label="user.nick_name" :value="user.userid" :key="userid"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm()">立即创建</el-button>
              <el-button size="small">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {addPlate} from '../../../api/index'
  import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
  import ElRow from "element-ui/packages/row/src/row";
    export default {
      components:{
        ElRow,
        Breadcrumb
      },
      data() {
        return {
          plateDataForm: {
            plate_name: '',
            desciption: '',
            moderator: null
          }
        }
      },
      methods: {
         async submitForm() {
           if(!this.plateDataForm.plate_name||!this.plateDataForm.desciption){
             this.$message.error({
               message: '版块名、版块描述不能为空',
               duration:2000
             })
             return
           }
           console.log(this.plateDataForm)
            let result = await addPlate(this.plateDataForm)
            if(result.status===1){
              this.$message({
                message: '添加成功',
                type: 'success',
                position: 'bottom-right',
                duration:2000
              })
              this.$router.go(-1)
            }else{
              this.$message.error({
                message: '添加失败',
                duration:2000
              })
            }
        }
      },
      mounted(){
        this.$store.dispatch('getToPlateUser')
      },
      computed:{
        ...mapState(['toPlateUser'])
      }
    }
</script>

<style scoped>


</style>
