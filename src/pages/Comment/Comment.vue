<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <div>
        <div class="operate_post" >
          <el-row :gutter="10" type="flex">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="deleteCSeleted()">删除所选</el-button>
              </div>
            </el-col>
            <el-col :span="8" :offset="3"  v-if="loginUser.role_name==='管理员'">
              <div class="grid-content">
                <div class="block">
                  <el-date-picker size="mini" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: -10px"  v-if="loginUser.role_name==='管理员'">
              <div class="grid-content">
                <el-input size="mini" placeholder="按评论内容搜索" v-model="commentContent" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="4"  v-if="loginUser.role_name==='管理员'">
              <div class="grid-content">
                <el-button type="primary" size="mini" @click="search()">搜索</el-button>
                <el-button type="primary" size="mini" @click=" setAll()" class="reset_btn">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-table :data="loginUser.role_name=='管理员'?showCommentList:plateUserCommonList" style="width: 100%" @selection-change="changeSelect">
          <el-table-column type="selection" ></el-table-column>
          <el-table-column fixed label="文章标题">
            <template slot-scope="scope">
              <el-link type="primary" @click="toArticleDetail(scope.row.topic_id)">{{scope.row.topic}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评论内容" width="300"></el-table-column>
          <el-table-column label="评论类型">
            <template slot-scope="scope">
              {{scope.row.comment_type==1?'评论文章':'回复评论'}}
            </template>
          </el-table-column>
          <el-table-column prop="nick_name" label="评论者"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <!--<el-button type="text" size="small">查看</el-button>-->
              <el-button type="text" size="small" @click="deleteOneComment(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :page-size="5" v-if="loginUser.role_name==='管理员'" class="comment_pagination" :current-page="pageNum" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="showCommentList.length"></el-pagination>
        <el-pagination :page-size="5" v-if="loginUser.role_name==='版主'" class="comment_pagination" :current-page="pageNum" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="plateUserCommonList.length"></el-pagination>
      </div>
    </div>
</template>

<script>
  import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
  import {mapState} from 'vuex'
  import {reqArticleDetail,deleteCommentOne,deleteCommentSeleted,searchComment} from '../../api/index'
  import {getStore} from '../../config/mUtils'
  export default {
    data(){
      return {
        user_id:'',
        searchDate:[],
        articleTitle:'',
        commentContent:'',
        commentSelection:[],
        showCommentList:[],
        pageNum:1,
      }
    },
    components:{
      Breadcrumb
    },
    computed:{
      ...mapState(['loginUser','commonList','plateUserCommonList'])
    },
    mounted(){
      this.user_id = getStore('bbs_user_id')
      if(this.user_id){
        this.$store.dispatch('getLoginUserInfo',this.user_id)
      }else{
        this.$router.push('/login')
      }
      this.setAll()
//      this.$store.dispatch('getCommentList')
      this.$store.dispatch('getPlateUserCommontList',{user_id:this.user_id,pageNum:this.pageNum})
    },
    watch:{
      commonList(val){
        this.showCommentList = this.commonList
      }
    },
    methods:{
      async handleCurrentChange(val) {
        this.pageNum = val
        if(this.loginUser.role_name==='管理员'){
          let result = await searchComment(this.startTime,this.endTime,this.commentContent,this.pageNum)
          this.showArticleList = result
        }else{
          this.$store.dispatch('getPlateUserCommontList',{user_id:this.user_id,pageNum:this.pageNum})
        }
      },
      async toArticleDetail(topic_id){
        let result = await reqArticleDetail(topic_id)
        this.$router.push(`/article/articleDetail/${topic_id}`)
      },
      deleteOneComment(comment_id){
        this.$confirm('确定要删除这个评论吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await deleteCommentOne(comment_id)
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
        console.log(comment_id)
      },
      deleteCSeleted(){
        if(this.commentSelection.length>0){
          this.$confirm('确定要删除评论吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let result = await deleteCommentSeleted(this.commentSelection)
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
          this.$alert('未选中任何评论，请选中评论后再进行操作！', '消息提示', {
            confirmButtonText: '确定',
          });
        }
      },
      //记录选中的版块id
      changeSelect(val){
        this.commentSelection = []
        val.forEach(item=>{
          this.commentSelection.push(item.id)
        })
        console.log(this.commentSelection)
      },
      async search(){
        this.pageNum = 1
        this.startTime = this.searchDate[0]
        this.endTime = this.searchDate[1]
        let result = await searchComment(this.startTime,this.endTime,this.commentContent,this.pageNum)
        this.showCommentList = result
      },
      async setAll(){
        this.pageNum = 1
        this.searchDate = []
        this.commentContent = ""
        this.startTime = ''
        this.endTime = ''
        let result = await searchComment(this.startTime,this.endTime,this.commentContent,this.pageNum)
        this.showCommentList = result
      }
    }
  }
</script>

<style>
.operate_post{
  padding-bottom: 10px;
}
.comment_pagination{
  padding: 10px 0;
  float: right;
}
</style>
