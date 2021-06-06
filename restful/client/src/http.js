import axios from 'axios'
import {Message,Loading} from 'element-ui';
import router from './router'

let loading;
function startLoading(){
    loading=Loading.service({
       lock:true,
       text:"拼命加载中..." ,
       background:'rgba(0,0,0,0.7)'
    });
}

function endLoading(){
    loading.close();
}

// 请求拦截
axios.interceptors.request.use(config=>{
    // 开始动画
    startLoading();

    // 设置统一的请求headers
    if(localStorage.eleToken){
        config.headers.Authorization=localStorage.eleToken;
    }
    return config;  // return 要写,避免发生错误
},error=>{
    return Promise.reject(error);
})


// 响应拦截
axios.interceptors.response.use(response=>{
    endLoading();
    return response;
},error=>{
    // 错误提示
    endLoading();
    Message.error(error.response.data);

    // 获取错误状态码
    const {status}=error.response;
    if(status==401){
        Message.error('token失败,请重新登录');

        // 清除 token
        localStorage.removeItem('eleToken');

        // 返回登录页面
        router.push('/login')
    }

    return Promise.reject(error);
})

export default axios;