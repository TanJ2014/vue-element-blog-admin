import {
  RECEIVE_USERLIST,
  RECEIVE_PLATELIST,
  RECEIVE_ARTICLELIST,
  RECORD_USERID,
  RECEIVE_COMMONLIST,
  RECEIVE_LOGINUSER,
  RECEIVE_PLATEUSERCOMMONLIST,
  RECEIVE_PLATEUSERARTICLELIST,
  RECEIVE_PLATEUSERPLATELIST,
  RECEIVE_PLATENAMES,
  RECEIVE_TOPLATEUSER,
} from "./mutation-types"
import {
  reqUserList,
  reqPlateList,
  reqArticleList,
  reqLogin,
  reqCommentList,
  reqLoginUserInfo,
  reqPlateUserArticleList,
  reqPlateUserCommontList,
  reqPlateUserPlateList,
  reqAllPlateName,
  reqPlateUserList
} from "../api/index"

export default {
  //获取用户列表
  async getToPlateUser({commit}){
    const result = await reqPlateUserList()
    console.log("res0"+result)
    commit(RECEIVE_TOPLATEUSER,result)
  },
  //获取版块列表
  // async getPlateList({commit},pageNum){
  //   const result = await reqPlateList(pageNum)
  //   commit(RECEIVE_PLATELIST,result)
  // },
  //获取版块列表
  async getAllPlateName({commit}){
    const result = await reqAllPlateName()
    commit(RECEIVE_PLATENAMES,result)
  },
  //根据版主id返回所管理的版块列表
  async getPlateUserPlateList({commit},user_id){
    const result = await reqPlateUserPlateList(user_id)
    commit(RECEIVE_PLATEUSERPLATELIST,result)
  },
  //获取文章列表
  // async getArticleList({commit}){
  //   const result = await reqArticleList()
  //   commit(RECEIVE_ARTICLELIST,result)
  // },
  //根据版主id返回所管理的文章列表
  async getPlateUserArticleList({commit},data){
    const result = await reqPlateUserArticleList(data.user_id,data.pageNum)
    commit(RECEIVE_PLATEUSERARTICLELIST,result)
  },
  //获取评论列表
  // async getCommentList({commit}){
  //   const result = await reqCommentList()
  //   commit(RECEIVE_COMMONLIST,result)
  // },
  //根据版主id返回所管理的评论列表
  async getPlateUserCommontList({commit},user_id){
    const result = await reqPlateUserCommontList(user_id)
    commit(RECEIVE_PLATEUSERCOMMONLIST,result)
  },
  //用户登录系统
  async getLoginUserId({commit},{nick_name,password,callback}){
    const result = await reqLogin(nick_name,password)
    console.log(result)
    commit(RECORD_USERID,result.user_id)
    callback&&callback()
  },

  //记录当前用户的信息
  async getLoginUserInfo({commit},userid){
    const result = await reqLoginUserInfo(userid)
    commit(RECEIVE_LOGINUSER,result)
  },

}

