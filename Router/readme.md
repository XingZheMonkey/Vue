# hash 和 history

## hash

1. url 中有一个 #，但是 # 只是 浏览器端/客户端的状态，不会传输给服务器

    https://www.baidu.com#user ==>  https://www.baidu.com
    https://www.baidu.com#list/1 ==> https://www.baidu.com

2. hash 值的改变，不会导致页面的刷新

    location.hash = '#aaa'  ==> location.hash = '#bbb' 从 aaa 到 bbb 页面是不会刷新的

3. hash值的改变会在浏览器的访问记录中添加一条记录，因此我们可以通过浏览器的返回前进按钮进行操作

4. hash值的改变会触发 hashchange 事件

    window.addEventListener('hashchange',()=>{})

5. 更改hash的两种方式
    
    + location.hash = ''

    + a 标签的跳转

## history

1. html5 新api

```
    window.history.back()
    window.history.forward()
    window.history.go(-2)
    window.history.pushState(null,null,path)
    window.history.replaceState(null,null,path)
```
> pushState 页面浏览器记录里添加一个历史记录
> replaceState 替换当前的记录

2. pushState / replaceState 的参数

    + state 一个对象，是一个与指定网址相关的对象，当 popState事件触发的时候，该对象会传入回调函数

    + title  新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null

    + url  新的网址，必须与当前页面处在同一个域,浏览器的地址栏将显示这个网址

3. popState事件触发

> 仅仅调用pushState方法或replaceState方法 ，并不会触发该事件。只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用 back、forward、go 方法时才会触发
> 另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发