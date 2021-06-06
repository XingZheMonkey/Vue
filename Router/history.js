/**
 * history 路由实现方案
 * 关键点 ：pushState / replaceState / popState 
 */

class BaseRouter {
    constructor() {
        this.routes = {}
        this.init(location.pathname)
        this._bindPopState()
    }

    init(path) {
        window.history.replaceState({
            path
        }, null, path)

        this.routes[path] && this.routes[path]()
    }

    route(path,callback){
        this.routes[path] = callback || function(){}
    }

    go(path){
        window.history.pushState({path},null,path)

        this.routes[path] && this.routes[path]()
    }

    _bindPopState(){
        window.addEventListener('popstate',e=>{
            const path = e.state && e.state.path
            this.routes[path] && this.routes[path]()
        })
    }
}

const Router = new BaseRouter()

const body = document.querySelector('body')

function changeColor(color){
    body.style.backgroundColor = color
}

Router.route("/",function(){
    changeColor('white')
})

Router.route("/green",function(){
    changeColor('green')
})

Router.route("/orange",function(){
    changeColor('orange')
})

body.addEventListener('click',e=>{
    if(e.target.tagName = 'A'){
        e.preventDefault()
        Router.go(e.target.getAttribute('href'))
    }
})