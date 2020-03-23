<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <div v-if="this.$route.path==='/user'">
      <div>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-row  type="flex" justify="start">
              <div class="grid-content bg-purple">
                <el-button size="mini" type="primary" plain icon="el-icon-plus" @click="goto('/user/adduser')">新增用户</el-button>
                <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="deleteSeleted()">删除所选</el-button>
              </div>
            </el-row>
          </el-col>
          <el-col :span="19">
            <el-row  type="flex" justify="end" :gutter="10">
              <el-col :span="5">
                <div class="grid-content">
                  <el-select size="mini" v-model="selectRoleName" clearable placeholder="请选择用户身份">
                    <el-option v-for="item in rolename" :key="item.id" :label="item.role_name" :value="item.role_name"></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content">
                  <el-input size="mini" placeholder="请输入用户名查找" v-model="username" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content">
                  <el-button type="primary" size="mini" @click="search()">搜索</el-button>
                  <el-button type="primary" size="mini" class="reset_btn" @click="setAll">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="acticleList" >
        <el-table fit :data="showUserList" style="width: 100%"  @selection-change="changeSelect">
          <el-table-column type="selection"></el-table-column>
          <el-table-column fixed prop="nick_name" label="用户名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <!--<el-table-column prop="signature"  label="个性签名"></el-table-column>-->
          <el-table-column prop="postNum" sortable  label="文章数"></el-table-column>
          <el-table-column prop="integral" sortable  label="积分"></el-table-column>
          <el-table-column prop="role_name" label="角色">
          </el-table-column>
          <el-table-column prop="update_time" sortable label="注册时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150" >
            <template slot-scope="scope">
              <el-button @click="showUser(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button @click="editDetail(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteOne(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="article_pagination" :page-size="5" :current-page="pageNum" background layout="prev, pager, next" :total="showUserList.length" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <router-view class="plateSubrouter"></router-view>
  </div>
</template>

<script>
  import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
  import {mapState} from 'vuex'
  import {deleteUserOne,deleteUserSelected,searchUser} from '../../api/index'
  import {getStore} from '../../config/mUtils'
  export default {
    data() {
      return {
        selectRoleName: '',
        username: '',
        rolename:[
          {
            id:1,
            role_name:"普通用户"
          },
          {
            id:2,
            role_name:"版主"
          },
           {
             id:3,
             role_name:"管理员"
           }
        ],
        userSelection:[],
        pageNum:1,
//        currentPageNum:1,
        showUserList:[],
        isSearch:false,
      }
    },
    components:{
      Breadcrumb
    },
    watch:{
//      userList(val){
//        this.showUserList = this.userList
//      }
    },
    mounted(){
//      this.$store.dispatch('getUserList',{pageNum:this.pageNum})
      this.setAll()
      let userid = getStore('bbs_user_id')
      if(userid){
        this.$store.dispatch('getLoginUserInfo',userid)
      }else{
        this.$router.push('/login')
      }
    },
    computed:{
      ...mapState(['userList']),
    },
    methods:{
      async handleCurrentChange(val) {
        this.pageNum = val
        if(this.isSearch === false){
          this.$store.dispatch('getUserList',{pageNum:val})
          console.log(`当前页: ${val}`);
        }else{
          let result = await searchUser(this.selectRoleName,this.username,val)
          console.log(`当前页: ${val}`);
        }
      },
      goto(str){
        this.$router.push(str)
      },
      showUser(user_id){
        this.$router.push(`/user/userdetail/${user_id}`)
      },
      editDetail(user_id){
        this.$router.push(`/user/edituser/${user_id}`)
      },
      //记录选中的版块id
      changeSelect(val){
        this.userSelection = []
        val.forEach(item=>{
          this.userSelection.push(item.id)
        })
        console.log(this.userSelection)
      },
      async deleteOne(user_id){
        this.$confirm('确定要删除此用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await deleteUserOne(user_id)
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
      async deleteSeleted(){
        if(this.userSelection.length>0){
          this.$confirm('确定要删除这些用户吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            let result = await deleteUserSelected(this.userSelection)
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
        }else {
          this.$alert('未选中任何用户，请选中用户再进行操作', '消息提示', {
            confirmButtonText: '确定',
          });
        }
      },
      async search(){
        this.pageNum = 1
        let result = await searchUser(this.selectRoleName,this.username,this.pageNum)
        this.showUserList = result
        this.isSearch = true
      },
      async setAll(){
        this.pageNum = 1
        this.selectRoleName = ""
        this.username = ""
        let result = await searchUser(this.selectRoleName,this.username,this.pageNum)
        this.showUserList = result
        this.isSearch = true
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
  .plateSubrouter{
    position: absolute;
    top:0px;
    left:0px;
    bottom: 0;
    right: 0;
    padding: 15px;
    padding-top: 0;
    z-index: 100;
    min-height: 1500px;
    background-color: white;

  }
</style>
