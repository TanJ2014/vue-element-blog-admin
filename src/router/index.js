import Vue from 'vue'
import Router from 'vue-router'

import Plate from '../pages/Plate/Plate.vue'
import HomePage from '../pages/HomePage/HomePage.vue'
import User from '../pages/User/User.vue'
import System from '../pages/System/System.vue'
import Article from '../pages/Article/Article.vue'
import Comment from '../pages/Comment/Comment.vue'
import ArticleDetail from '../pages/Article/ArticleDetail/ArticleDetail.vue'
import EditPlate from '../pages/Plate/EditPlate/EditPlate.vue'
import AddPlate from '../pages/Plate/AddPlate/AddPlate.vue'
import PlateDetail from '../pages/Plate/PlateDetail/PlateDetail.vue'
import AddUser from '../pages/User/AddUser/AddUser.vue'
import EditUser from '../pages/User/EditUser/EditUser.vue'
import UserDetail from '../pages/User/UserDetail/UserDetail.vue'
import Login from '../pages/Login/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      component: Login,
      meta:{
        NoShowLeftMenu:true,
        NoShowHeader:true
      }
    },
    {
      path:'/',
      redirect: '/login'
    },
    {
      path:'/plate',
      name:'plate',
      component: Plate,
      meta:{
        title:'版块管理'
      },
      children:[
        {
          path:'editPlate/:plateid',
          component:EditPlate,
          meta:{
            title:'编辑版块'
          }
        },
        {
          path:'addPlate',
          component:AddPlate,
          meta:{
            title:'新增版块'
          }
        },
        {
          path:'plateDetail/:plateid',
          component:PlateDetail,
          meta:{
            title:'版块详情'
          }
        },
      ]
    },
    {
      path:'/homepage',
      name:'homepage',
      component: HomePage,
      meta:{
        title:'首页',
      }
    },
    {
      path:'/comment',
      name:'comment',
      component: Comment,
      meta:{
        title:'评论管理'
      }
    },
    {
      path:'/user',
      name:'user',
      component: User,
      meta:{
        title:'用户管理'
      },
      children:[
        {
          path: 'adduser',
          component: AddUser,
          meta: {
            title: '添加用户'
          }
        },
        {
          path:'edituser/:userid',
          component:EditUser,
          meta:{
            title:'编辑用户'
          }
        },
        {
          path:'userdetail/:userid',
          component:UserDetail,
          meta:{
            title:'查看用户信息'
          }
        }
      ]

    },
    // {
    //   path:'/system',
    //   name:'system',
    //   component: System,
    //   meta:{
    //     title:'系统设置'
    //   }
    // },
    {
      path:'/article',
      name:'article',
      component: Article,
      meta:{
        title:'文章管理'
      },
      children:[
        {
          path:'articleDetail/:articleid',
          component: ArticleDetail,
          meta:{
            title:'文章详情'
          }
        }
      ]
    }
  ]
})
