<template>
    <div>
      <div v-show="this.$route.path == '/plate'">
        <Breadcrumb></Breadcrumb>
        <div class="operate_post" v-if="loginUser.role_name==='管理员'">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button  size="mini" type="primary" plain icon="el-icon-plus" @click="goto('/plate/addplate')">新增版块</el-button>
                <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="deleteSeleted()">删除所选</el-button>
              </div>
            </el-col>
            <el-col :span="15"  :offset="3">
              <div class="grid-content bg-purple">
                <el-row type="flex" justify="end" :gutter="10">
                  <el-col :span="13">
                    <div class="grid-content">
                      <div class="block">
                        <el-date-picker size="mini" v-model="searchDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="5" style="margin-left: -17px">
                    <div class="grid-content">
                      <el-input size="mini" v-model="plateName" placeholder="请输入版块名称" clearable></el-input>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content">
                      <el-button type="primary" size="mini" @click="search()">搜索</el-button>
                      <el-button type="primary" size="mini" class="reset_btn" @click="setAll()">重置</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-table fit :data="loginUser.role_name=='管理员'?showPlateList:plateUserPlateList" style="width: 100%" ref="plate"  @selection-change="changeSelect">
          <el-table-column v-if="loginUser.role_name=='管理员'" type="selection"></el-table-column>
          <el-table-column fixed prop="plate_name" label="版块名称"></el-table-column>
          <el-table-column prop="description" label="版块描述" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="postNum" sortable label="帖子数"></el-table-column>
          <el-table-column prop="moderator_name" label="版主" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="update_time" sortable label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button @click="editDetail(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteOne(scope.row.id)" type="text" size="small" v-if="loginUser.role_name=='管理员'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :page-size="5" v-if="loginUser.role_name=='管理员'" class="article_pagination" :current-page="pageNum"  @current-change="handleCurrentChange" background layout="prev, pager, next" :total="showPlateList.length"></el-pagination>
    </div>
      <router-view class="plateSubrouter"></router-view>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
  import {deletePlateSelected,deletePlateOne,searchPlate} from '../../api/index'
  import {getStore} from '../../config/mUtils'
    export default {
      components:{
        Breadcrumb
      },
      data() {
        return {
          user_id:'',
          searchDate:'',
          startTime:'',
          endTime:'',
          plateName:'',
          plateSelection:[],//批量删除中选中的id
          showPlateList:[],//要展示的列表
          pageNum:1,
        }
      },
      computed:{
        ...mapState(['loginUser','plateList','plateUserPlateList']),
      },
      mounted(){
        this.init()
        this.setAll()
          this.$store.dispatch('getPlateUserPlateList',{user_id:this.user_id})
//          this.$store.dispatch('getPlateList',{pageNum:this.pageNum})
      },
      watch:{
        plateList(val){
          this.showPlateList = this.plateList
        }
      },
      methods:{
        init(){
          this.user_id = getStore('bbs_user_id')
          if(this.user_id){
            this.$store.dispatch('getLoginUserInfo',this.user_id)
          }else{
            this.$router.push('/login')
          }
        },
        async handleCurrentChange(val) {
          this.pageNum = val
//          this.$store.dispatch('getPlateList',{pageNum:val})
//          console.log(`当前页: ${val}`);
          let result = await searchPlate(this.startTime,this.endTime,this.plateName, this.pageNum )
          console.log(result)
          this.showPlateList = result
        },
        goto(str){
          this.$router.push(str)
         },
        showDetail(plateid){
          this.$router.push(`/plate/plateDetail/${plateid}`)
        },
        editDetail(plateid){
          this.$router.push(`/plate/editPlate/${plateid}`)
        },
        deleteOne(plateid){
          this.$confirm('确定要删除此版块吗?若删除该版块内的贴子将被全部删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let result = await deletePlateOne(plateid)
            if(result.status===1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message({
                type: 'danger',
                message: '删除失败'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        deleteSeleted(){
         if(this.plateSelection.length>0){
           this.$confirm('确定要删除这些版块吗?若删除该版块内的贴子将被全部删除', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(async () => {
             let result = await deletePlateSelected(this.plateSelection)
             if(result.status===1){
               this.$message({
                 type: 'success',
                 message: '删除成功!'
               });
             }else{
               this.$message({
                 type: 'danger',
                 message: '删除失败'
               });
             }
           }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
         }else{
           this.$alert('未选中任何版块，请选中版块再进行操作', '消息提示', {
             confirmButtonText: '确定',
           });
         }
        },
        //记录选中的版块id
        changeSelect(val){
          this.plateSelection = []
          val.forEach(item=>{
            this.plateSelection.push(item.id)
          })
          console.log(this.plateSelection)
        },
        async search(){
          this.pageNum =1
          this.startTime = this.searchDate[0]
          this.endTime = this.searchDate[1]
          let result = await searchPlate(this.startTime,this.endTime,this.plateName, this.pageNum )
          this.showPlateList = result
        },
       async setAll(){
          this.pageNum = 1
          this.searchDate = []
          this.plateName = ""
          this.startTime=''
          this.endTime=''
          let result = await searchPlate(this.startTime,this.endTime,this.plateName, this.pageNum )
          this.showPlateList = result
        }
      }
    }
</script>

<style scoped>
.operate_post{
  padding-bottom: 10px;
}
.article_pagination{
  padding: 10px 0;
  float: right;
}
  .reset_btn{
    margin-left: 0;
  }
  .plateSubrouter{
    position: absolute;
    top:0px;
    left:0px;
    bottom: 0;
    right: 0;
    padding: 15px;
    padding-top: 0;
    z-index: 101;
    min-height: 1500px;
    background-color: white;

  }
</style>
