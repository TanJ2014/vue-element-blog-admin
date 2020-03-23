# 基于vue-cli + element-ui + mock.js搭建的博客后台管理系统

# 写在前面：

该系统原本是知识共享平台的后台管理系统，使用的是前后端分离的架构模式。后台基于Spring、SpringMVC、MyBatis当下主流框架编写，前端使用VUE.js框架，Element框架,页面简洁大方，知识共享平台的后台管理系统已申请软件著作权。这里我将该系统前端部分抽取出来作为博客后台管理系统分享，使用了Mock.js来模拟后台数据。仅供学习参考，切勿用于商业目的。

# 主要的功能：

博客后台管理系统根据实际需求，设计并实现的功能如下：

1. 用户信息管理。记录用户在知识共享平台中注册过的用户信息，管理员可以对用户信息进行搜索、修改、删除、增加。其中，管理员通过系统可以指派某个用户作为某个版块的版主，协助管理员来管理该版块的文章与评论，减轻管理员的工作量。

2. 文章信息管理。记录了用户在知识共享平台中发表过的文章，管理员可以管理全部文章，版主可以管理自己管理的版块中的文章，两者可对文章进行查看、删除、搜索操作。值得注意的是不能进行编辑操作，编辑只能由该文章的作者在知识共享平台中进行，其他人不能修改文章内容。

3. 评论信息管理。记录了用户在知识共享平台中发表过的评论，管理员可以管理全部评论，版主可以管理对应版块中文章的评论，两者可对评论进行查看、删除、搜索操作。

4. 版块信息管理。记录了知识共享平台中的版块信息，管理员可以自行增加、删除、搜索、查看版块。同时，管理员可以为每个版块委派一个版主，协助管理员管理平台。

# 项目启动

进入项目的根目录，输入以下命令，即可启动

```
cnpm install
cnpm start
```

或者：

```
npm install
npm start
```

启动成功后打开 http://localhost:8080 即可访问，随意输入用户名与密码即可登录
在线预览：https://tanj2014.github.io/vue-element-blog-admin/dist/

# 相关API：

# 1.用户登录

只要管理员和版主才能登录成功，并且需要用户名、密码正确，登录成功后前端在localStorage中存储了user_id

### 请求URL

http://localhost:8080/users/login

### 示例

### 请求方式

post

### 参数类型

| 参数      | 是否必须 | 类型   | 说明   |
| --------- | -------- | ------ | ------ |
| nick_name | Y        | string | 用户名 |
| password  | Y        | string | m密码  |

### 返回示例

```
{
	"status": 1,   //如果是普通用户则为0,登录失败为0
  	"message": '登录成功',
  	"user_id":12 //用户id   //如果是普通用户，则为null
}
```

# 2.根据登录用户的id获取用户信息

### 请求URL

http://localhost:8080/users/loginuserinfo

### 请求方式

get

### 参数类型

| 参数   | 是否必须 | 类型 | 说明 |
| ------ | -------- | ---- | ---- |
| userid | Y        | int  |      |

### 返回示例

```
{
	"nick_name":"它不仅"，
	"role_name":"版主"，
	"plate_id":1，//如果是管理员，则为0或空
	"plate_name":"学习版块"，//如果是管理员，则为空
}
```

# 3.用户退出

### 请求URL

http://localhost:8080/users/logout

### 请求方式

get

### 参数类型

暂无

### 返回示例

```
{
  status: 1,
  message: '退出成功'
}
```

# 首页中的一些内容

# 4.返回文章、评论、用户、版块的个数

### 请求URL

http://localhost:8080/homepage/number

### 请求方式

get

### 参数类型

无

### 返回示例

```
{
	userNum:100,
	plateNum:10,
	articleNum:2308,
	commentNum:3223
}
```

# 5.返回文章、用户数对比折线图

最近五个月的文章、用户新增情况，只计算当月的新增情况

### 请求URL

http://localhost:8080/homepage/userArticleChart

