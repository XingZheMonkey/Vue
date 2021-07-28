import type {App} from "vue"
import Message from "./src/message"


(Message as any).install = (app:App):void => {
    // 兼容 Vue2 写法
    app.config.globalProperties.$message = Message;
}


export {
    Message
}

export default  Message