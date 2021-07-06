1. function Vue(options) 函数内部调用 **this._init(options)**

2. initMixin(Vue) 函数内部执行 **Vue.prototype._init = function(options) {}**
    
    > const vm = this;

    1. initLifecycle(vm)

        + 初始化 $parent,$root,$children,$refs

    2. initEvents(vm)

    3. initRender(vm)

        + 初始化 $slot,$scopedSlots并赋值

        + 初始化render函数，_c 与 $createElement

        + 对 attrs 与 listeners进行响应化

    4. callHook(vm,'beforeCreate')

    5. initInjections(vm)

    6. initState(vm)

        1. 初始化 所有属性 **initProps**

        2. 初始化函数 **initMethods**

        3. 数据响应式 **initData**

        4. 初始化计算属性 **initComputed**

        5. 初始化 watch **initWatch**

    7. initProvide(vm)

    8. callHook(vm,'created') 

3. stateMixin(Vue)

    1. 定义 $data,$props两个实例属性 和 $set,$delete,$watch三个实例方法

4. eventsMixin(Vue)

    1. 实现事件相关实例Api：$on,$emit,$off,$once

5. lifecycleMixin(Vue)

    1. 实现组件生命周期的三个核心Api：_update,$forceUpdate,$destory

    2. 实现 _update 函数，组件更新就会被调用

    3. _update 函数中 有初始化 $el 的操作, **vm.$el = vm.__patch__(vm.$el,vNode,hydrating,false)**

    4. _update 函数中 有更新 $el 的操作, **vm.$el = vm.__patch__(prevvNode,vnode)**

6. renderMixin(Vue)

    1. 初始化 nexttick，_render

7. mountComponent
