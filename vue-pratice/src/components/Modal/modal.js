import Vue from "vue"
import Modal from "./Modal.vue"

function createModal(props, children,childrenProps) {
    const ModalConstructor = Vue.extend({
        render(h) {
            return h(Modal, {
                props
            }, [h(children ? children : '', {
                slot: 'content',
                props:childrenProps
            })])
        }
    })
    const modalDom = new ModalConstructor()

    let vm = modalDom.$mount()

    document.body.appendChild(vm.$el)

    vm.$children[0].remove = () => {
        document.body.removeChild(vm.$el)
        modalDom.$destroy();
        vm = null; // 设置为null，好让js垃圾回收算法回收，释放内存
    }
}

Vue.prototype.$createModal = createModal;