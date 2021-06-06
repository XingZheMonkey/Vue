# 父级 -> 子级

1. 先在父组件中绑定自定义的属性

2. 在子组件中用props接受传递过来的值

3. 注意:

    传值: string number boolean
	注意：传值不会改变父级中数据的值，触发更改只会改变当前组件的值

	引用: array object
	注意：传引用会改变父级中数据的值，即在一个组件内改变，则会改变所有调用此数据组件内的值，类似于c语言中的传址



4. 第二种方法

    this.$attrs 获取绑定属性
    this.$listener 获取绑定方法


5. 第三种方法

    inject(default:) provide


```
Vue.component('parent',{
    data(){
        return {
            msg:"我是父子件的数据"
        }
    },
    template:`
        <div>
            <p>我是父组件</p>
            <child :passData="msg"/>
        </div>
    `,
    components:{
        child
    }
})
```

```
Vue.compoment('child',{
    template:`
        <div>
            <p>我是子组件</p>
            <input v-model="passData">
        </div>
    `,
    props:[
        'passData'
    ]
})
```

# 子级 -> 父级

1. 在子级中注册一个事件 this.$emit("事件名",value)

2. 在父级中绑定事件  @事件名="事件($event)"  事件(args){...}

# 非父子关系 （兄弟间传值）

1. 新建一个Vue实例对象，用来挂载自定义事件，vue实例携带 $on 和 $emit 方法

2. 在某一个组件的mounted生命周期中自定义一个事件
```
methods:{
   realHandler(args){
   	console.log("兄弟之间通信",args)
   }
},
mounted(){
   event.$on("addHandler",this.realHandler)
},
beforeDestory(){
  // 在组件销毁前及时解绑，否则可能造成内存泄漏
  event.$off("addHandler",this.realHandler)
}
```

3. 在兄弟组件中调用 
```
<button @click="addItem"></button>

methods:{
  addItem(){
    event.$emit("addHandler",this.title)
  }
}
```


# 插槽
 
说明 : 内置组件slot，作为承载分发内容的出口

注意 : 使用 v-bind 时是绑定data中数据，而下面直接写type是固定的值，       不影响传值效果 

```
Vue.component('parent',{
    template:`
        <div>
            <p>我是父组件</p>
            <btn type="primary">登录</btn>
            <btn type="success">注册</btn>
        </div>
    `,
    components:{
        btn
    }
})
```

```
Vue.component('btn',{
    template:`
        <div>
            <button :class="type">
                <slot></slot>
            </button>
        </div>
    `,
    props:[
        type
    ]
})
```
