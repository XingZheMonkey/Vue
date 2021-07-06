# vue 底层原理

## 虚拟Dom生成

>  template编译成 AST 语法树 -> 再 调用 codegen 转换为 render 函数 最终返回一个VNode

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


```js
let code = generate(root)
let render = `with(this){return ${code}}`

let renderFn = new Function(render)
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

### 异步渲染原理分析

1. nextTick 原理分析

    + nextTick 中传入的回调会被 push 进一个 **callbacks** 数组，等待调用

    + 如果没有传入回调，用户可能使用的是 Promise 形式，返回一个 Promise，_resolve 被调用时进入到 then

        ```js
        export function nextTick (cb?: Function, ctx?: Object) {
            let _resolve
            // 1. cb 即传入的回调，它被 push 进一个 callbacks 数组，等待调用
            callbacks.push(() => {
                if (cb) {
                    try {
                        cb.call(ctx)
                    } catch (e) {
                        handleError(e, ctx, 'nextTick')
                    }
                } else if (_resolve) {
                    _resolve(ctx)
                }
            })
            // 2. pending 的作用就是一个锁，防止后续的 nextTick 重复执行 timerFunc。timerFunc 内部创建会一个微任务或宏任务，等待所有的 nextTick 同步执行完成后，再去执行 callbacks 内的回调
            if (!pending) {
                pending = true
                timerFunc()
            }
            // 3. 如果没有传入回调，用户可能使用的是 Promise 形式，返回一个 Promise，_resolve 被调用时进入到 then
            if (!cb && typeof Promise !== 'undefined') {
                return new Promise(resolve => {
                _resolve = resolve
                })
            }
        }
        ```

    + **timerFunc** 内部创建会一个微任务或宏任务，等待所有的 nextTick 同步执行完成后，再去执行 callbacks 内的回调

        ```js
        // Here we have async deferring wrappers using microtasks.
        // In 2.5 we used (macro) tasks (in combination with microtasks).
        // However, it has subtle problems when state is changed right before repaint
        // (e.g. #6813, out-in transitions).
        // Also, using (macro) tasks in event handler would cause some weird behaviors
        // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
        // So we now use microtasks everywhere, again.
        // A major drawback of this tradeoff is that there are some scenarios
        // where microtasks have too high a priority and fire in between supposedly
        // sequential events (e.g. #4521, #6690, which have workarounds)
        // or even between bubbling of the same event (#6566).
        let timerFunc

        // The nextTick behavior leverages the microtask queue, which can be accessed
        // via either native Promise.then or MutationObserver.
        // MutationObserver has wider support, however it is seriously bugged in
        // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
        // completely stops working after triggering a few times... so, if native
        // Promise is available, we will use it:
        /* istanbul ignore next, $flow-disable-line */
        if (typeof Promise !== 'undefined' && isNative(Promise)) {
            const p = Promise.resolve()
            timerFunc = () => {
                p.then(flushCallbacks)
                // In problematic UIWebViews, Promise.then doesn't completely break, but
                // it can get stuck in a weird state where callbacks are pushed into the
                // microtask queue but the queue isn't being flushed, until the browser
                // needs to do some other work, e.g. handle a timer. Therefore we can
                // "force" the microtask queue to be flushed by adding an empty timer.
                if (isIOS) setTimeout(noop)
            }
            isUsingMicroTask = true
        } else if (!isIE && typeof MutationObserver !== 'undefined' && (
            isNative(MutationObserver) ||
            // PhantomJS and iOS 7.x
            MutationObserver.toString() === '[object MutationObserverConstructor]'
            )) {
            // Use MutationObserver where native Promise is not available,
            // e.g. PhantomJS, iOS7, Android 4.4
            // (#6466 MutationObserver is unreliable in IE11)
            let counter = 1
            const observer = new MutationObserver(flushCallbacks)
            const textNode = document.createTextNode(String(counter))
            observer.observe(textNode, {
                characterData: true
            })
            timerFunc = () => {
                counter = (counter + 1) % 2
                textNode.data = String(counter)
            }
            isUsingMicroTask = true
        } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
            // Fallback to setImmediate.
            // Technically it leverages the (macro) task queue,
            // but it is still a better choice than setTimeout.
            timerFunc = () => {
                setImmediate(flushCallbacks)
            }
        } else {
            // Fallback to setTimeout.
            timerFunc = () => {
                setTimeout(flushCallbacks, 0)
            }
        }
        ```

    > timerFunc 主要通过一些兼容判断来创建合适的 timerFunc，最优先肯定是微任务，其次再到宏任务。优先级为 **promise.then > MutationObserver > setImmediate > setTimeout**

    +  **flushCallbacks** 负责执行callbacks 里的回调

        ```js
        const callbacks = []
        let pending = false

        function flushCallbacks () {
            pending = false
            const copies = callbacks.slice(0)
            callbacks.length = 0
            for (let i = 0; i < copies.length; i++) {
                copies[i]()
            }
        }
        ```


2. 异步更新流程

    + 数据被改变时，触发 数据被改变时，触发 **setter**，**setter** 内部执行 **Dep.notify**, 执行所有已订阅的 **watcher** 的 **update** 方法

        ```js
        // 源码位置：src/core/observer/watcher.js
        update () {
            /* istanbul ignore else */
            if (this.lazy) {
                this.dirty = true
            } else if (this.sync) {
                this.run()
            } else {
                queueWatcher(this) // this 为当前的实例 watcher
            }
        }
        ```

    + **update** 方法中会调用  **queueWatcher**，将 watcher 加入队列

    + 将 **flushSchedulerQueue** 作为回调传入 nextTick 异步执行

        ```js
        // 源码位置：src/core/observer/scheduler.js
        const queue = []
        let has = {}
        let waiting = false
        let flushing = false
        let index = 0

        export function queueWatcher (watcher: Watcher) {
            const id = watcher.id
            // 1. 每个 watcher 都有自己的 id，当 has 没有记录到对应的 watcher，即第一次进入逻辑，否则是重复的 watcher, 则不会进入。这一步就是实现 watcher 去重的点
            if (has[id] == null) {
                has[id] = true

                // 2. 将 watcher 加入到队列中，等待执行
                if (!flushing) {
                    queue.push(watcher)
                } 
                else {
                    // if already flushing, splice the watcher based on its id
                    // if already past its id, it will be run next immediately.
                    let i = queue.length - 1
                    while (i > index && queue[i].id > watcher.id) {
                        i--
                    }
                    queue.splice(i + 1, 0, watcher)
                }
                // queue the flush
                // 3. flushSchedulerQueue 作为回调传入 nextTick 异步执行,waiting 的作用是防止 nextTick 重复执行
                if (!waiting) {
                    waiting = true
                    nextTick(flushSchedulerQueue)
                }
            }
        }
        ```

    + **flushSchedulerQueue** 内将刚刚加入 queue 的 **watcher 逐个 run 更新**

        ```js
        function flushSchedulerQueue () {
            currentFlushTimestamp = getNow()
            flushing = true
            let watcher, id

            // Sort queue before flush.
            // This ensures that:
            // 1. Components are updated from parent to child. (because parent is always
            //    created before the child)
            // 2. A component's user watchers are run before its render watcher (because
            //    user watchers are created before the render watcher)
            // 3. If a component is destroyed during a parent component's watcher run,
            //    its watchers can be skipped.
            queue.sort((a, b) => a.id - b.id)

            // do not cache length because more watchers might be pushed
            // as we run existing watchers
            for (index = 0; index < queue.length; index++) {
                watcher = queue[index]
                if (watcher.before) {
                    watcher.before()
                }
                id = watcher.id
                has[id] = null
                watcher.run()
            }

            // keep copies of post queues before resetting state
            const activatedQueue = activatedChildren.slice()
            const updatedQueue = queue.slice()

            resetSchedulerState()

            // call component updated and activated hooks
            callActivatedHooks(activatedQueue)
            callUpdatedHooks(updatedQueue)
        ```

    + **resetSchedulerState** 重置状态，等待下一轮的异步更新
    
        ```js
        function resetSchedulerState () {
            index = queue.length = activatedChildren.length = 0
            has = {}
            if (process.env.NODE_ENV !== 'production') {
                circular = {}
            }
            waiting = flushing = false
        }
        ```

    + 要注意此时 *flushSchedulerQueue 还未执行*，它只是作为回调传入而已。因为用户可能也会调用 nextTick 方法
    
    + 这种情况下，callbacks 里的内容为 **["flushSchedulerQueue", "用户的nextTick回调"]**，当所有同步任务执行完成，才开始执行 callbacks 里面的回调。

    + 由此可见，最先执行的是页面更新的逻辑，其次再到用户的 nextTick 回调执行。这也是为什么我们能在 nextTick 中获取到更新后DOM的原因


##### 总结 ： 异步更新机制使用微任务或宏任务，基于事件循环运行，在 Vue 中对性能起着至关重要的作用，它对重复冗余的 watcher 进行过滤。而 nextTick 根据不同的环境，使用优先级最高的异步任务。这样做的好处是等待所有的状态同步更新完毕后，再一次性渲染页面。用户创建的 nextTick 运行页面更新之后（flushSchedulerQueue之后），因此能够获取更新后的DOM


#### 异步更新整体流程梳理

 1. 数据被改变时，触发 **setter**，**setter** 内部执行 **Dep.notify**, 执行所有已订阅的 **watcher** 的 **update** 方法

 2. **update** 方法中会调用 **queueWatcher**，将 **watcher** 加入队列

 3. 声明一个 **flushSchedulerQueue**，用来将刚刚加入 queue 的 watcher 逐个 run 更新(**watcher.update**)

 4. 将 **flushSchedulerQueue** 作为回调函数传入 **nexttick** 异步执行

 5. **nexttick** 会将传入的 cb 存放在 callbacks 数组中，等待调用

 6. **nexttick** 内部会执行 timeFunc
 
 7. **timerFunc** 内部创建会一个微任务或宏任务，将 执行 callbacks 的方法放入任务队列中，等待所有的 nextTick 同步执行完成后，再用特定方法去执行 callbacks 内的回调

 8. 若用户触发了 **nexttick**, 则会在用户触发的 nexttick执行完毕后再执行回调，但用户触发的 nexttick 在 **callbacks** 里是放在 **flushSchedulerQueue之后**的，因此可以获得最新DOM

## 组件渲染和更新过程

1. 渲染组件时，会通过 vue.extend 方法构建子组件的构造函数，并进行实例化，最终手动调用$mount()进行挂载。更新组件时会调用 patchNode

2. 组件的 data 必须是一个函数就是因为组件的创建是对构造函数的实例化；当一个组件被多次复用时，会创建多个实例，这些实例用的是同一个构造函数，如果data是一个对象的话，所有组件就都共享了同一个对象

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











## computed 细节

> lazy 用于标识 computed

```js
const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }
```


```js
 // computed不会立即执行，只有使用的时候才会执行
 this.value = this.lazy
      ? undefined
      : this.get()
