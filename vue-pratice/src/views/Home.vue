<template>
  <div class="home">
    <div class="item">
      <div class="group">
        <div class="title">项目描述：</div>
        <ul>
          <li>
            前端采用VUE，后端采用nodejs实现网站整体架构；
          </li>  
          <li>
            使用jwt实现鉴权，利用前端路由实现权限控制，admin 账号可以管理用户，分配权限；
          </li>
        </ul>
        <div class="title">主要技术：</div>
        <ul>
          <li >前端：vue / vuex / vue-router / less / webpack / axios</li>
          <li>
            后端：nodejs / koa / jwt / crypto / nodemailer / oAuth / mongoDB
          </li>
        </ul>
      </div>

      <div class="group">
        <div class="title">组件化：</div>
        <ul>
          <li>Dropdown 组件</li>
          <li>Message 弹窗组件 （函数缓存，函数柯里化）</li>
          <li>Tab切换组件 （keep-alive）</li>
          <li>Icon 组件 （svg-sprite实现ui库）</li>
          <li>侧边导航栏（递归树形控件）</li>
        </ul>
      </div>

      <div class="group">
        <div class="title">功能模块</div>
        <ul>
          <li>登录/注册模块（jwt，bcrypt）</li>
          <li>github第三方登录（oAuth）</li>
          <li>找回密码模块（nodemailer邮件服务，crypto非对称加密）</li>
          <li>侧边导航栏（路由权限控制，vuex持久化）</li>
          <li>面包屑导航模块</li>
          <li>黑白主题切换功能（vuex持久化）</li>
          <li>用户管理功能（Admin权限）</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.home {
  padding: 10px 20px;
  .item {
    .title {
      font-size: 24px;
      margin-bottom: 12px;
      margin-top: 10px;
    }
    .group {
      margin-bottom: 16px;
    }
    ul {
      padding-left: 36px;
      width: 70%;
      li {
        padding: 6px;
        border: 1px solid #e6e6e6;
        background: #e9eef3;
        color: #333;
      }
    }
  }
}
</style>