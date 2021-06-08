

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


## vite

1. vite 打包速度更快，不需要每次运行都重新打包，只需将 vue 文件解析为 js，直接放在浏览器资源中

2. 将 vue 文件解析为 js 文件的工具是 vue 中提供的 SFC 功能，SFC会将VUE文件解析为 AST 树，再将AST树进行解析；对于 template文件使用 vue 中的 complier-dom 解析