### 请求方式

get

### 参数列表

无

### 返回示例

```
{
	"xAxis":['2月','3月','4月','5月','6月'],//x轴横坐标，显示最近五个月
	"yAxisUser":[1320, 1330, 1000, 2000, 932],
	"yAxisArticle":[2320, 1430, 1100, 2090, 1932]
}
```

# 6.返回版块内的文章数量饼状图

展示前五个文章数最多的版块

## 请求URL

http://localhost:8080/homepage/plateArticleChart

## 请求方式

get

## 参数列表

无

## 返回示例

```
[
    {value:135, name:'学习'},
    {value:310, name:'生活'},
    {value:234, name:'跳蚤市场'},
    {value:135, name:'Vue'},
    {value:548, name:'SSM'}
]
```

# 7.返回最新的五个用户、版块、文章

### 请求URL

http://localhost:8080/homepage/newFive

### 请求方式

get

### 参数类型

无

### 返回示例

```
{
	"newUser":[   //五个，只需要五个
		{
			"id":1, //用户id
			"nick_name":"tanj",
			"update_time":"2019-05-29 10:17:55"	
		},
		{
			"id":2, //用户id
			"nick_name":"zhang",
			"update_time":"2019-05-29 10:17:55"	
		},
		......
	],
	"newPlate":[
		{
			"id":1,//版块id
			"plate_name":"学习"，
			"description":"这是学习的地方"，
			"update_time":"2019-05-29 10:17:55"	
		},
		......
	],
	"newArticle":[
		{
			"id":1,//文章的id
			"title":"文章的标题"，
			"nick_name"："tanjiajia",//文章的作者
			"update_time":"2019-05-29 10:17:55"	
		},
		......
	]
}
```

# 管理员登录

# 版块

# 8.搜索版块

### 请求URL

http://localhost:8080/plates/searchplate

### 示例

http://localhost:8080/plates/searchplate?startTime=20190909&endTime=20190910&plateName=学习

/plates/searchplate?startTime=2019-08-07&endTime=2019-08-15&plateName=12&pageNum=1

### 请求方式

get

### 参数类型 query

| 参数      | 是否必须 | 类型   | 说明                                   |
| --------- | -------- | ------ | -------------------------------------- |
| startTime | N        | string | 前端控制开始时间和结束时间必须同时输入 |
| endTime   | N        | string |                                        |
| plateName | N        | string |                                        |
| pageNum   | N        | int    |                                        |

### 返回示例

```
[
    {
        "plate_name": "学习",
        "id": 1,
        "description|1-10":"这里是讨论学习的地方",
        "moderator_name|1-10":"213",
        "update_time":"1029-12-21",
        "postNum|1-1000":20
    }
]
```

# 9.添加版块

### 请求URL

http://localhost:8080/plates/addplate

### 请求方式

post

### 参数类型

| 参数         | 是否必须 | 类型   | 说明                            |
| ------------ | -------- | ------ | ------------------------------- |
| platedetail  | Y        | {}     | 包含下面三个属性                |
| { desciption | Y        | string | 版块描述                        |
| moderator    | N        | int    | 版主id,默认为0 表示该版块无版主 |
| plate_name } | Y        | string | 版块名称                        |

### 返回示例

```
{
  status: 1,
  success: '添加版块信息成功',
}
```

# 10.根据版块ID获取版块详情

### 请求URL

http://localhost:8080/plates/platedetail/:plateid

### 示例

### 请求方式

get

### 参数列表

| 参数    | 是否必须 | 类型 | 说明   |
| ------- | -------- | ---- | ------ |
| plateid | Y        | int  | 版块id |

### 返回示例

```
 {
     "plate_name": "学习",
     "id": 1,
     "description|1-10":"这里是讨论学习的地方",
     "moderator_name|1-10":"213",
     "update_time":"1029-12-21",
     "postNum|1-1000":20
    }
```

# 11.根据版块id修改版块内容

