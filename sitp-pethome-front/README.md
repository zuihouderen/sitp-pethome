# 基于vue的宠物系统
>从零构建vue + vue-router + vuex，实现基本的系统功能

## 技术栈
vue + element + axios + node.js + mysql

## 项目结构
```
 |——— public
 |——— src
	|——— api           #封装axios拦截
	|——— assets        #静态资源文件
	|——— common        #公用组件
	|——— components    #页面
	|——— plugins	   #插件
	|——— router        #路由
	|——— store         #vuex
	|——— App.vue       #根
	|——— main.js       #入口
|——— babel.config.js
|——— package-lock.json
|——— package.json      #依赖
|——— README.md
|——— vue.config.js     #配置
```

## 完成功能
```
- 登录
- 路由守卫
- 请求拦截和响应拦截
- token本地存储
- vuex存储
- 数据分页和查询
- 上传图片
- 宠物日志
- 宠物知识
- 区域推荐
```


## 项目运行
```
npm install

npm run serve
```


