# vue-router 实现原理

1. 调用方式分析

    + Vue.use(vueRouter) ==》 维护一个install方法

    + new VueRouter(arg) ==》 创建一个实例对象

2. 实现过程

    + 借用 vue 的响应式，利用 data 托管当前浏览器的 当前路由路径

    ```js
    this.app = new Vue({
        data() {
            return {
                current: "/"
            }
        }
    })
    ```

    + 通过监听 hashchange 方法 改变实例中维护的 当前路由路径

    ```js
    bindEvents() {
        window.addEventListener("load", this.onhashChange.bind(this))
        window.addEventListener("hashchange", this.onhashChange.bind(this))
    }
    onhashChange() {
        this.app.current = window.location.hash.slice(1) || '/'
    }
    ```

    + 解析路由配置, 形成 路径 与 对应组件 的映射

    ```js
    createRouteMap(options) {
        options.routes.forEach(item => {
            // 让路径和组件产生映射关系
            this.routeMap[item.path] = item.component;
        })
    }
    ```

    + 创建 router-link 组件 与 router-view 组件

    ```js
    initComponent() {
        Vue.component('router-link', {
            props: {
                to: String
            },
            // *** 此时的 this 指向 当前component
            render(h) {
                // 生成一个 a 标签，传入 href 为 to
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                    // <router-link to="/"> 点击 </router-link>  this.$slots.default 获取的内容为标签中的文字, render的第三个参数是设置子节点
                }, [this.$slots.default])
            },
        })

        Vue.component('router-view', {
            // *** 此处使用箭头函数纠正this指向，此时的 this 指向是 vue-router
            render: (h) => {
                // 通过形成的映射关系寻找当前路径对应的component,并渲染
                const com = this.routeMap[this.app.current];
                return h(com)
            },
        })
    }
    ```

    + 创建 install 方法

    ```js
    VueRouter.install = function () {
        Vue.mixin({
            beforeCreate() {
                // 此处的this是vue实例
                if (this.$options.router) {
                    Vue.prototype.$router = this.$options.router;
                    this.$options.router.init()
                }
            },
        })
    }
    ```

3. 过程梳理

> 创建 vueRouter 实例，内部维护一个 $options，一个 routeMap ,一个 由vue代理的响应式 当前路径

> 创建 响应式数据，代理当前浏览器路径

> 监听 hashChange 方法，改变当前 路由路径

> 解析路由表，形成映射

> 创建 router-link 组件，接收参数 to ；router-link 负责渲染一个 a 标签，将 to 传入 href中用来切换路由，将 this.$slot.default 渲染到 router-link 的children中，用来做 text

> 创建 router-view 组件，通过形成的映射关系寻找当前路径对应的component,并渲染



# react-router-dom 实现原理

1. 创建 BrowserRouter 组件

    + 创建 state状态 管理 当前浏览器路由路径 location

    + 监听url变化，路径发生改变时，通过 setState 改变 当前路由路径 location

    + 返回一个上下文对象，将 history 与 location 传递给子组件 route

    ```js
    class BrowerRouter extends Component{
        constructor(props){
            super(props);
        }

        // 创建history对象
        this.history = createBrowerHistory(this.props);

        // 创建状态管理location
        this.state = {
            location: this.history.location
        }

        // 监听路由变化
        this.history.listen(location=>{
            this.setState({location})
        })

        componentWillUnmount(){
            if(this.unlisten){
                this.unlisten();
            }
        }

        render(){
            return (
                <RouteContext.Provider>
                    value={{
                        history:this.history,
                        location:this.state.location
                    }}
                    children={this.props.children}
                <RouteContext.Provider/>
            )
        }
    }
    ```

2. 创建 Route 组件 

    + 通过消费上下文，接收到 BrowserRouter 传递的 history 与 location

    + 匹配 path 与 location, 若匹配则对当前 Route 执行渲染操作

    + 接收的渲染属性 可能是 children component render

        - 传递 component，则通过 React.createElement(component) 渲染对应组件到页面上

        - 传递 render，则 直接调用 render 方法

        - 传递 children，则调用children 直接渲染；children的优先级最高，并且无论 path 是否与 location匹配，都会渲染
    

3. 创建 Link 组件

    + 通过消费上下文，接收到 BrowserRouter 传递的 history 与 location

    + 渲染一个 a 标签,用来切换路由，并向 history 的历史记录中添加记录

    + 通过 history.push(this.props.to) 方法更改浏览器路径
    

    ```js
    class Link extends component{
        handleClick(e,history){
            e.preventDefault();
            history.push(this.props.to)
        }

        render(){
            const {to,...rest} = this.props;

            return (
                <RouteContext.consumer>
                    {
                        context=>{
                            return (
                                <a
                                    {...rest}
                                    onClick = {e=>this.handleClick(e,context.history)}
                                    href={to}
                                >
                                {this.props.children}
                                </a>
                            )
                        }
                    }
                </RouteContext.consumer>
            )
        }
    }
    ```

# vuex 实现原理

1. 调用方式分析 

    + Vue.use(Vuex) ==》 维护一个install方法

    + new Vuex.Store({})) ==》 创建一个实例对象

2. 实现过程

    + 借用 vue 的响应式，利用 data 维护一个 state; 维护其他传入的对象

    ```js
    class Store {
        constructor(options) {
            this.state = new Vue({
                data: options.state
            })

            options.mutations && (this.mutations = options.mutations);

            options.actions && (this.actions = options.actions);

            options.getters && this.hanleGetters(options.getters);
        }
    }
    ```

    + 声明一个commit方法，用于 调用mutations改变 state; coomit 接收两个参数（type，arg）

    ```js
    commit = (type, arg) => {
        this.mutations[type](this.state, arg)
    }
    ```

    + 声明一个 dispath 方法，用于调用异步 actions

    ```js
    dispatch(type,arg){
        this.actions[type]({commit:this.commit,state:this.state},arg)
    }
    ```

    + 声明一个只读的 getters

    ```js
    hanleGetters(getters){
        this.getters = {}
        Object.keys(getters).forEach(key=>{
            // 不写入set方法，使 getters 内容不可更改
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return getters[key](this.state)
                }
            })
        })
    }
    ```

    + 创建 install 方法

    ```js
    function install(_vue) {
        Vue = _vue;
        Vue.mixin({
            beforeCreate() {
                if (this.$options.store) {
                    Vue.prototype.$store = this.$options.store;
                }
            },
        })
    }
    ```

3. 过程梳理

> 创建 Vuex 实例，内部维护一个 响应式state，根据传入的类型区分是否维护 mutations 和 actions 与 getters

> 暴露一个commit方法，用于根据传入的 type 调用相应的 mumations

> 暴露一个dispath方法，用于根据传入的 type 调用相应的 actions

> 暴露一个只读的 getters


# redux 实现原理

```js
export function createStore(reducer){
    let currentState = undefined;
    let currentListener = [];

    function getState(){
        return currentState;
    }

    function dispath(action){
        currentState = reducer(currentSatte,action);
        currentListeners.forEach(v=>v());
        return action;
    }

    function subscribe(cb){
        currentListeners.push(cb);
    }

    // 初始化 state
    dispatch({type:'@IMOOC/monkey-REDUX'});

    return {
        getState,dispatch,subscribe
    }
}
```

