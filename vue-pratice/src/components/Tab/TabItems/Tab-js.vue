<template>
  <div>
    <!-- <markdown theme="dark" :isPreview="false" v-model="str"></markdown> -->
    <h4>1. 图片懒加载</h4>
    <h4>2. 按需加载html内容</h4>
    <pre>

        &lt;script id="hide" type="text/x-template"&gt;
            内容
        &lt;script&gt;
    </pre>

    <h4>3. 利用textarea实现按需加载整个页面</h4>

    <h4>4. 事件委托和事件冒泡</h4>
    <pre>

        事件委托 ：利用父极的事件控制子级，减少功能函数的数量
        <code>
            /**
            * 
            * @param {String} el  父级元素的选择器
            * @param {String} type  事件类型
            * @param {Function} fn  回调函数
            * @param {String} selector 代理的子级对象，只有触发父级下的此类元素才会触发回调函数
            */

            export function addEventListener(el,type,fn,selector) {
                if(typeof el === 'string'){
                    el = document.querySelector(el)
                }

                if(!selector){
                    el.addEventListener(type,fn)
                }else{
                    el.addEventListener(type,function(e) {
                        const target = e.target;

                        if(target.matches(selector)){
                            fn.call(target,e)
                        }
                    })
                }
            }
        </code>

        事件冒泡 : 通过子级的事件触发父级
    </pre>

    <h4>5. 函数缓存: 解决同参数的函数反复执行，给定返回值，用内存换取性能</h4>
    <pre>
        <code>
            // 一个求和操作如果多次执行同样的操作，可以利用缓存，避免函数内容执行
            function add(num) {
                let result = 0;

                if(!add.cache){
                    add.cache = {}
                }else if (add.cache[num] != null){
                    return add.cache[num]
                }

                for(let i = 0;i &lt; num;i++){
                    result += i
                }

                add.cache[num] = result

                return result
            }

            console.log(add(10))
            console.log(add(10))
        </code>
    </pre>

    <h4>6. 惰性载入函数 (避免函数内的操作多次执行)</h4>

    <pre>
        <code>
            // 示例：判断浏览器类型，并根据浏览器类型分配各自的Dom2级事件方法
            // 目的：只判断一次浏览器类型，而不是每一次事件触发都去判断

            var addEvent = (function () {
                if (document.addEventListener) {
                    return function (type, element, fun) {
                        element.addEventListener(type, fun, false);
                    }
                }
                else if (document.attachEvent) {
                    return function (type, element, fun) {
                        element.attachEvent('on' + type, fun);
                    }
                }
                else {
                    return function (type, element, fun) {
                        element['on' + type] = fun;
                    }
                }
            })();
        </code>
    </pre>

    <h4>7. 函数柯里化 </h4>
    <pre>

        指的是将一个接受多个参数的函数变为 接受一个参数返回一个函数 的固定形式，这样便于再次调用，例如f(1)(2)
        <code>  
        示例：实现参数的复用，以下示例复用了参数 Number
        const isNumber =  curry('Number');
        isNumber(3)
        isNumber(4)
        </code>
    </pre>

    <h4>8. 函数防抖</h4>
    <pre>

        延迟要执行的动作，若在延迟的这段时间内再次触发了，则取消之前开启的操作，重新计时

        举例：电脑误操作1分钟后会进入休眠，当第40秒时鼠标移动了一下，重新计时一分钟

        应用：搜索时等用户完整输入内容后再发送查询请求

        <code>
            let input = document.getElementByID("user_input")
            let id 
            input.addEventListener("keyup",()=>{
                let data  = input.value
                clearTimeout(id)
                id = setTimeout(()=>{
                    console.log("搜索执行")
                }，2000)
            })
        </code>
    </pre>

    <h4>9. 函数节流</h4>
    <pre>

        限制一个函数在一定时间内只能执行一次

        应用：懒加载，滚动加载，防止高频点击提交，防止表单重复提交

        函数节流是指一定时间内js方法只执行一次；函数防抖是指在频繁触发的情况下，有足够的空闲时间，才执行一次

        <code>
            let body = document.getElementsByTagName("body")[0]
            let flag = true
            body.onscroll = ()=>{
                if(flag){
                    console.log(1)
                    flag = false
                    setTimeout(()=>{
                        flag = true
                    },2000)
                }
            }
        </code>
    </pre>
  </div>
</template>

<script>
// import markdown from "vue-meditor"
export default {
  name:"Tab-js",
  data() {
    return {
      str: "",
    };
  },
  methods: {},
};
</script>

<style lang="less">
    .blackTheme pre{
        background-color: #393939;
        color:white;
    }
    .whiteTheme pre{
        background-color: #f6f8fa;
    }
    pre{
        white-space: break-spaces;
        line-height: 2;
        font-size: 16px;
        &:last-child{
            margin: 0;
        }
    }
</style>
