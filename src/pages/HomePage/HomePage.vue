<template>
    <div class="homePage">
      <el-row type="flex" class="row-bg" justify="center" :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="userNum">
              <el-row :gutter="20">
                <el-col :span="7" :offset="3">
                  <div class="grid-content bg-purple navImgDiv">
                    <img class="navImg user-navImg" src="./img/user.png" alt="">
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="grid-content bg-purple">
                    <p class="number">{{AllNumber.userNum}}</p>
                     <p class="number-txt">用户数</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="userNum">
              <el-row :gutter="20">
                <el-col :span="7" :offset="3">
                  <div class="grid-content bg-purple navImgDiv">
                    <img class="navImg plate-navImg" src="./img/plate.png" alt="">
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="grid-content bg-purple">
                    <p class="number">{{AllNumber.plateNum}}</p>
                    <p class="number-txt">版块数</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="userNum">
            <el-row :gutter="20">
              <el-col :span="7" :offset="3">
                <div class="grid-content bg-purple navImgDiv">
                  <img class="navImg comment-navImg" src="./img/comment.png" alt="">
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple">
                  <p class="number">{{AllNumber.commentNum}}</p>
                  <p class="number-txt">评论数</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="userNum">
            <el-row :gutter="20">
              <el-col :span="7" :offset="3">
                <div class="grid-content bg-purple navImgDiv">
                  <img class="navImg art-navImg" src="./img/art.png" alt="">
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple">
                  <p class="number">{{AllNumber.articleNum}}</p>
                  <p class="number-txt">文章数</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="home_record">
        <el-col :span="18">
          <div class="grid-content">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="panel-header clearfix">
                <i class="el-icon-s-opportunity" style="color: #ff922c"></i>
                <span class="panel-txt">最近五个月用户与文章新增情况</span>
              </div>
              <div id="main" style="width: 100%;height: 240px;margin-top: -20px"> </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <i class="el-icon-pie-chart" style="color: #16C2C2"></i>
                <span class="panel-txt">版块文章数前五名对比</span>
              </div>
              <div id="main2" style="width: 100%;height: 240px"></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="home_record home_record2">
        <el-col :span="8">
          <div class="grid-content">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <i class="el-icon-position" style="color: #FF6E3A"></i>
                <span class="panel-txt">最新版块列表</span>
              </div>
              <div class="newPlateList">
                <ul>
                  <li v-for="(item,index) in this.NewFive.newPlate" :key="index" class="newUserItem clearfix">
                    <img class="plateLogo" src="./img/plate.png" alt="">
                    <div class="text item userLogo-txt">
                      <p class="user-name">
                        版块名：{{item.plate_name}}
                       &nbsp;&nbsp;&nbsp; <span>描述：{{item.description}}</span>
                      </p>
                      <p class="user-time">
                        注册时间：{{item.update_time}}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <i class="el-icon-position" style="color: #A37EFA"></i>
                <span class="panel-txt">最新文章列表</span>
              </div>
              <div class="newArticleList">
                <ul>
                  <li v-for="(item,index) in this.NewFive.newArticle" :key="index"  class="newUserItem clearfix">
                    <img class="articleLogo" src="./img/art.png" alt="">
                    <div class="text item userLogo-txt">
                      <p class="user-name">
                        文章标题：{{item.title}}
                      </p>
                      <p class="user-time">
                        注册时间：{{item.update_time}}
                        <span>&nbsp;&nbsp;&nbsp;作者：{{item.nick_name}}</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <i class="el-icon-position" style="color: #2A68CE"></i>
                <span class="panel-txt">新用户列表</span>
              </div>
              <div class="newUserList">
                <ul>
                  <li v-for="(item,index) in this.NewFive.newUser" :key="index" class="newUserItem clearfix">
                    <img class="userLogo" src="./img/user.png" alt="">
                    <div class="text item userLogo-txt">
                      <p class="user-name">
                        用户名：{{item.nick_name}}
                      </p>
                      <p class="user-time">
                        注册时间：{{item.update_time}}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {reqUserArticleChart,reqPlateArticleChart,reqNumber,reqNewFive} from '../../api/index'
  import Header from '../../components/Header/Header.vue'
  import {getStore} from '../../config/mUtils'
  import echarts from 'echarts'
    export default {
    data(){
      return {
        AllNumber:'',
        UserArticleChart:{},
        PlateArticleChart:'',
        NewFive:""
      }
    },
    methods:{
      async init(){
        this.AllNumber = await reqNumber()
        this.UserArticleChart = await reqUserArticleChart()
        this.PlateArticleChart = await reqPlateArticleChart()
        this.NewFive = await reqNewFive()

        let userid = getStore('bbs_user_id')
        if(userid){
          this.$store.dispatch('getLoginUserInfo',userid)
        }else{
          this.$router.push('/login')
        }
      }
    },
    watch:{
      UserArticleChart(val){
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            left: "center",
            bottom:"bottom",
            data:['用户数','文章数']
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '13%',
            top:'8%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : this.UserArticleChart.xAxis
            }
          ],
          yAxis : [
            {
              type : 'value',
              splitLine:{show: false}
            }
          ],
          series :  [
            { color:"#FF4401",
              name:'用户数',
              type:'line',
              stack: '总量',
              areaStyle: {
                normal: {
                  color: "#FDEEF5"
                }
              },
              data:this.UserArticleChart.yAxisUser
            },
            {
              color:"#2A68CE",
              name:'文章数',
              data:this.UserArticleChart.yAxisArticle,
              type: 'line',
              areaStyle: {
                normal: {
                  color: "#E1EDFB"
                }
              }
            }
          ]
        });
      },
      PlateArticleChart(val){
        var myChart2 = echarts.init(document.getElementById('main2'));
        myChart2.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              name: '版块内文章数',
              type: 'pie',
              radius : '50%',
              center: ['50%', '40%'],
              data: this.PlateArticleChart,
              color:['#B078F5', '#16C2C2','#FFC36D','#F36297','#409EFF'],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      }
    },
      mounted(){
        this.init()
      }
    }
