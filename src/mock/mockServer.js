//使用mock.js提供mock数据接口
import Mock from 'mockjs'
import data from './data.json'


Mock.mock('/users/list?pageNum=1',data.users)

Mock.mock(`/homepage/userArticleChart`,data.userArticleChart)
Mock.mock(`/homepage/plateArticleChart`,data.plateArticleChart)
Mock.mock(`/homepage/number`,data.allnumber)
Mock.mock(`/homepage/newFive`,data.newFive)

Mock.mock('/users/toplateuser',data.plateUserList)

Mock.mock('/plates/list?pageNum=1',data.plates)
Mock.mock('/plates/list?pageNum=2',data.plates2)
Mock.mock('/plates/list?pageNum=3',data.plates3)
Mock.mock('/plates/list?pageNum=4',data.plates4)
Mock.mock('/plates/list?pageNum=5',data.plates5)

Mock.mock('/articles/list',data.articles)

Mock.mock('/commons/list',data.comments)

Mock.mock('/plates/addplate' ,data.addplate)
Mock.mock('/plates/allplatename' ,data.allplatename)

Mock.mock('/users/adduser' ,data.adduser)

Mock.mock(RegExp('/users/userdetail/' + ".*") ,data.userdetail)
//应该使用正则表达式

Mock.mock(RegExp('/plates/platedetail/'+'.*') ,data.platedetail)
//应该使用正则表达式

// Mock.mock('/plates/editplate/1',data.editplate)
Mock.mock(RegExp('/plates/editplate/'+'.*'),data.editplate)
//不需要向外暴露任何数据，只需要保证执行即可

Mock.mock(RegExp('/plates/deleteplate/'+'.*'),data.delete)

Mock.mock(RegExp('/plates/deleteplate/'+'.*'),data.delete)
Mock.mock(RegExp('/users/logout'+'.*'),data.delete)

Mock.mock(RegExp('/users/deleteuser/'+'.*'),data.delete)

Mock.mock(RegExp('/users/deleteusers/'+'.*'),data.delete)

Mock.mock(RegExp('/plates/noplateuser/'+'.*'),data.noplateuser)

Mock.mock(RegExp('/comments/deletecomment/'+'.*'),data.delete)

Mock.mock(RegExp('/users/edituserinfo/'+'.*'),data.delete)

Mock.mock(RegExp('/comments/deletecomments/'+'.*'),data.delete)

Mock.mock("/articles/addcomment",data.delete)

Mock.mock(RegExp('/plates/searchplate'+'.*'),data.searchplate)

Mock.mock(RegExp('/users/searchuser'+'.*'),data.searchuser)

Mock.mock(RegExp('/articles/searcharticle'+'.*'),data.searcharticle)

Mock.mock(RegExp('/comments/searchcomment'+'.*'),data.searchcomment)

Mock.mock(RegExp('/articles/articledetail'+'.*'),data.articleDetail)

Mock.mock(RegExp('/articles/deletearticle'+'.*'),data.delete)

Mock.mock(RegExp('/plates/deletearticles'+'.*'),data.delete)

Mock.mock(RegExp('/users/loginuserinfo'+'.*'),data.loginUser)

Mock.mock(RegExp('/plates/plateUserPlateList'+'.*'),data.plateUserPlateList)
Mock.mock(RegExp('/articles/plateUserArticleList'+'.*'),data.plateUserArticleList)
Mock.mock(RegExp('/comments/plateUserCommontList'+'.*'),data.plateUserCommontList)

Mock.mock('/users/login',data.login)

