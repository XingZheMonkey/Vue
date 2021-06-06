import axios from "./server";

export function login(formInfo) {
  return axios.post("/user/login", formInfo).then(res => res.data);
}

export function register(formInfo) {
  return axios.post("/user/register", formInfo).then(res => res.data);
}

export function findPassword(userInfo) {
  return axios.post("/user/findPassword", userInfo).then(res => res.data)
}

export function resetPassword(userInfo) {
  return axios.post("/user/resetPassword", userInfo).then(res => res.data)
}

export function verifyReset(key) {
  return axios.post("/user/verifyReset", key).then(res => res.data)
}

export function fetchUsers() {
  return axios.get("/user/allUser").then(res => res.data)
}

export function fetchUser(id) {
  return axios.post("/user/userInfo", {
    id
  }).then(res => res.data)
}

export function modifyUserInfo(user) {
  return axios.post("/user/modifyUserInfo", user).then(res => res.data)
}

export function addKnowledge(knowledge) {
  return axios.post("/know/add", knowledge).then(res => res.data)
}

export function fetchKnowledge() {
  return axios.get("/know").then(res => res.data)
}