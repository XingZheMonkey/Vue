import axios from "axios"
export function fetchList(num) {
    return axios.get(`/api/list?num=${num}`).then(res => res.data)
}