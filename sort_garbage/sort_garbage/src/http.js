import axios from "axios";
import router from "./router";
import { Notify } from 'vant';

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (localStorage.eleToken) {
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Notify({ type: 'warning', message: error.response.data });

    // 获取错误状态码
    const { status } = error.response;
    if (status == 401) {
        
    Notify({ type: 'danger', message:"身份过期，请重新登录"});

      // 清除token
      localStorage.removeItem("eleToken");

      // 跳转登录页面
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axios;