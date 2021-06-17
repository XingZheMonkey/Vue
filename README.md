# 项目简介

## 项目背景

> 项目原型：IBM Innovation 项目 digital game；

>> 原始需求：Github第三方登录，管理员权限可编辑问题与答案；普通用户可参与答题；

>>> 原始 ui 库：Carbon UI




> 项目重构

>> 项目描述：沿用原有项目的思路，将所有 UI 库实现的内容重构为 手写组件封装，实现一个后台管理系统，用来记录 学习内容，类似博客系统

## 主要技术

1. 前端 ： vue / vuex / vue-router / less / webpack / axios / vuex-persistedstate

2. 后端 ：nodejs / koa / jwt / crypto / nodemailer / oAuth / mongoDB


## 组件化

1. Dropdown 组件, Input组件，Button 组件, select 组件

2. Message 弹窗组件 （函数缓存，函数柯里化）

3. Tab 切换组件 （keep-alive）

4. Icon 组件 （svg-sprite实现ui库）

5. 侧边导航栏（递归树形控件）

6. Modal 模态框组件（Vue.extend）

## 功能模块

1. 登录 / 注册模块（jwt，bcrypt）

2. github 第三方登录（oAuth）

3. 找回密码模块（nodemailer邮件服务，crypto非对称加密）

4. 侧边导航栏（路由权限控制，vuex 持久化）

5. 面包屑导航模块（ 路由 matched）

6. 黑白主题切换功能（vuex持久化）

7. 用户管理功能（Admin 权限）

8. 语言切换功能（i18n)