### 请求URL

http://localhost:8080/plates/editplate/:plateid

### 示例

### 请求方式

post

### 参数列表

| 参数                             | 是否必须 | 类型   | 说明                 |
| -------------------------------- | -------- | ------ | -------------------- |
| plateid                          | Y        | int    | 版块id               |
| platedetail                      | Y        | {}     |                      |
| { desciption                     | Y        | string | 版块描述             |
| moderator 改成**moderator_name** | N        | int    | 版主的id 默认为0     |
| plate_name }                     | Y        | string | 版块名称，不允许重复 |

### 返回示例

```
{
  status: 1,
  success: '修改版块信息成功',
}
```

# 12.删除所选择的版块

### 请求URL

http://localhost:8080/plates/deleteplate/:plateid

### 请求方式

get

### 参数列表

| 参数    | 是否必须 | 类型 | 说明           |
| ------- | -------- | ---- | -------------- |
| plateid | Y        | int  | 要删除的那个id |

### 返回示例

```
{
  status: 1,
  success: '版块删除成功',
}
```

# 13.批量删除选择的版块

### 请求URL

http://localhost:8080/plates/deleteplate/:plateids

### 请求方式

get

### 参数列表

| 参数     | 是否必须 | 类型 | 说明                         |
| -------- | -------- | ---- | ---------------------------- |
| plateids | Y        | []   | 所有选中的版块的id组成的数组 |

### 返回示例

```
{
  status: 1,
  success: '版块批量删除成功',
}
```

# 14.获取所有版块名称

### 请求URL

http://localhost:8080/plates/allplatename

### 请求方式

get

### 参数列表

暂无

### 返回示例

```
[
    {
		id:"1",
		plate_name:"学习"
    }，
     {
		id:"2",
		plate_name:"生活"
    }，
.......    
]
```

# 15.返回没有版主的版块列表

要求:该版块没有版主

### 请求URL

http://localhost:8080/plates/noplateuser/:userid

### 请求方式

get

### 参数类型

| 参数   | 是否必须 | 类型 | 说明                                                         |
| ------ | -------- | ---- | ------------------------------------------------------------ |
| userid | Y        | int  | 根据用户id返回版块列表，如果该用户是版主，则返回的列表中应该包括该版块（且该版块应该放在数组中的第一个位置）+没有版主的版块列表,如果该用户不是版主，则返回的列表中只包括没有版主的版块 |

### 返回示例

```
[
	{
		plateid:1,
		plate_name:"学习版块"
	}，
	{
		plateid:11,
		plate_name:"生活版块"
	}
]
```

# 16.返回可以选择的版主

1.积分数大于50

2.未担任其他版块的版主

### 请求URL

http://localhost:8080/users/toplateuser

### 请求方式

get

### 参数类型

无

### 返回示例

```
[
	{
		userid:1,
		nick_name:"tanjia"
	},
	{
		userid:12,  
		nick_name:"tanjia2"
	}
]
```

# 文章

# 17.搜索文章

### 请求URL

http://localhost:8080/articles/searcharticle

### 示例

http://localhost:8080/articles/searcharticle?plateid=2&startTime=20190909&endTime=20190910&plateName=学习&pageNum=1

### 参数列表

| 参数         | 是否必须 | 类型   | 说明                    |
| ------------ | -------- | ------ | ----------------------- |
| plateid      | N        | int    | 版块的id                |
| startTime    | N        | string |                         |
| endTime      | N        | string |                         |
| articleTitle | N        | string | 模糊查询文章的标题      |
| pageNum      | N        | int    | 默认传递1，一页显示10条 |

### 返回示例

```
[
    {
      "id":1,
      "title": "如何使用mockjs",
      "nick_name": "谭佳tanjjj",
      "plate_name":"学习版块",
      "update_time":"1029-12-21",
      "comment_num|1-500":20,
      "click_num|1-50":20,
      "is_top":0,
      "update_time":"1029-12-21"
    }
  ]
```

