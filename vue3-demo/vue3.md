# vue3 Api

## composition Api的优势

1. 可以将同一业务的代码放在一起，而不是分散到各个地方，更加灵活

2. 将相同业务的代码放在一起易于维护，类似于模块化思想，使用修改和删除都比较方便

3. vue3.0 实现了按需导入，更好的支持 tree shanking, 打包只需将引入的模块打包即可，其他未引入的模块会被删掉；

4. 自定义 hooks 使复用逻辑变得更加容易，mixin有很多弊端（代码不知从何处来，类型判断不准确，互相覆盖）

5. 更好的类型判断，对于函数来说，相同的输入有相同的输出；间接更好的支持了ts；


## 生命周期对比

```
    beforeCreate -> 使用setup()
    created -> 使用 setup()
    beforeMount -> onBeforeMount
    mounted -> onMounted
    beforeUpdate -> onBeforeUpdate
    updated -> onUpdated
    beforeDestroy -> onBeforeUnmount
    destroyed -> onUnmounted
    errorCaptured -> onErrorCaptured
```

## ref 和 reactive

1. ref()   

    + ref 这种写法简单，但只能监听一些如数字、字符串、布尔之类的简单数据

    + ref 修改数据需要通过 count.value = xxx 的形式 

    + ref 需要return出去

2. reactive({ })

    + reactive 适合创建复杂类型（递归深度响应式）

    + reactive 修改数据直接通过 data.key = xxx 的形式

    + reactive 需要通过 ...toRefs() 转化为响应式对象
    
    + 内部使用 proxy 实现数据劫持

3. 如果ref中传入对象，会被自动转为 reactive； ref({})



## shallowRef 与 shallowReactive

1. shadowReactive: 只为某个对象的私有（第一层）属性创建浅层的响应式代理，不会对“属性的属性”做深层次、递归地响应式代理，而只是保留原样

2. shallowRef: 创建一个 ref ，将会追踪它的 .value 更改操作，但是并不会对变更后的 .value 做响应式代理转换（即变更不会调用 reactive）



## readonly 与 shallowReadonly

1.shallowReadonly : 只为某个对象的自有（第一层）属性创建浅层的只读响应式代理，同样也不会做深层次、递归地代理，深层次的属性并不是只读的

2.readonly: 取得一个对象（反应性或普通）或ref并返回一个只读代理。访问的任何嵌套属性也将是只读的。

3.isReadonly,判断对象是否为只读对象


## toRaw 与 markRaw

> 有一些操作不需要更新UI界面,就可以用toRaw,节约性能,我们可以通过toRaw方法拿到它的原始数据，对原始数据进行修改,就不会更新UI界面

```js
import { reactive,toRaw} from 'vue'

 setup() {
     let obj = {name:'lsh',age:18};
     let state = reactive(obj)
     let obj2 = toRaw(state)

    console.log(obj === obj2) //true
}

// 当改变 obj2的属性值时，页面不会发生变化
```

```js
let obj = {name:'lsh',age:18};
obj = markRaw(obj)
let state = reactive(obj)

// 当更改state中的属性值时，页面不会发生变化
```

## watch 和 watchEffect 与 computed

1. watch

    +  具有一定的惰性lazy 第一次页面展示的时候不会执行，只有数据变化的时候才会执行

    +  参数可以拿到当前值和原始值

    +  可以侦听多个数据的变化，用一个侦听起承载
    
    + 与 vue2.0 的用法相同，可以设置第三个参数 deep，immediate  
   
   ```js
   const stop = watch(count,(newVal,oldVal)=>{
    
   })
   // 停止监视
   stop();
   ```
   
   ```js
   监听复杂类型需要传递一个函数的返回值
   watch(()=>data.list,(newVal,oldVal)=>{
    
   })
   ```
2. watchEffect
    
    + 立即执行，没有惰性，页面的首次加载就会执行

    + 自动检测内部代码，代码中有依赖 便会执行

    + 不需要传递要侦听的内容 会自动感知代码依赖，不需要传递很多参数，只要传递一个回调函数

    + 不能获取之前数据的值 只能获取当前值

    + 一些异步的操作放在这里会更加合适
    
    ```js
    const stop = watchEffect(()=>{
        console.log(data.list)
    })
    // 停止监视
    stop();
    ```
  
 3. computed
    
    ```js
    const endIndex = computed(()=>{
      let end = data.startIndex + data.containerSize;
      return end;
    })
    ```
    
    ```js
    const res = computed({
        get(){},
        set(){}
    }) 
    ```

## setup(props,context)

1. props可以接收传值

2. context对象可以调用emit，slots，attrs 等方法

3. 在beforeCreate之前执行，无法使用this

4. 返回对象中的属性会与 vue2.0 data 中声明的属性合并；如果有重名，setup优先

5. setup不能是一个async函数，因为返回值不再是return的对象，而是一个promise，模板将接收不到值

## setup语法糖

> 给script添加setup后， 相当于直接在setup()里面写代码，但无需return
   
1. 使用 defineProps 接受 props
```js
    <script setup>
        import {defineProps } from "vue";
        const props = defineProps({
          msg: {
            type: String,
          },
        });
    </script>
```

2. 使用 defineEmit 实现子传父

```js
    // 子组件
    <script setup>
        import { defineProps, defineEmit, useContext } from 'vue'

        // 父传子
        const msg = defineProps({
            count:Number
        })


        // 子传父
        const emit = defineEmit(['updateCount']);

        const add = ()=>{
            emit('updateCount')
        }

    </script>
```

