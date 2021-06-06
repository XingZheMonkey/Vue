import axios from "axios"
import router from "../router/index"
import Vue from "vue"
import Message from "@components/Message/Message.vue"

axios.defaults.baseURL = process.env.NODE_ENV == "production" ? "/" : "/api"
axios.defaults.timeout = 2000


// 请求拦截
axios.interceptors.request.use(
    config => {
        if (localStorage.eleToken) {
            // 设置请求头
            config.headers.Authorization = localStorage.eleToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        Vue.prototype.$generate(Message,{
            message:error.response.data,
            duration:2000,
            type:'fail'
        }).show()

        // 获取错误状态码
        let {
            status
        } = error.response;

        status = 401

        if (status == 401) {

            Vue.prototype.$generate(Message,{
                message:"身份过期，请重新登录",
                duration:2000,
                type:'fail'
            }).show()

            // 清除token
            localStorage.removeItem("eleToken");

            // 跳转登录页面
            router.push("/login");
        }
        return Promise.reject(error);
    }
)
export default axios