</script>

<style scoped>
.userNum{
  height: 80px;
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  border: 1px solid #f8f8f8;
  border-radius: 4px;
  /*width:90%;*/
  /*text-align: center;*/
  margin-top: 15px;
}
  .home_record{
    margin-top: 15px;
  }
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  box-shadow: none;
  height: 300px;
  border: 1px solid #f2f2f2;
}
.home_record2{
  margin-bottom: 50px;
}
  .navImg{
    margin-top: 15px;
    width: 45px;
    height: 45px;
  }
  .navImgDiv{
    text-align: center;
  }
  .user-navImg{
    width: 50px;
    height: 50px;
  }
  .comment-navImg{
    width: 46px;
    height: 46px;
    margin-top: 17px;
  }
  .plate-navImg{
    width: 45px;
    height: 45px;
    margin-top: 18px;
  }
  .art-navImg{
    margin-top: 13px;
  }
  .number{
    margin-top: 20px;
    font-size: 23px;
    color: #58666E;
    font-weight: bold;
  }
  .number-txt{
    font-size: 12px;
    color: #ccc;
    line-height: 25px;
  }
  .panel-txt{
    font-size: 14px;
    color: #888;
  }
  .newUserItem{
    height: 40px;
    clear: both;
  }
  .userLogo{
    width: 16px;
    height: 16px;
    padding: 5px;
    border: 1px solid #bddaf6;
    border-radius: 26px;
    margin-right: 10px;
    float: left;
  }
  .plateLogo{
    width: 16px;
    height: 16px;
    padding: 5px;
    border: 1px solid #ffbe9f;
    border-radius: 26px;
    margin-right: 10px;
    float: left;
  }
  .articleLogo{
    width: 16px;
    height: 16px;
    padding: 5px;
    border: 1px solid #DED3FA;
    border-radius: 26px;
    margin-right: 10px;
    float: left;
  }
  .userLogo-txt{
    float: left;
    font-size: 13px;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .userLogo-txt p{
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-name{
    color: #6b7065;
    font-size: 11px;
  }
  .user-time{
    color: #b4b9ae;
    font-size: 10px;
  }
.item[data-v-1a11a0ca]{
  margin-bottom: 12px;
}
</style>