```js
    // 父组件
    <template>
      <Child :count="count" @updateCount="update" />
    </template>

    <script setup>
        import Child from "./child.vue";
        import { ref } from "vue";
        ref: count = 0;

        const update = () => {
          count++;
        };
    </script>
```

3. 使用 ctx.expose 来暴露一些方法和属性来供父组件调用
```js
    // 子组件
    <script setup>
      import {ref,useContext} from "vue";
      const { expose } = useContext();
      let num = ref(0)

      function reduce() {
        num.value -= 1
      }

      function add() {
        num.value += 1
      }
      expose({
        reduce,
      })
    </script>
```

```js
    //父组件
    <template>
      <div class="home">
        <Child ref="childRef"/>
      </div>
    </template>

    <script setup>
        import Child from '@/components/child.vue'
        import { ref } from "vue";
        let ChildRef=ref(null)
        console.log(ChildRef)
    </script>
```

4. ref: 语法糖

> 使用ref:声明一个变量，我们可以直接访问变量的值，不需要value
```js
    <template>
      <div class="example">
        <div>{{ num }}
      </div>
    </template>
    <script setup>
      import {ref} from "vue";
      ref:num=100
    </script>
```

5. CSS v-bind（比var更方便的写法）
> var 方式 链接 https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md

```js
<template>
  <div class="color">测试 v-bind 绑定颜色</div>

  <button @click="changeColor">改变颜色试试</button>
</template>

<script setup>

/**
 * v-bind 声明 css 变量
 */

ref: color1 = "red";

const colorArr = ["red", "green", "aquamarine", "aquam"];
function changeColor() {
  const index = Math.floor(Math.random() * colorArr.length);
  color1 = colorArr[index];
}
</script>

<style lang="less">
    .color{
        color: v-bind(color1);
    }
</style>
```

# teleport 传送

1. 可以将组件中的内容传送到 根节点 之外

2. 传送 可根据选择器作为目标

```js
    <teleport to="#endofbody">
        <div id="content">
        <p>
            this will be moved to #endofbody.<br />
            Pretend that it's a modal
        </p>
        <Child />
        </div>
    </teleport>
```

```
    // 目标位置
    <div id="endofbody"></div>
```

3. disabled  ： disabled 会禁用传送，但会因此显示在组件内，如需隐藏需要使用 v-if

# suspence 组件

> vue3.0 异步导入组件：const AsyncComp = defineAsyncComponent(()=> import(''))

```js
<template>
    <Suspence>
        <template #default>
            <AsyncComp/>
        </template>
        
        <template #fallback>
            <h2> loading.... </h2>
        </template>
    </Suspence>
<template/>

<script>
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(()=> import(''));
</script>
```

## vue-router-next

```js
import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../views/index.vue")
    },
    {
        path: '/detail/:id',
        name: "detail",
        component: () => import("../views/detail.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

+ useRoute 和 useRouter
> userRoute 相当于以前的 Route，userRouter 相当于以前的 router

```js
<script setup>
import { useRouter } from "vue-router"
const router = useRouter();
const toDetail = (id)=>{
  router.push(`/detail/${id}`);
}
```

```js
<template>
    {{id}}
    <router-link to="/passData"> 测试传值 </router-link>
</template>

<script setup>
    import {useRoute} from "vue-router";
    const route = useRoute()
    const id = route.params.id;
</script>
```


# vue3 优化细节

1. 源码的优化主要体现在使用 monorepo 和 TypeScript 管理和开发源码，这样做的目的是提升自身代码可维护性

2. 优化 VNode 和 diff 算法

    > vue2.0 VNode是基于模板，即使标签内没有动态属性，diff算法也会查找

    > vue3.0 VNode是基于 Block Tree，只对使用动态数据的标签进行diff查找

    ### Block Tree

    > Block tree是一个将模板基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的，每个区块只需要一个Array来追踪自身的动态节点

    > 借助Block tree，Vue.js将vnode更新性能由与模块整体大小相关提升为与动态内容的数量相关

3. 改写插槽，用 # 代替 v-slot；弃用 $children , 使用 refs 代替

4. 优化响应式，使用 Proxy 替代 Object.defineProperty ； https://github.com/XingZheMonkey/vue-mvvm/blob/master/proxy%E4%B8%8E%20defineProperty.md

5. 优化 mixins，可采用 自定义 hooks 写法

6. 移除了实例上的 $on $off 与 $once ；移除了 filter 和 内联模板等


## Vue 3.0 在编译方面有哪些优化？

1. vue.js 3.x中标记和提升所有的静态节点，diff的时候只需要对比动态节点内容；

2. Fragments（升级vetur插件): template中不需要唯一根节点，可以直接放文本或者同级标签

3. 静态提升(hoistStatic),当使用 hoistStatic 时,所有静态的节点都被提升到 render 方法之外.只会在应用启动的时候被创建一次,之后使用只需要应用提取的静态节点，随着每次的渲染被不停的复用。

4. patch flag, 在动态标签末尾加上相应的标记,只能带 patchFlag 的节点才被认为是动态的元素,会被追踪属性的修改,能快速的找到动态节点,而不用逐个逐层遍历，提高了虚拟dom diff的性能。

5. 缓存事件处理函数cacheHandler,避免每次触发都要重新生成全新的function去更新之前的函数

6. tree shaking 通过摇树优化核心库体积,减少不必要的代码量


## vite

1. vite 打包速度更快，不需要每次运行都重新打包，只需将 vue 文件解析为 js，直接放在浏览器资源中

2. 将 vue 文件解析为 js 文件的工具是 vue 中提供的 SFC 功能，SFC会将VUE文件解析为 AST 树，再将AST树进行解析；对于 template文件使用 vue 中的 complier-dom 解析


