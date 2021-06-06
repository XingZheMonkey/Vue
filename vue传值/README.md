# provide  和  inject 使用

> provide：是一个对象，或者是一个返回对象的函数。里面呢就包含要给子孙后代的东西，也就是属性和属性值。注意：子孙层的provide会掩盖祖父层provide中相同key的属性值

> inject：一个字符串数组，或者是一个对象。属性值可以是一个对象，包含from和default默认值
> from是在可用的注入内容中搜索用的 key (字符串或 Symbol)，意思就是祖父多层provide提供了很多数据，from属性指定取哪一个key;default指定默认值

> provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中

> *** provide与inject传值时,provide传递的值,如果不是引用类型,就不会响应变化

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>provide + inject</title>
  <script src="https://cdn.bootcss.com/vue/2.6.11/vue.min.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
</html>

<script>
  Vue.component('A', {
    template: `
      <div>
        <B></B>
      </div>
    `,
    provide: {
      msg: '1234124'
    }
  })
  Vue.component('B', {
    template: `
      <div>
        <label>B:</label>
        <span>{{ this.msg }}</span>
        <C></C>
      </div>
    `,
    provide: {
      msg: '42341234',
      name: 'asdasda'
    },
    inject: ['msg'],
  })

  Vue.component('C', {
    template: `
      <div>
        <label>C:</label>
        <span>{{ this.xingming }}</span>
        <span>{{ this.msg }}</span>
      </div>
    `,
    inject: {
      xingming: {
        from: 'name',
        default: ''
      },
      msg: {
        from: 'msg',
        default: ''
      }
    },
    data() {
      return {
      }
    },
  })
  var app=new Vue({
    el: '#app',
    template: `
      <div>
        <A />
      </div>
    `
  });
</script>


/* output : 

    B: 1234124
    
    C: 42341234 asdasda
*/
```


# this.$attrs  和  this.$listeners

> 父级传递属性给 子级，子级通过 v-bind = "$attrs" 传递给孙子