# 18.根据文章ID查看文章详情

### 请求URL

http://localhost:8080/articles/articledetail/:articleid

### 请求方式

get

### 参数类型

| 参数      | 是否必须 | 类型 | 说明 |
| --------- | -------- | ---- | ---- |
| articleid | Y        | int  |      |

### 返回示例

```
{
    "id":3,
    "title": "如何使用ssm",
    "content":" 这个假期接触了网页前端的又一个利器，vue.js,它的主要特点在于对数据的双向绑",
    "nick_name": "大哥",
    "plate_name":"学习版块",
    "update_time":"1029-12-21",
    "comment_num":20,
    "comment_content":[
      {
      	"id":1, //评论的id
        "user_id":1,
        "nick_name":"tanj",
        "photo":"",
        "comment_type":2,
        "topic_id":1,
        "content":"这是tanj的评论tanj的评论"，
        "update_time":"2019-07-30 17:30:24"
      },
      {
      	"id":2,
        "user_id":2,
        "nick_name":"xiaohang",
        "photo":"",
        "comment_type":2,
        "topic_id":1,
        "content":"这是xiaohang的评论xiaohang的评论"，
        "update_time":"2019-07-30 17:30:24"
      },
      {
      	"id":3,
        "user_id":3,
        "nick_name":"zhang",
        "photo":"",
        "comment_type":2,
        "topic_id":1,
        "content":"这是zhang的评论zhang的评论"，
        "update_time":"2019-07-30 17:30:24"
      },
      {
      	"id":4,
        "user_id":4,
        "nick_name":"dage",
        "photo":"",
        "comment_type":2,
        "topic_id":1,
        "content":"这是dage的评论dage的评论"，
        "update_time":"2019-07-30 17:30:24"
      }
    ],
    "click_num":20,
    "is_top":1,
    "update_time":"1029-12-21"
  }
```

# 19.给某个文章添加评论

http://localhost:8080/articles/addcomment

### 请求方式

post

### 参数列表

| 参数                                                    | 是否必须 | 类型   | 说明                                             |
| ------------------------------------------------------- | -------- | ------ | ------------------------------------------------ |
| comment:{                                               |          |        |                                                  |
| topic_id                                                | Y        | int    | 文章的id                                         |
| comment_type                                            | Y        | int    | 评论的类型  1：给文章进行评论  2：回复评论的评论 |
| content                                                 | Y        | string | 评论的内容                                       |
| }（应不应该加上user_id,是前台传过去还是在后台获取？？） |          |        |                                                  |

### 返回示例

```
{
  status: 1,
  success: '评论成功'
}
```

# 20.根据文章的id删除文章

### 请求URL

http://localhost:8080/articles/deletearticle/:articleid

### 请求方式

get

### 参数列表

| 参数      | 是否必须 | 类型 | 说明     |
| --------- | -------- | ---- | -------- |
| articleid | Y        | int  | 文章的id |

### 返回示例

```
{
  status: 1,
  success: '删除文章成功',
}
```

# 21.批量删除所选的文章

### 请求URL

http://localhost:8080/articles/deletearticle/:articleids

### 请求方式

get

### 参数列表

| 参数       | 是否必须 | 类型 | 说明                         |
| ---------- | -------- | ---- | ---------------------------- |
| articleids | Y        | []   | 所有选中的文章的id组成的数组 |

### 返回示例

```
{
  status: 1,
  success: '批量删除文章信息成功',
}
```

# 22.根据评论的id删除评论

### 请求URL

http://localhost:8080/comments/deletecomment/:commentid

### 请求方式

get

### 参数列表

| 参数      | 是否必须 | 类型 | 说明     |
| --------- | -------- | ---- | -------- |
| commentid | Y        | int  | 评论的id |

### 返回示例

```
{
  status: 1,
  success: '删除评论信息成功',
}
```

# 评论

# 23.搜索评论

### 请求URL

