import axios from "axios";

export function fetchResources() {
  return axios.get("/api/resources").then((res) => res.data);
}

export function fetchResource(resourceId) {
  return axios.get(`/api/resources/${resourceId}`).then((res) => res.data);
}

export function searchResources(title) {
  return axios.get(`/api/resources/s/${title}`).then((res) => res.data);
}

export function updateResource(id, resource) {
  return axios
    .patch(`/api/resources/${id}`, resource)
    .then((res) => res.data)
    .catch((error) => {
      return Promise.reject(error?.response?.data);
    });
}

export function createResource(resource) {
  return axios
    .post("/api/resources", resource)
    .then((res) => res.data)
    .catch((error) => {
      return Promise.reject(error?.response?.data);
    });
}

export function deleteResource(id) {
  return axios
    .delete(`/api/resources/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      return Promise.reject(error?.response?.data);
    });
}

// blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

/**
 * 跨域: 只要不同源,即为跨域
 *
 * 同源策略: 以下任意一个不同,即为跨域
 * > 协议头  http https file
 * > 域名   baidu.com  www.taobao.com
 * > 端口号  8080 441 21 22
 *
 * 域名不同 = 跨域
 * https://www.baidu.com:8888
 * https://www.taobao.com:8888
 *
 * 协议不同 = 跨域
 * http://www.baidu.com:21
 * https://www.baidu.com:21
 *
 * 端口不同 = 跨域
 * http://www.baidu.com:21
 * http://www.baidu.com:22
 *
 * 同源
 * http://www.baidu.com:21
 * http://www.baidu.com:21/map/api/citi
 */

//  我们遇到的问题
/**
 * http://localhost:8080/
 * https://vue3-fjord-81553.herokuapp.com/api/resources
 */

/**
 * http://localhost:8080/
 * http://jsonplaceholder.typicode.com/users
 */

/**
 * 解决跨域
 * > jsonp
 * > 服务器代理
 * > 后端允许跨域
 */
