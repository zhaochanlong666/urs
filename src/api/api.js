import axios from 'axios'
axios.defaults.timeout = 30000


axios.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
    if (response.status == 200) {
        return response
    }
}, (error) => {
    return Promise.reject(error)
})
export function apiGet(url) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url
        }).then(value => {
            resolve(value.data)
        }, reason => {
            reject(reason)
        })
    })
}
export function apiPost(url, data) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            data
        }).then(value => {
            resolve(value.data)
        }, reason => {
            reject(reason)
        })
    })
}