```

> dirty 用于标识是否需要更新

```js
    
    // watcher构造函数
    
    update () {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true   // 数据发生改变，将 dirty 设置为 true，让其更新
        } else if (this.sync) {  // 同步 watcher
            this.run()
        } else {
            queueWatcher(this) // this 为当前的实例 watcher
        }
    }
```

```js
// state.js
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) { // dirty为true的时候 让计算属性更新
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```


```js
    evaluate () {
        this.value = this.get()  // 更新数据
        this.dirty = false  // 更新之后将dirty设置为false
    }
```

> watch 可以设置deep，设置deep后会对属性进行递归处理；但computed不需要，因为computed会在模板中使用，会对其进行 JOSN.srtingify 处理





## v-if 与 v-show 底层

> v-if 会用 三元表达式确认是否需要渲染

> v-show 会形成一个指令，在bind函数中将 target 的 display设置为none

>> platforms/web/runtime/directives/show.js

```js
with(this){
     return _c('div',
        [(flag == 'a') ? 
            _c('p',[_v("A")]) : 
            _c('p',[_v("B")])
        ]
     )
 }
```

## v-if 与 v-show 底层

> v-for 的优先级高

```js
with(this){
    return _l((3),function(i)=>{
        return (false) ? _c("div",[_v('hello')]) : _e();
    })
}
```

## vue中的 diff 算法

1. 同级对比

2. 双指针算法

    + 先对比新老节点的 startIndex，再对比新老节点的 endIndex 

    + 如果不相等则 对将 startIndex 与 endIndex 进行对比, endIndex 与 startIndex 对比

    + 对比完 索引依次向前向后赋值s
