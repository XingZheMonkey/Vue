/**
 * hash 路由实现
 * 关键点：hashchange方法
 */

class BaseRouter{
    constructor(){
        this.routes = {}
        this.refresh = this.refresh.bind(this)
        window.addEventListener('load',this.refresh)
        window.addEventListener('hashchange',this.refresh)
    }

    route(path,callback){
        this.routes[path] = callback || function(){}
    }

    refresh(){
        const path = `/${location.hash.slice(1) || ''}`
        this.routes[path]()
    }
}

const body = document.querySelector('body')

function changeColor(color){
    body.style.backgroundColor = color
}

const Router = new BaseRouter()

Router.route("/",function(){
    changeColor('white')
})

Router.route("/green",function(){
    changeColor('green')
})

Router.route("/orange",function(){
    changeColor('orange')
})