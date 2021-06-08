

# vue3 优化细节

1. 源码的优化主要体现在使用 monorepo 和 TypeScript 管理和开发源码，这样做的目的是提升自身代码可维护性

2. 优化 VNode 和 diff 算法

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


# Vue 3.0 编译优化

## vue2.0 与 vue3.0 编译对比

1. Vue2.[x] 中的 Compile 过程会是这样：

   + parse 编译模板生成原始 AST
   
   + optimize 优化原始 AST，标记 AST Element 为静态根节点或静态节点

   + generate 根据优化后的 AST，生成可执行代码，例如 _c、_l 之类的

2. 在「Vue3」中，整体的 Compile 过程仍然是三个阶段，但是不同于「Vue2.x」的是，第二个阶段换成了正常编译器都会存在的阶段 transform

   + baseParse 词法解析，生成 AST

   + transfrom 遍历AST，对每一个 AST Element 进行转化

   + 根据转化后的 AST 生成对应的 可执行函数

   + transformElement：transformElement 是一个所有 AST Element 都会被执行的一个 plugin，它的核心是为 AST Element 生成最基础的 codegen属性。例如标识出对应 patchFlag，从而为生成 VNode 提供依据，例如 dynamicChildren


## Block Tree 与 patchFlag

1. 问题分析

   > vue2.0 VNode是基于模板，即使标签内没有动态属性，diff算法也会查找

   > vue3.0 VNode是基于 Block Tree，只对使用动态数据的标签进行diff查找

2. Block Tree
   + Block tree是一个将模板基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的，每个区块只需要一个Array来追踪自身的动态节点

   + 借助Block tree，Vue.js将vnode更新性能由与模块整体大小相关提升为与动态内容的数量相关

   + 一个 Block 就是一个特殊的 VNode，可以理解为它只是比普通 VNode 多了一个 dynamicChildren 属性
   
   + createBlock() 函数和 createVNode() 函数的调用签名几乎相同，实际上 createBlock() 函数内部就是封装了 createVNode()，这再次证明 Block 就是 VNode。
   
   + 在调用 createBlock() 创建 Block 前要先调用 openBlock() 函数，通常这两个函数配合逗号运算符一同出现

3. PatchFlag : 在动态标签末尾加上相应的标记,只有带 patchFlag 的节点才被认为是动态的元素,会被追踪属性的修改,能快速的找到动态节点,而不用逐个逐层遍历，提高了虚拟dom diff的性能

   > 我们可以把 PatchFlags 简单的理解为一个数字标记，把这些数字赋予不同含义

   +  PatchFlags.CLASS ： 当有动态的 class 绑定时使用
   
   + PatchFlags.STYLE ： 当有动态的 style 绑定时使用
   
   + PatchFlags.TEXT ： 当有动态的文本节点是使用

   + PatchFlags.PROPS ： 当有除了 class 和 style 之外的其他动态绑定属性时

   + PatchFlags.FULL_PROPS - 当有动态 name 的 props 时使用
      ```js
      reateVNode('p', { [refKey.value]: 'val' }, 'hello', PatchFlags.FULL_PROPS)
      ```




   ```js
   <div>
    <p :foo="bar"></p>
   </div>

   // pacthFlag
   render(ctx) {
      return (openBlock(), createBlock('div', null, [
         createVNode('p', { foo: ctx }, null, PatchFlags.PROPS, ['foo'])
      ]))
   }

   // 在创建 VNode 时，为其打上了 PatchFlags.PROPS，代表这个元素需要更新 PROPS，并且需要更新的 PROPS 的名字叫 foo

   ```


   ```js
   // 提取 动态节点
   // dynamicChildren 就是我们用来存储一个节点下所有子代动态节点的数组
   const vnode = {
      tag: 'div',
      children: [
         { tag: 'p', children: 'foo' },
         { tag: 'p', children: ctx.bar, patchFlag: 1 /* 动态的 textContent */ },
      ],
      dynamicChildren: [
         { tag: 'p', children: ctx.bar, patchFlag: 1 /* 动态的 textContent */ },
      ]
   }
   ```

   1. v-if 的元素作为 Block

      ```js
      <div>
         <section v-if="foo">
            <p>{{ a }}</p>
         </section>
         <section v-else> <!-- 即使这里是 section -->
               <div> <!-- 这个 div 标签在 diff 过程中被忽略 -->
                  <p>{{ a }}</p>
               </div>
         </section>
      </div>

      // block tree
      Block(Div)
      - Block(Section v-if)
      - Block(Section v-else)

      // vNode
      cosnt block = {
         tag: 'div',
         dynamicChildren: [
            { tag: 'section', { key: 0 }, dynamicChildren: [...]}, /* Block(Section v-if) */
            { tag: 'section', { key: 1 }, dynamicChildren: [...]}  /* Block(Section v-else) */
         ]
      } 
      ```

   2. 不仅 v-if 会让 DOM 结构不稳定，v-for 也会，因为 v-for 也会形成block

   3. 元素带有动态的 key 绑定也会生成 Block，而不会被静态提升

   4. 带有 ref 的标签也会被标记为 Block，不会被静态提升 (PatchFlags.NEED_PATCH)

   5. 实际上一个元素如果使用除 v-pre/v-cloak 之外的所有 Vue 原生提供的指令，都不会被提升，使用自定义指令也不会被提升

