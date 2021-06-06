let Vue;

class Store {
    constructor(options) {
        this.state = new Vue({
            data: options.state
        })

        options.mutations && (this.mutations = options.mutations);

        options.actions && (this.actions = options.actions);

        options.getters && this.hanleGetters(options.getters);
    }

    commit = (type, arg) => {
        this.mutations[type](this.state, arg)
    }

    dispatch(type,arg){
        this.actions[type]({commit:this.commit,state:this.state},arg)
    }

    hanleGetters(getters){
        this.getters = {}
        Object.keys(getters).forEach(key=>{
            // 不写入set方法，使 getters 内容不可更改
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return getters[key](this.state)
                }
            })
        })
    }
}

function install(_vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        },
    })
}

export default {
    install,
    Store
}