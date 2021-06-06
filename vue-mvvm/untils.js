// 策略模式
let CompileUtil = {
    
    getVal(vm,expr){
       
        return expr.split(".").reduce((data,current)=>{   // school.name  =>   [school,name]   =>  vm.$data  => vm.$data.school => vm.$data.school.name
            return data[current];
        },vm.$data)
    },
    setVal(vm,expr,value){
        expr.split(".").reduce((data,current,index,arr)=>{   // school.name  =>   [school,name]   =>  vm.$data  => vm.$data.school => vm.$data.school.name
            if(index == arr.length-1){
                return data[current] = value;
            }
            return data[current];
        },vm.$data)
    },
    // 监听事件
    on(node,expr,vm,eventName){
        console.log(vm,expr)
        node.addEventListener(eventName,(e)=>{
            vm[expr].call(vm,e);   // 矫正 this
        });
    },
    model(node,expr,vm){
        let fn  = this.updater["modelUpdater"];
        let value = this.getVal(vm,expr);

        // 为 带有指令的 dom 添加一个观察者
        new Watcher(vm,expr,(newValue)=>{
            fn(node,newValue)
        })

        // 反向监听，视图驱动数据，input输入的时候改变数据
        node.addEventListener("input",(e)=>{
            let value = e.target.value;
            this.setVal(vm,expr,value);
        })

        fn(node,value)
    },
    text(node,content,vm){
        let fn = this.updater["textUpdater"];
        let clearContent = content.trim();        // 去空格
        let realContent = clearContent.slice(2,clearContent.length - 2);  // 截取 {{}}中的内容
        let value = this.getVal(vm,realContent);

        // 为 每个 {{}} 语法 添加一个观察者
        new Watcher(vm,realContent,(newVal)=>{
            fn(node,newVal);
        })

        fn(node,value)
    },
    updater:{
        modelUpdater(node,value){
            node.value = value;
        },
        textUpdater(node,value){
            node.textContent = value;
        }
    }
}
