# vue 底层原理

## 虚拟Dom生成

>  template编译成 AST 语法树 -> 再转换为 render 函数 最终返回一个VNode

```js

// 简单函数
function square(n) {
    return n * n;
}
 
// 转换后的AST
{
   type: "FunctionDeclaration",
   id: {
       type: "Identifier",
       name: "square"
   },
   params: [
      {
        type: "Identifier",
        name: "n"
      }
   ],
   ...
}
```

```js
 const template = `<div id="box" class="container"> <img :src="imgUrl"/> </div>`

 // compile 编译后

 with(this){
    return _c('div',{staticClass:'container',attrs:{id:'box'}},
        [_c('img',{attrs:{src:imgUrl}}
    )])
 }
```

```js
 const template = `<div>
                    <p v-if="flag == 'true'">A</p>
                    <p v-else>B</p>
                </div>`

// complie 编译后
 with(this){
     return _c('div',
        [(flag == 'a') ? 
            _c('p',[_v("A")]) : 
            _c('p',[_v("B")])
        ]
     )
 }
```

```js
const template = `<input v-model="name"></input>`

// complie 编译后
with(this){
    return _c('input',
        {directives:[{name:'model',rawName:'v-model',value:(name),expression:'name'}],
         attrs:{"type":'text'},domProps:{'value':(name),on:{'input':function($event){
             if($event.target.composing) return name = $event.target.value
         }}}
        }
    )
}
```

## 初次渲染的过程

1. 解析模板为render函数 

2. 触发响应式，为 data 设置 getter 和 setter 

3. 执行 render 函数，生成 vnode  

4. patch(ele,vnode) 生成真实 dom 

## 更新过程

1. 修改 data, 触发 setter

2. 重新执行render函数，生成 newVnode

3. patch(vnode,newVnode) 执行 diff 算法，对比新老虚拟 dom

## 异步渲染

1. 汇总 data 的修改，一次性更新视图

2. 减少 dom 操作，提高性能


## 响应式原理

1. 通过递归遍历，把vue实例中data里面定义的数据，用defineReactive（Object.defineProperty）重新定义

2. 每个数据内新建一个 Dep 实例，闭包中包含了这个 Dep 类的实例，用来收集 Watcher 对象

3. 在对象被「读」的时候，会触发 reactiveGetter 函数把当前的 Watcher 对象（存放在 Dep.target 中）收集到 Dep 类中去

4. 之后如果当该对象被「写」的时候，则会触发 reactiveSetter 方法，通知 Dep 类调用 notify 来触发所有 Watcher 对象的 update 方法更新

5. vue2的 Watcher 是基于组件的，最后更新时再通过diff算法实现更新(vue1就是watcher太多)



## 整体梳理

1. 在 new Vue() 之后。 Vue 会调用 _init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等

2. 模板编译：使用vue template complier（compile编译可以分成 parse、optimize 与 generate 三个阶段），将模板编译成render函数，执行render函数后，变成vnode

    + parse：parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST，就是with语法的过程

    + optimize：optimize 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，后面当 update更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能

    + generate：generate 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串

    + 在经历过 parse、optimize 与 generate 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function 了

3. 数据劫持，依赖收集

    + 首先会进行响应式初始化，也即是开始前的init过程，通过observer (value) 方法，然后通过defineReactive()方法遍历，对每个对象的每个属性进行setter和getter初始化。

    + 依赖收集：我们在闭包中增加了一个 Dep 类的对象，用来收集 Watcher 对象。在对象被「读」的时候，会触发 reactiveGetter 函数把当前的 Watcher 对象，收集到 Dep 类中去。之后如果当该对象被「写」的时候，则会触发 reactiveSetter 方法，通知 Dep 类调用 notify 来触发所有 Watcher 对象的 update 方法更新对应视图

4. 生成虚拟dom：执行 render 函数，生成虚拟 dom

5. patch 生成真实dom

    + patch的核心就是diff算法，diff算法通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有o(n)，比较高效

6. 数据发生变化的时候，通过watcher观察者来知道数据发生变化，这时候调用更新渲染函数来打补丁




