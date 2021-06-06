import Vue from "vue"

/**
 * hashchange ==> 路径变化 ==> 触发data中的current变化 ==> 响应式触发视图刷新
 * 
 * hashchange 监听路径变化，并触发 onhashchange 方法
 * onhashchange 方法 将当前路径赋值给 vue代理 的data对象
 * vue的data是响应式，data的改变会导致视图的刷新
 */


export class VueRouter {
    constructor(options) {
        this.$options = options;
        this.routeMap = {}

        // 利用vue实例托管当前路径,借用vue的响应式实现路由响应式
        this.app = new Vue({
            data() {
                return {
                    current: "/"
                }
            }
        })
    }
    init() {
        this.bindEvents(); // 绑定事件
        this.createRouteMap(this.$options); // 解析路由配置
        this.initComponent(); // 实现 router-link 和 router-view 两个组件
    }

    bindEvents() {
        window.addEventListener("load", this.onhashChange.bind(this))
        window.addEventListener("hashchange", this.onhashChange.bind(this))
    }
    onhashChange() {
        this.app.current = window.location.hash.slice(1) || '/'
    }

    createRouteMap(options) {
        options.routes.forEach(item => {
            // 让路径和组件产生映射关系
            this.routeMap[item.path] = item.component;
        })
    }

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
}

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
