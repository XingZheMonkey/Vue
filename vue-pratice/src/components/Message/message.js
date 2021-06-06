import Vue from "vue"

/**
 * 
 * @param {Component} Component 要创建的组件
 * @param {*} props 向组件内部传递的参数
 * @returns 返回一个 生成好的组件
 * 
 * @param isRemove 是否已销毁的标识
 */

function create(Component, props) {
    const vm = new Vue({
        render(h) {
            return h(Component, {
                props
            })
        }
    }).$mount()

    document.body.appendChild(vm.$el)

    const comp = vm.$children[0]

    // 设置标识，避免函数反复执行，同一个Vue实例，remove操作应该只执行一次
    let isRemove
    comp.remove = function () {
        if(!isRemove){
            document.body.removeChild(vm.$el)
            vm.$destroy();
            isRemove = true
        }
    }

    return comp
}

/**
 * 
 * @param {function} fn 
 * @returns 
 * 利用 闭包 和 函数柯里化 以及 函数缓存 实现弹窗的单例模式
 */
function generate(fn) {
    // 设置一个缓存变量，用来存储已创建的组件
    let cache

    return function (Component, props) {
        // 如果缓存为空，正常创建组件
        if (!cache) {
            cache = fn(Component, props)
            return cache;
        } else {
            // 如果缓存不为空，删除缓存中的组件，再创建新组件，以保持单例
            cache.remove();
            cache = fn(Component, props);
            return cache
        }
    }
}

Vue.prototype.$generate = generate(create);



