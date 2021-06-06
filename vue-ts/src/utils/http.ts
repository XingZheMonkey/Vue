import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Message } from "element-ui"
import router from '@/router';

// 请求拦截器 负责将客户端标识token值存储并放置在头部提交给服务端

// 响应拦截器 负责全局处理业务请求的网络或者业务错误

const service = axios.create({
    timeout: 10000
})

// 请求拦截

service.interceptors.request.use((config: AxiosRequestConfig) => {
    if(localStorage.tsToken){
        config.headers.Authorization=localStorage.tsToken;
    }
    return config;
}, (err: any) => {
    Promise.reject(err)
})

// 响应拦截

service.interceptors.response.use((config: AxiosResponse) => {
    return config;
}, (err: any) => {
    let errMsg = "";

    console.log(err)

    if (err && err.response.status) {
        switch (err.response.status) {
            case 401:
                errMsg = "登录失效，请重新登录"
                localStorage.removeItem("tsToken")
                router.push("/login")
                break;
            case 403:
                errMsg = "拒绝访问"
                break;
            case 408:
                errMsg = "请求超时"
                break;
            case 500:
                errMsg = "服务器内部错误"
                break;
            case 501:
                errMsg = "服务未实现"
                break;
            case 502:
                errMsg = "网关错误"
                break;
            case 504:
                errMsg="网关超时"
            case 505:
                errMsg = "HTTP版本不受支持"
                break;
            default:
                errMsg=err.response.data.msg;
                break;
        }
    }else{
        errMsg=err;
    }

    Message.error(errMsg)

    return Promise.reject(errMsg)
})

export default service;