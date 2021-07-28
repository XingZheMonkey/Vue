import { createVNode,render } from "vue"
import type {IMessageparams} from "./message.type"
import MessageComponent from "./message.vue"

const Message = (options:IMessageparams)=>{
    if(typeof options == 'string'){  // 类型保护
        options = {
            message: options
        }
    }

    const container = document.createElement('div')

    let userClose = options.onClose;
    let opts = {
        ...options,
        onClose:()=>{
            userClose?.()
        }
    }

    // 创建虚拟dom
    const vm = createVNode(MessageComponent,opts as any)
    
    vm.props.onDestroy = ()=>{
        render(null,container)
    }
    

    // 将组件渲染到 container 下
    render(vm,container);

    console.log(vm)

    document.body.appendChild(container.firstElementChild)
}
export default Message