import fetch from './fetch'
import ajax from './ajax'
const BASE_URL = '/api'

//1.用户登录
export const reqLogin = (nick_name,password)=>ajax(`/users/login`,{nick_name:nick_name,password:password},'POST')

//2.根据登录用户的id获取用户信息
export const reqLoginUserInfo = (user_id)=>ajax(`/users/loginuserinfo`,{user_id:user_id})

//3.用户退出
export const reqLogout= ()=>ajax(`/users/logout`)

//首页
//4.获取文章、评论、用户、版块的数量
export const reqNumber = () => ajax(`/homepage/number`)

//5.获取最近五个月用户、文章的增长情况
export const reqUserArticleChart = () =>ajax(`/homepage/userArticleChart`)

//6.获取文章数排名前五的版块
export const reqPlateArticleChart = () =>ajax(`/homepage/plateArticleChart`)

//7.返回最新的五个用户、版块、文章
export const reqNewFive = () =>ajax(`/homepage/newFive`)

//8.搜索版块
export const searchPlate = (startTime,endTime,plateName,pageNum)=> ajax(`/plates/searchplate`,{startTime,endTime,plateName,pageNum})

//9.添加版块
export const addPlate = (data)=> {
  let data2 = data
  let mod = data.moderator
  if(data.moderator<=0){
    mod = 0
  }
  data2={
    plate_name:data.plate_name,
    desciption:data.desciption,
    moderator:mod
  }
  return ajax(`/plates/addplate`,data,'POST')
}

//10.根据版块ID查询版块详情
export const reqPlateDetail = (plate_id)=> ajax(`/plates/platedetail/${plate_id}`)

//11.根据版块ID修改版块详情
export const editPlateDetail = (plate_id,data)=> ajax(`/plates/editplate/${plate_id}`,data,'POST')

//12.根据版块ID删除版块
export const deletePlateOne = (plate_id)=> ajax(`/plates/deleteplate/${plate_id}`)

//13.批量删除版块
export const deletePlateSelected = (plate_ids)=> ajax(`/plates/deleteplates/${plate_ids}`)

//14.获取版块名称
export const reqAllPlateName = ()=>ajax(`/plates/allplatename`)

//15.获取供选择的版块列表（返回没有版主的版块列表）
export const reqNoPlateList = (user_id) => ajax(`/plates/noplateuser/${user_id}`)

//16.获取可以做版主的用户
export const reqPlateUserList = () => ajax(`/users/toplateuser`)

//17.搜索文章
export const searchArticle = (plateid,startTime,endTime,articleTitle,pageNum)=> ajax(`/articles/searcharticle`,{plateid,startTime,endTime,articleTitle,pageNum})

//18.根据文章的id获取文章的详细情况
export const reqArticleDetail = (article_id)=>ajax(`/articles/articledetail/${article_id}`)

//19.评论文章，给某个文章添加评论
export const commentArticle = (data)=>ajax(`/articles/addcomment`,data,'POST')

//20.根据文章ID删除版块
export const deleteArticleOne = (article_id)=>ajax(`/articles/deletearticle/${article_id}`)

//21.批量删除文章
export const deleteArticleSeleted = (article_ids)=>ajax(`/articles/deletearticles/${article_ids}`)

//22.根据评论的id删除评论
export const delComment = (comment_id)=>ajax(`/comments/deletecomment/${comment_id}`)

//23.搜索评论
export const searchComment = (startTime,endTime,commentContent,pageNum)=> ajax(`/comments/searchcomment`,{startTime,endTime,commentContent,pageNum})

//24.根据评论的id删除评论
export const deleteCommentOne = (comment_id)=>ajax(`/comments/deletecomment/${comment_id}`)

//25.批量删除评论
export const deleteCommentSeleted = (comment_ids)=>ajax(`/comments/deletecomments/${comment_ids}`)

//26.搜索用户
export const searchUser = (role_name,username,pageNum)=> ajax(`/users/searchuser`,{role_name,username,pageNum})

//27.添加用户
export const addUser = (data)=> ajax(`/users/adduser`,data,'POST')

//28.修改用户信息
export const edituserinfo = (user_id,data) => ajax(`/users/edituserinfo/${user_id}`,data,'POST')

//29.根据用户ID查询用户详情
export const reqUserDetail = (user_id)=> ajax(`/users/userdetail/${user_id}`)

//30.根据用户ID删除用户
export const deleteUserOne = (user_id)=> ajax(`/users/deleteuser/${user_id}`)

//31.批量删除用户
export const deleteUserSelected = (user_ids)=> ajax(`/users/deleteusers/${user_ids}`)

//32.根据版主id返回所管理的版块列表
export const reqPlateUserPlateList = (user_id)=>ajax(`/plates/plateUserPlateList`,user_id)

//33.根据版主id返回所管理的文章列表
export const reqPlateUserArticleList = (user_id,pageNum)=>ajax(`/articles/plateUserArticleList`,{user_id,pageNum})

//34.根据版主id返回所管理的评论列表
export const reqPlateUserCommontList = (user_id)=>ajax(`/comments/plateUserCommontList`,user_id)


//获取用户列表
// export const reqUserList = (pageNum) => ajax(`/users/list`,pageNum)
//获取版块列表
// export const reqPlateList = (pageNum)=>ajax('/plates/list',pageNum)
//获取文章列表
// export const reqArticleList = (pageNum)=>ajax('/articles/list',pageNum)
//获取评论列表
// export const reqCommentList = ()=>ajax('/commons/list')