## 静态提升

> Vue3 的 Compiler 如果开启了 hoistStatic 选项则会提升静态节点，或静态的属性，这可以减少创建 VNode 的消耗

> 静态提升(hoistStatic),当使用 hoistStatic 时,所有静态的节点都被提升到 render 方法之外.只会在应用启动的时候被创建一次,之后使用只需要应用提取的静态节点，随着每次的渲染被不停的复用


1. 静态节点提升

   ```js
   <div>
      <p>text</p>
   </div>

   // 提升之前
   function render() {
      return (openBlock(), createBlock('div', null, [
         createVNode('p', null, 'text')
      ]))
   }

   // 提升之后
   const hoist1 = createVNode('p', null, 'text')

   function render() {
      return (openBlock(), createBlock('div', null, [
         hoist1
      ]))
   }
   ```

2. 静态PROPS提升 （即使动态绑定的属性值，但如果值是常量，那么也会被提升）

   ```js
   <div>
      <p foo="bar">{{ text }}</p>
   </div>

   // 提升后
   const hoistProp = { foo: 'bar' }

   render(ctx) {
      return (openBlock(), createBlock('div', null, [
         createVNode('p', hoistProp, ctx.text)
      ]))
   }
   ```

3. 预字符串化

   ```js
   <div>
      <p></p>
      <p></p>
      ...20 个 p 标签
      <p></p>
   </div>

   // 假设如上模板中有大量连续的静态的 p 标签，当采用了 hoist 优化时，结果如下
   cosnt hoist1 = createVNode('p', null, null, PatchFlags.HOISTED)
   cosnt hoist2 = createVNode('p', null, null, PatchFlags.HOISTED)
   ... 20 个 hoistx 变量
   cosnt hoist20 = createVNode('p', null, null, PatchFlags.HOISTED)

   render() {
      return (openBlock(), createBlock('div', null, [
         hoist1, hoist2, ...20 个变量, hoist20
      ]))
   }

   // 预字符串化会将这些静态节点序列化为字符串并生成一个 Static 类型的 VNode
   const hoistStatic = createStaticVNode('<p></p><p></p><p></p>...20个...<p></p>')

   render() {
      return (openBlock(), createBlock('div', null, [
         hoistStatic
      ]))
   }
   ```

   > 优势： 生成代码的体积减少；减少创建 VNode 的开销；减少内存占用

   > 静态节点在运行时会通过 innerHTML 来创建真实节点，因此并非所有静态节点都是可以预字符串化的，可以预字符串化的静态节点需要满足以下条件：

      + 非表格类标签：caption 、thead、tr、th、tbody、td、tfoot、colgroup、col

      + 标签的属性必须是：标准 HTML attribute 或 data-/aria- 类属性

   > 当一个节点满足这些条件时代表这个节点是可以预字符串化的，但是如果只有一个节点，那么并不会将其字符串化，可字符串化的节点必须连续且达到一定数量才行

      + 如果节点没有属性，那么必须有连续 20 个及以上的静态节点存在才行

      + 或者在这些连续的节点中有 5 个及以上的节点是有属性绑定的节点


## Cache Event handler

> 事件缓存机制：利用函数缓存实现

   ```js
      <Comp @change="a + b" />

      // 编译成render函数
      render(ctx) {
         return h(Comp, {
            onChange: () => (ctx.a + ctx.b)
         })
      }

      // 每次 render 函数执行的时候，Comp 组件的 props 都是新的对象，onChange 也会是全新的函数。这会导致触发 Comp 组件的更新
   ```

   > 当 Vue3 Compiler 开启 prefixIdentifiers 以及 cacheHandlers 时，这段模板会被编译为

   ```js
      render(ctx, cache) {
         return h(Comp, {
            onChange: cache[0] || (cache[0] = ($event) => (ctx.a + ctx.b))
         })
      }

      // 这样即使多次调用渲染函数也不会触发 Comp 组件的更新，因为 Vue 在 patch 阶段比对 props 时就会发现 onChange 的引用没变
   ```

   ```js
      //  将方法提取出来，也可以实现
      const handleChange = () => {/* ... */}
      return () => {
            return h(AnthorComp, {
               onChange: handleChange  // 引用不变
            })
      }
   ```



> vue 3.0 vNode结构
```js
{ 
   anchor: null
   appContext: null
   children: [{…}]
   component: null
   dirs: null
   dynamicChildren: null
   dynamicProps: null
   el: null
   key: null
   patchFlag: 0
   props: {class: "aaaa"}
   ref: null
   scopeId: null
   shapeFlag: 17
   slotScopeIds: null
   ssContent: null
   ssFallback: null
   staticCount: 0
   suspense: null
   target: null
   targetAnchor: null
   transition: null
   type: "div"
   __v_isVNode: true
   __v_skip: true
}
```




## vite

1. vite 打包速度更快，不需要每次运行都重新打包，只需将 vue 文件解析为 js，直接放在浏览器资源中

2. 将 vue 文件解析为 js 文件的工具是 vue 中提供的 SFC 功能，SFC会将VUE文件解析为 AST 树，再将AST树进行解析；对于 template文件使用 vue 中的 complier-dom 解析