http://localhost:8080/comments/searchcomment

### 示例

http://localhost:8080/comments/searchcomment?startTime=2019-08-22&endTime=2019-09-17&commentContent=sd&pageNum=1

### 请求方式

get

### 参数类型 query

| 参数           | 是否必须 | 类型   | 说明                                   |
| -------------- | -------- | ------ | -------------------------------------- |
| startTime      | N        | string | 前端控制开始时间和结束时间必须同时输入 |
| endTime        | N        | string |                                        |
| commentContent | N        | string |                                        |
| pageNum        | N        | int    |                                        |

### 返回示例

```
[
   {
      "id":1,
      "topic_id":1,
      "topic":"贪贪贪",
      "nick_name":"这是评论者",
      "content":"这是评论的内容",
      "comment_type":"1"
    }，
    {
    	......
    }
]
```

# 24.根据评论ID删除评论

### （前面有一个相同的，实现一个即可）

### 请求URL

http://localhost:8080/comments/deletecomment/:commentid

### 请求方式

get

### 参数列表

| 参数      | 类型 | 是否必须 | 说明     |
| --------- | ---- | -------- | -------- |
| commentid | int  | Y        | 评论的id |

### 返回示例

```
{
  status: 1,
  success: '版块批量删除成功',
}
```

# 25.批量删除评论

### 请求URL

http://localhost:8080/comments/deletecomments/:comment_ids

### 请求方式

get

### 参数列表

| 参数       | 是否必须 | 类型 | 说明             |
| ---------- | -------- | ---- | ---------------- |
| commentids | Y        | []   | 存储选中的版块id |

### 返回示例

```
{
  status: 1,
  success: '版块批量删除成功',
}
```

# 用户

# 26.搜索用户

### 请求URL

http://localhost:8080/users/searchuser

### 示例

http://localhost:8080/users/searchuser?role_name=&username=tanj&pageNum=1

### 请求方式

get

### 参数列表

| 参数      | 是否必须 | 类型   | 说明                         |
| --------- | -------- | ------ | ---------------------------- |
| role_name | N        | string | "普通用户"  "版主"  "管理员" |
| username  | N        | string | 根据用户名模糊查找           |
| pageNum   | N        | int    | 默认为1                      |

### 返回示例

```
[
  {
    "nick_name": "ddfdsf",
    "id": 1,
    "sex":"女",
    "email":"1232@123.com",
    "update_time":"1212-21-21",
    "signature":"我只是个传输",
    "integral":10,
    "role_name":"普通用户",
    "plate_id":1,
    "plate_name":"学习版块",
    "postNum|1-100":20
  },
  ......
 ]
```

# 27.添加用户

### 请求URL

http://localhost:8080/users/adduser

### 请求方式

post

### 参数列表

| 参数      | 是否必须 | 类型   | 说明       |
| --------- | -------- | ------ | ---------- |
| nick_name | Y        | string | 不允许重复 |
| password  | Y        | string |            |
| email     | N        | string |            |
| photo     | N        | string |            |
| signature | N        | string |            |
| integral  | N        | int    | 积分       |

### 返回示例

```
{
  status: 1,
  success: '添加版块信息成功',
}
```

# 28.修改用户信息

注意：系统管理员只能修改用户的身份和密码

### 请求URL

http://localhost:8080/users/edituserinfo/:userid

### 请求方式

post

### 参数列表

| 参数         | 是否必须 | 类型   | 说明                               |
| ------------ | -------- | ------ | ---------------------------------- |
| userid       | Y        | int    |                                    |
| edituserinfo | Y        | {}     | 包含下面几个属性                   |
| {            |          |        |                                    |
| role_name    | Y        | string | 用户角色：普通用户 版主 管理员     |
| plate_id     | Y        | int    | 如果为版主则是版块的id，否则为NULL |
| password     | N        | string | 修改的密码                         |
| }            |          |        |                                    |

### 返回示例

