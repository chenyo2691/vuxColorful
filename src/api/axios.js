import {AjaxPlugin} from 'vux';
import {AlertModule} from 'vux';
import router from '../router/index.js';

export default function () {
    let instance = AjaxPlugin.$http.create({
        timeout: 100000
    });

    instance.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        AlertModule.show({
            title: `error`,
            content: '请求出错'
        });
        return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
        let res = response.data;
        if (res.code !== 0) {
            console.log('error', res);

            if ([100001].find(e => e === res.code)) {
                // removeToken();
                router.push({
                    name: 'login'
                });
            }

            AlertModule.show({
                title: `error${res.code}`,
                content: res.message
            });
        }
        else {
            console.log('success', res);
        }
        return res;
    }, function (error) {
        AlertModule.show({
            title: `error`,
            content: '网络错误，请稍后再试'
        });
        return Promise.reject(error);
    });

    return instance;
}
