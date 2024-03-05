import { apiGet, apiPost } from "./api";

//获取验证码
export function getCode() {
    return get('index.php/index/index/getcode')
}
//渲染
export function rendering() {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/getGoodsList',)
}
//查看
export function postview(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/getGoodsbyid', data)
}

//添加  编辑
export function postincrease(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/addGoods', data)
}

//删除
export function postdelete(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/delGoods', data)
}
// 搜索
export function postsearch(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/getGoodsList', data)
}


// 图片接口

// 添加图片
export function addpicture(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/addTu', data)
}

//上传图片
export function uplpicture(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/upload/uploadimg', data)
}


// 渲染图片
export function dispicture(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/getTuList', data)
}

// 删除图片
export function deipicture(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/delTu', data)
}

// 订单接口

// 渲染
export function forplaypost(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/getOrderList', data)
}
// 添加编辑
export function foraddpost(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/addOrder', data)
}
// 查看
export function forviewpost(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/getOrderbyid', data)
}
// 删除
export function fordelpost(data) {
    return post('https://testshool.zzgoodqc.cn/index.php/index/Yimi/delOrder', data)
}



//post方法
function post(url, data) {
    return new Promise((resolve, reject) => {
        apiPost(url, data).then(value => {
            if (value.code == 0) {
                resolve(value)
            } else {
                reject(value)
            }
        }, reason => {
            reject(reason)
        })
    })
}
//get方法
function get(url) {
    return new Promise((resolve, reject) => {
        apiGet(url).then(value => {
            if (value.code == 0) {
                resolve(value)
            } else {
                reject(value)
            }
        }, reason => {
            reject(reason)
        })
    })
}