<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <div>
        <div>
          <el-row :gutter="10" type="flex" >
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="deleteArticleSeleted()">删除所选</el-button>
              </div>
            </el-col>
            <el-col :span="4"  v-if="loginUser.role_name==='管理员'">
              <div class="grid-content">
                <el-select size="mini" v-model="selectPlate" clearable placeholder="请选择版块" @change="selectPla">
                  <el-option v-for="item in plateNames" :key="item.id" :label="item.plate_name" :value="item.id"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="9"  v-if="loginUser.role_name==='管理员'">
              <div class="grid-content">
                <div class="block">
                  <el-date-picker size="mini" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: -10px"  v-if="loginUser.role_name==='管理员'">
              <div class="grid-content">
                <el-input size="mini" placeholder="按文章标题搜索" v-model="articleTitle" clearable></el-input>
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
        <div class="acticleList">
          <el-table :data="loginUser.role_name=='管理员'?showArticleList:plateUserArticleList"  fit  style="width: 100%" @selection-change="changeSelect">
            <el-table-column type="selection" ></el-table-column>
            <el-table-column fixed prop="title" :show-overflow-tooltip="true" label="文章标题">
            </el-table-column>
            <el-table-column prop="nick_name" label="作者" >
            </el-table-column>
            <el-table-column prop="plate_name" label="所属版块">
            </el-table-column>
            <el-table-column prop="comment_num" sortable label="评论数">
            </el-table-column>
            <el-table-column prop="click_num" sortable label="浏览次数">
            </el-table-column>
            <!--<el-table-column prop="is_top" label="版内置顶">-->
              <!--<template slot-scope="scope">-->
                <!--<span v-if="scope.row.is_top===0">否</span>-->
                <!--<span v-if="scope.row.is_top===1">是</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="update_time" sortable  label="发布时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看</el-button>
                <el-button @click="deleteArticleOne(scope.row.id)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :page-size="5" v-if="loginUser.role_name==='管理员'" :current-page="pageNum" @current-change="handleCurrentChange" class="article_pagination" background layout="prev, pager, next" :total="showArticleList.length"></el-pagination>
          <el-pagination :page-size="5" v-if="loginUser.role_name==='版主'" :current-page="pageNum" @current-change="handleCurrentChange" class="article_pagination" background layout="prev, pager, next" :total="plateUserArticleList.length"></el-pagination>
        </div>
      </div>
      <router-view class="articleSubrouter"></router-view>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
  import {reqPlateDetail,deleteArticleSeleted,deleteArticleOne,searchArticle} from '../../api/index'
  import {getStore} from '../../config/mUtils'
  export default {
    data() {
      return {
        user_id:'',
        plateid:'',
        searchDate: [], //选择搜索日期
        articleTitle: '', //输入的文章内容
        selectPlate:'', //选择版块
        articleSelection:[],
        startTime:'',
        endTime:'',
        showArticleList:[],
        pageNum:1,
    }
  },
    components:{
      Breadcrumb
    },
    computed:{
      ...mapState(['loginUser','articleList','plateUserArticleList','plateNames'])
    },
    mounted(){
      this.setAll()
      this.user_id = getStore('bbs_user_id')
      if(this.user_id){
        this.$store.dispatch('getLoginUserInfo',this.user_id)
      }else{
        this.$router.push('/login')
      }
//      this.$store.dispatch('getArticleList')
      this.$store.dispatch('getAllPlateName')
      this.$store.dispatch('getPlateUserArticleList',{user_id:this.user_id,pageNum:this.pageNum})
    },
    watch:{

    },
    methods:{
      async handleCurrentChange(val) {
        this.pageNum = val
        if(this.loginUser.role_name==='管理员'){
          let result = await searchArticle(this.plateid,this.startTime,this.endTime,this.articleTitle,this.pageNum)
          this.showArticleList = result
        }else{
          this.$store.dispatch('getPlateUserArticleList',{user_id:this.user_id,pageNum:this.pageNum})
        }
      },
      showDetail(articleid){
          this.$router.push(`/article/articleDetail/${articleid}`)
      },
      //记录选中的版块id
      changeSelect(val){
        this.articleSelection = []
        val.forEach(item=>{
          this.articleSelection.push(item.id)
        })
      },
      async deleteArticleOne(articleid){
        this.$confirm('确定要删除文章吗?若删除文章内的评论将被全部删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await deleteArticleOne(articleid)
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
      async deleteArticleSeleted(){
        if(this.articleSelection.length>0){
          this.$confirm('确定要删除这些文章吗?若删除，相关的评论也将被全部删除！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let result = await deleteArticleSeleted(this.articleSelection)
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
          this.$alert('未选中任何文章，请选中文章后再进行操作！', '消息提示', {
            confirmButtonText: '确定',
          });
        }
      },
      async search(){
        this.pageNum = 1
        this.startTime = this.searchDate[0]
        this.endTime = this.searchDate[1]
        let result = await searchArticle(this.plateid,this.startTime,this.endTime,this.articleTitle,this.pageNum)
        this.showArticleList = result
      },
     async  setAll(){
        this.pageNum = 1
        this.searchDate = []
        this.startTime=''
        this.endTime=''
        this.articleTitle = ""
        this.plateid = ''
        let result = await searchArticle(this.plateid,this.startTime,this.endTime,this.articleTitle,this.pageNum)
       this.showArticleList = result
      },
      selectPla(selVal){
        console.log(selVal)
          this.plateid = selVal
      }
    }

  }
</script>

<style scoped>
.acticleList{
  padding: 15px 0;
}
  .article_pagination{
    padding: 10px 0;
    float: right;
  }
  .articleSubrouter{
    position: absolute;
    top:0px;
    left:0px;
    padding: 15px;
    padding-top: 0;
    z-index: 990;
    min-height: 1500px;
    background-color: white;
  }
</style>
