class Compiler{
    constructor(el,vm){

        this.vm = vm;

        // 2. 根据情况获取dom元素
        this.el = this.isElementNode(el) ? el : document.querySelector(el);

        // 3. 将dom元素放到内存中
        let fragment  = this.nodeToFragment(this.el);

        // 4. 对内存中的dom节点进行编译
        this.compile(fragment);

        // 5. 将编译后的dom元素渲染到页面上
        this.el.appendChild(fragment)
    }

    compile(node){
        // 对dom节点中的每个子元素进行识别编译
        let childNodes = node.childNodes;

        [...childNodes].forEach(child=>{
            if(this.isElementNode(child)){
                // 4.1 对dom元素进行编译
                this.compileElement(child)

                // 4.1.1 递归编译子元素
                this.compile(child);
            }else{
                // 4.2 对文本元素进行编译
                this.compileText(child)
            }
        })
    }
    compileElement(node){
        let attributes = node.attributes; // (类数组) 获取标签中的 attr
        
        [...attributes].forEach(attr =>{
            let {name,value:expr} = attr;   
            if(this.isDirective(name)){   // v-model  v-bind  v-html  v-on:click
                let [,directive] = name.split("-");   // 将 v- 后边的指令解析出来，进行相应处理
                let [directiveName,eventName] = directive.split(":");
                CompileUtil[directiveName](node,expr,this.vm,eventName);
            }
        })
    }
    compileText(node){
        let content = node.textContent;

        // 判断是否是是 mustcha语法
        if(/\{\{(.+?)\}\}/.test(content)){
            CompileUtil['text'](node,content,this.vm)
        }
    }

    nodeToFragment(node){
        // 3.1 创建文档碎片，将内容放到缓存中，处理完全部数据再重新渲染到页面上
        let fragment = document.createDocumentFragment();
        let firstChild = node.firstChild; 
        while(firstChild){
            // appendChild 具有移动性，会将页面元素剪贴过来
            fragment.appendChild(firstChild);
            
            // 不断循环 dom的子元素，直到为空
            firstChild = node.firstChild;
        }
        return fragment;
    }

    isElementNode(node){
        return node.nodeType === 1;
    }

    isDirective(attrName){
        return attrName.startsWith("v-")
    }
}

// 1.创建 Vue 实例
class Vue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data();
        this.methods = options.methods;

        if(this.$el){

            // 把数据全部转为 object.defineProperty
            new Observer(this.$data)

            // 把 vm 上的取值操作 全部代理到 vm.$data, 即可通过 vm 直接访问data中的数据  vm.school
            this.proxyVm(this.$data)

            // 把 vm 上的methods内部的方法 全部代理到 vm.methods , 即可通过  vm直接访问方法名 vm.change
            for(let key in this.methods){
                Object.defineProperty(this,key,{
                    get(){
                        return this.methods[key];
                    }
                })
            }

            new Compiler(this.$el,this)
        }
    }

    proxyVm(data){
        for(let key in data){
            // this 即为 vm 实例
            Object.defineProperty(this,key,{
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}




let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur)=>{  
    console.log(cur)
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);

