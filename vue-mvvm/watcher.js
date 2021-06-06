// 发布订阅
class Dep {
    constructor() {
        this.subs = []; // 获取所有的 watcher
    }

    // 订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }

    // 发布
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}


// 观察者模式 (发布订阅) 
class Watcher {
    constructor(vm, expr, callback) {
        this.vm = vm;
        this.expr = expr;
        this.callback = callback;

        // 先存放一个老值
        this.oldValue = this.get()
    }
    get() {
        // 先把 本身实例挂载在 Dep 上, Dep实例上将携带 每个 watcher,后续将存放在 subs 内
        Dep.target = this;

        let value = CompileUtil.getVal(this.vm, this.expr);

        // 用完就释放掉
        Dep.target = null;
        return value;
    }
    update() { // 更新操作  数据发生变化后会执行观察者的 update 方法
        let newValue = CompileUtil.getVal(this.vm, this.expr);
        if (newValue !== this.oldValue) {
            this.callback(newValue);
        }
    }
}


// 数据劫持
class Observer {
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        if (data && typeof data == "object") {
            for (let key in data) {

                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(obj, key, value) {
        // 递归 key 对应的 value，检查是否仍是对象
        this.observe(value);

        // 给每个属性 都增加一个发布订阅的功能
        let dep = new Dep();

        // 数据劫持
        Object.defineProperty(obj, key, {
            get() {
                // 创建watcher时，会取到对应的内容，并且把 watcher 放在全局上 
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: (newValue) => {
                if (newValue != value) {

                    // 检查传过来的是否是对象
                    this.observe(newValue);

                    value = newValue;

                    // 发布
                    dep.notify();
                }
            }
        })
    }
}


/**
 * Object.defineProperty的一些问题
 * 递归遍历所有的对象的属性，这样如果我们数据层级比较深的话，是一件很耗费性能的事情
 * 只能应用在对象上，不能用于数组(重写了数组的方法，当调用数组方法时会触发更新，也会对数组中的每一项进行监控)
 * 只能够监听定义时的属性，不能监听新加的属性，这也就是为什么在vue中要使用Vue.set的原因，删除也是同理
 */

/**
 * Object.defineProperty的问题在于，只能够作用在对象上，那么vue中，对数组是怎么实现数据劫持的呢？ 只需要修改数组的原型方法，往这些方法里添加一些视图渲染的操作。
 */

/*  
        const oldArrayProperty = Array.prototype;
        const newArrayProperty = Object.create(oldArrayProperty);
        ['pop', 'push', 'shift', 'unshift', 'splice'].forEach((method) => {
            newArrayProperty[method] = function() {
                renderView();
                oldArrayProperty[method].call(this, ...arguments);
            };
        });
        // 在observer函数中加入数组的判断，如果传入的是数组，则改变数组的原型对象为我们修改过后的原型。
        if (Array.isArray(target)) {
            target.__proto__ = newArrayProperty;
        }
*/


/**
  * vue3.0 通过proxy劫持数据
  
    let data = {
        name:{name:'hhh'},
        arr: ['吃','喝','玩']
    }
    //proxy兼容性差 可以代理13种方法 get set
    //defineProperty 只对特定 的属性进行拦截 

    let handler = {
        get (target,key) { //target就是obj key就是要取obj里面的哪个属性
            console.log('收集依赖')
            return target[key]
        },
        set (target,key,value) {
            console.log('触发更新')
            target[key] = value
        }
    }

    data = new Proxy(data,handler)
    //通过代理后的对象取值和设置值
 */





/**
    let obj = {
        data:{
            a:1,
            b:2,
            c:3
        }
    }

    function test(obj){
        if(typeof obj == "object"){
            for(let key in obj){
                defineReactive(obj,key,obj[key])
            }
        }
    }

    function defineReactive(data,key,value){
        test(value)

        Object.defineProperty(data,key,{
            get(){
                return value
            },
            set(val){
                if(val !== value){
                    document.write(9)
                    value = val
                }
                
            }
        })
    }

    test(obj)
 */