```
{
  status: 1,
  success: '修改成功'
}
```

# 29.根据用户ID查看用户信息

### 请求URL

http://localhost:8080/users/userdetail/:userid

### 示例



### 参数列表

| 参数   | 是否必须 | 类型 | 说明   |
| ------ | -------- | ---- | ------ |
| userid | Y        | int  | 用户id |

### 返回示例

```
 {
      "nick_name": "ddfdsf",
      "id": 1,
      "sex":"男",
      "email":"1232@123.com",
      "update_time":"1212-21-21",
      "signature":"我只是个传输",
      "integral":10,
      "role_name":"普通用户",
      "plate_id":1,
      "photo":"/img/photo.png"
      "plate_name":"学习版块",
      "postNum|1-100":20
    }
```

# 30.根据用户ID删除用户

### 请求URL

http://localhost:8080/users/deleteuser/:userid

### 示例

### 请求类型

get

### 参数列表

| 参数   | 是否必须 | 类型 | 说明 |
| ------ | -------- | ---- | ---- |
| userid | Y        | int  |      |

### 返回示例

```
{
  status: 1,
  success: '版块删除成功',
}
```

# 31.批量删除用户

### 请求URL

http://localhost:8080/users/deleteuser/:userids

### 请求方式

get

### 参数列表

| 参数    | 是否必须 | 类型 | 说明                       |
| ------- | -------- | ---- | -------------------------- |
| userids | Y        | []   | 所选择的用户的id组成的数组 |

### 返回示例

```
{
  status: 1,
  success: '版块删除成功',
}
```

# 版主

# 32.根据版主id返回所管理的版块列表

如果是版主 则返回他对应的那个版块的情况

### 请求URL

http://localhost:8080/plates/plateUserPlateList

### 示例

http://localhost:8080/plates/plateUserPlateList?userid=1

### 请求方式

get

### 参数类型

| 参数    | 是否必须 | 类型 | 说明     |
| ------- | -------- | ---- | -------- |
| user_id | Y        | int  | 用户的id |

### 返回示例

```
[
	{
        "plate_name": "学习"，
        "id": 2，
        "description":"这里是讨论学习的地方"，
        "moderator_name":"123"，
        "update_time":"1029-12-21"，
        "postNum":20，
	}
]
```

# 33.根据版主id返回所管理的文章列表

如果是版主 则返回他对应的那个版块的所有文章情况

### 请求URL

http://localhost:8080/articles/plateUserArticleList

### 示例

http://localhost:8080/articles/plateUserArticleList?userid=1&pageNum=1

### 请求方式

get

### 参数类型

| 参数    | 是否必须 | 类型 | 说明     |
| ------- | -------- | ---- | -------- |
| user_id | Y        | int  | 用户的id |
| pageNum | Y        | int  |          |

### 返回示例

```
[
  {
    "id":1,
    "is_top":0,
    "title": "如何使用mockjs"，
    "nick_name": "谭佳"，
   	"plate_name":"学习版块"，
   	"update_time":"1029-12-21"，
   	"comment_num":20，
   	"click_num":20，
   	"update_time":"1029-12-21"
  }
]
```

# 34.根据版主id返回所管理的评论列表

如果是版主 则返回他对应的那个版块的所有文章的所有评论情况

### 请求URL

http://localhost:8080/comments/plateUserCommontList

### 示例

http://localhost:8080/comments/plateUserCommontList?userid=1&pageNum=1

### 请求方式

get

### 参数类型

| 参数    | 是否必须 | 类型 | 说明     |
| ------- | -------- | ---- | -------- |
| user_id | Y        | int  | 用户的id |
| pageNum | Y        | int  |          |

### 返回示例

```
[
	{
	  "id":1,
	  "topic_id":1,
      "topic":"这是文章的标题",
      "nick_name":"这是评论者",
      "content":"这是评论的内容",
      "comment_type":1,//1:对文章的评论，2：对评论的回复
    }
]
```

