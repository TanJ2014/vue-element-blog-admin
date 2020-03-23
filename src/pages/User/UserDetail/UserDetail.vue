<template>
    <div>
      <Breadcrumb></Breadcrumb>
        <div  class="textItem">
          <p>
            <img class="photo" src="../../../assets/img/user.png" alt="" />
          </p>
          <p><label class="itemName">昵称：</label><span class="itemContent">{{userdetail.nick_name}}</span></p>
          <p><label class="itemName">性别：</label><span class="itemContent">{{userdetail.sex}}</span></p>
          <p><label class="itemName">邮箱：</label><span class="itemContent">{{userdetail.email}}</span></p>
          <p><label class="itemName">个性签名：</label><span class="itemContent">{{userdetail.signature}}</span></p>
          <p><label class="itemName">个人积分：</label><span class="itemContent">{{userdetail.integral}}</span>
            <label class="tipLabel" v-if="userdetail.integral>=50">积分超过50有机会成为版主！</label>
          </p>
          <p><label class="itemName">个人帖数：</label><span class="itemContent">{{userdetail.postNum}}</span>
            <label class="tipLabel tipLabel2">每发一帖，积分+5</label>
          </p>
          <p><label class="itemName">用户角色：</label>
            <span class="itemContent"><span v-if="userdetail.plate_name">{{userdetail.plate_name}}</span>{{userdetail.role_name}}</span>
          </p>
          <p><label class="itemName">注册时间：</label><span class="itemContent">{{userdetail.update_time}}</span></p>
        </div>

    </div>
</template>

<script>
  import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
  import {reqUserDetail} from '../../../api/index'
  import {mapState} from 'vuex'
    export default {
      data(){
        return {
          user_id:Number,
          userdetail:{}
        }
      },
      components:{
        Breadcrumb
      },
    mounted(){
      this.user_id = this.$route.params.userid
      this.init()
    },
    computed:{
    },
    methods:{
      async init(){
        let result = await reqUserDetail(this.user_id)
        console.log(result)
        this.userdetail = result
      }
    }
    }
</script>

<style scoped>
  .textItem p{
    line-height: 45px;
    border-bottom: 1px solid #f9f9f9;
  }
.itemName{
  width: 80px;
  display: inline-block;
  color: #777;
  font-size: 14px;
}
  .itemContent{
    color: #444;
    font-size: 14px;
  }
  .tipLabel{
    font-size: 10px;
    color: white;
    padding: 3px;
    /*border: 1px solid black;*/
    background: #00bc00;
    margin-left: 5px;
    border-radius: 3px;
  }
  .tipLabel2{
    background: #E6A23C;
  }
  .photo{
    width: 94px;
    height: 94px;
    /*border-radius: 30px;*/
    position: absolute;
    right: 70px;
  }
</style>
