import {AjaxPlugin} from 'vux';
// AjaxPlugin.$http = axios

export default function () {
    let instance = AjaxPlugin.$http.create({
        timeout: 100000
    });

    instance.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        console.log('请求出错');
        return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
        let res = response.data;
        if (res.code !== 0) {
            console.log('error', res);
        }
        else {
            console.log('success', res);
        }
        return res;
    }, function (error) {
        console.log('网络错误，请稍后再试');
        return Promise.reject(error);
    });

    return instance;
}
