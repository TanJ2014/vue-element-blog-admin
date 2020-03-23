<template>
    <div>
      <Breadcrumb></Breadcrumb>
      <div class="textItem">
        <p><label class="itemName">版块名称：</label><span class="itemContent">{{plateDetail.plate_name}}</span></p>
        <p><label class="itemName">版块描述：</label><span class="itemContent">{{plateDetail.description}}</span></p>
        <p><label class="itemName">版块帖数：</label><span class="itemContent">{{plateDetail.postNum}}</span></p>
        <p><label class="itemName">版主：</label><span class="itemContent">{{plateDetail.moderator_name}}</span></p>
        <p><label class="itemName">创建时间：</label><span class="itemContent">{{plateDetail.update_time}}</span></p>
      </div>
    </div>
</template>

<script>
  import {reqPlateDetail} from '../../../api/index'
  import {mapState} from 'vuex'
  import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.vue'
    export default {
      data(){
        return {
          plateid:Number,
          plateDetail:{}
        }
      },
      components:{
        Breadcrumb
      },
      mounted(){
        this.plateid = this.$route.params.plateid
        this.init()
      },
      computed:{
      },
      methods:{
        async init(){
          let result = await reqPlateDetail(this.plateid)
//          console.log(result)
          if(result){
            this.plateDetail = result
          }else{
            this.$message.error('请求错误！');
            this.$router.go(-1)
          }
        }
      }
    }
</script>

<style>
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
</style>
