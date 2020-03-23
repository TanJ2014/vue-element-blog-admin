<template>
    <div class="article_detail">
      <Breadcrumb></Breadcrumb>
      <div>
        <h2 class="article_title">
          <span class="isTop">{{this.articleDetail.is_top===1?'置顶':''}}</span>{{this.articleDetail.title}}
        </h2>
        <div class="article_desc">
          <span class="update_time">发表时间： {{this.articleDetail.update_time}}</span><el-divider direction="vertical"></el-divider>
          <span class="nick_name">作者：{{this.articleDetail.nick_name}}</span><el-divider direction="vertical"></el-divider>
          <span class="plate_name">版块：{{this.articleDetail.plate_name}}</span><el-divider direction="vertical"></el-divider>
          <span class="click_num">浏览量：{{this.articleDetail.click_num}}</span>
        </div>
        <el-divider></el-divider>
        <div class="article_content">
          {{this.articleDetail.content}}
        </div>
        <div class="article_comment">
          <p class="comment_num">
            <!--<i style="color: #409EFF" class="el-icon-chat-line-round"></i>-->
            评论 <span>({{this.articleDetail.comment_num}})</span>
          </p>
          <div class="woComment">
            <el-form ref="form" :model="addCommentform">
              <el-form-item>
                <el-input size="small" v-model="addCommentform.content" placeholder="请输入评论的内容"></el-input>
              </el-form-item>
              <el-form-item class="comment_btns">
                <el-button size="mini" type="primary" @click="addComment">评论</el-button>
                <el-button size="mini" @click="cancelComment">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--<el-divider></el-divider>-->
          <ul class="comment_list">
            <li v-for="(item,index) in this.articleDetail.comment_content" class="comment_item ">
              <div class="clearfix">
                <img class="user_logo fl" src="../../../assets/img/user.png" alt="">
                <div class="comment_txts fl">
                  <div class="clearfix">
                    <p class="nick_name fl">{{item.nick_name}}</p>
                    <p class="reply_del fr">
                      <span @click="replyArticle">回复</span>
                      <el-divider direction="vertical"></el-divider>
                      <span @click="delComment(item.id)">删除</span>
                    </p>
                  </div>
                  <p class="comment_time">{{item.update_time}}</p>
                  <div class="content">
                    {{item.content}}
                  </div>
                  <!--回复评论-->
                  <div class="replyInput" v-if="showReplyInput">
                    <el-input size="small" v-model="input" placeholder="请输入评论的内容"></el-input>
                    <el-link type="info" :underline="false">评论</el-link>
                    <el-link type="info" :underline="false">取消</el-link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {reqArticleDetail,delComment,commentArticle} from '../../../api/index'
  import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
  export default {
    data(){
      return {
        addCommentform:{
          topic_id:"",
          comment_type:"",
          content:""
        },
        comment:'',
        articleid:Number,
        articleDetail:{},
        showReplyInput:false,
      }
    },
    components:{
      Breadcrumb
    },
    mounted(){
      this.articleid = this.$route.params.articleid
      this.init()
    },
    methods:{
      async init(){
        let result = await reqArticleDetail(this.articleid)
        this.articleDetail = result
      },
      async addComment(){
        if(this.addCommentform.content!=""){
          let result = await commentArticle(this.addCommentform)
          if(result.status === 1){
            this.$message({
              message: '评论成功',
              type: 'success',
              duration:2000
            })
            this.init()
            this.addCommentform.content = ""
          }
        }else{
          this.$message.error({
            message: '评论内容不能为空',
            duration:2000
          })
        }
      },
      cancelComment(){
        this.addCommentform.content = ""
      },
      replyArticle(){

      },
      async delComment(id){
        this.$confirm('确定要删除此评论吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await delComment(id)
          if(result.status===1){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.init()
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

      }
    }
  }
</script>

<style scoped>
  .article_detail{
    z-index: 200;
  }
  .article_title{
    font-size: 28px;
    vertical-align: middle;
  }
  .article_title .isTop{
    color: crimson;
    font-size: 14px;
    border: 1px solid crimson;
    border-radius: 4px;
    padding: 3px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }
  .article_desc{
    margin-top: 15px;
    color: #999;
    font-size: 13px;
  }
  .article_content{
    font-size: 16px;
    color: #4d4d4d;
  }
  .article_comment{
    width: 100%;
    margin-top:30px;
  }
  .article_comment .comment_num{
    font-size: 18px;
    vertical-align: middle;
  }
  .article_comment .comment_num span{
    color: #999;
    font-size: 13px;
  }
  .user_logo{
    width: 30px;
    height: 30px;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix:after {
    content: " ";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    font-size:0;
  }
  .comment_time{
    color: #666;
    font-size: 10px;
    line-height: 15px;
  }
  .comment_txts{
    margin-left: 10px;
    width: 95%;
  }
  .comment_txts .content{
    padding-top: 10px;
    font-size: 12px;
    color: #333;
  }
  .comment_item{
    border-bottom: .4px solid #e7e7e7;
    padding: 15px 0;
    position: relative;
  }
  .nick_name{
    color:#666;
    font-size: 14px;
    line-height: 20px;
  }
  .comment_item{
    width: 100%;
  }
  .reply_del{
    font-size: 12px;
    color: #666;
  }
  .reply_del span:hover{
    cursor: pointer;
  }
  .replyInput{
    margin: 10px 0;
  }
  .replyInput .el-link{
    padding-top: 10px;
  }
  .el-form-item{
    margin-top: 10px;
    margin-bottom: 0!important;
  }

  .comment_btns{
    margin-top: 0px;
  }
</style>
