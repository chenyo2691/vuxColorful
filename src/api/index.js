// let SERVICE = `http://result.eolinker.com/3nr3tizeeed5ac26c35f83668536bcda0a0f2e290d0ca19?uri=`;
let SERVICE = `http://120.79.174.12:9013/`;
// import {AjaxPlugin} from 'vux';
import axios from './axios.js';
import URLS from './interface.js';

let api = function (url, data) {
    return axios().post(SERVICE + url, data);
};

export default {
    // 网购
    // 【300】获取网购大类信息	POST
    online_getmaincategorylist(data) {return api(URLS.ONLINE_GETMAINCATEGORYLIST, data);},
    // 【301】通过大类获取中类	POST
    online_getmiddlecategorylist(data) {return api(URLS.ONLINE_GETMIDDLECATEGORYLIST, data);},
    // 【303】通过小类获取列表	POST
    online_getproductlist(data) {return api(URLS.ONLINE_GETPRODUCTLIST, data);},
    // 【304】获取商品购物页信息	POST
    online_getproductinfo(data) {return api(URLS.ONLINE_GETPRODUCTINFO, data);},
    // // 【306】放入购物车	POST
    // online_addproducttocart(data) {return api( URLS.ONLINE_ADDPRODUCTTOCART, data);},
    // // 【307】会员购物车列表	POST
    // online_getcartinfo(data) {return api( URLS.ONLINE_GETCARTINFO, data);},
    // // 会员从购物车删除商品【307】	POST
    // online_deletefromcart(data) {return api( URLS.ONLINE_DELETEFROMCART, data);},
    // // 会员调整购物车产品数量【308】	POST
    // online_changeproductquantity(data) {return api( URLS.ONLINE_CHANGEPRODUCTQUANTITY, data);},
    // 【302】通过中类获取小类	POST
    online_getsubcategorylist(data) {return api(URLS.ONLINE_GETSUBCATEGORYLIST, data);},
    // 【305】获取客服联系电话	POST
    online_getcustomerservicelist(data) {return api(URLS.ONLINE_GETCUSTOMERSERVICELIST, data);},

    // 新品
    // 【900】获取新品大类信息	POST
    new_getmaincategorylist(data) {return api(URLS.NEW_GETMAINCATEGORYLIST, data);},
    // 【901】通过大类获取中类	POST
    new_getmiddlecategorylist(data) {return api(URLS.NEW_GETMIDDLECATEGORYLIST, data);},
    // 【903】通过小类获取列表	POST
    new_getproductlist(data) {return api(URLS.NEW_GETPRODUCTLIST, data);},
    // 【904】获取商品购物页信息	POST
    new_getproductinfo(data) {return api(URLS.NEW_GETPRODUCTINFO, data);},
    // 【902】通过中类获取小类	POST
    new_getsubcategorylist(data) {return api(URLS.NEW_GETSUBCATEGORYLIST, data);},
    // 【905】获取客服联系电话	POST
    new_getcustomerservicelist(data) {return api(URLS.NEW_GETCUSTOMERSERVICELIST, data);},

    // 购物车
    // 【1001】放入购物车	POST 
    cart_addproducttocart(data) {return api(URLS.CART_ADDPRODUCTTOCART, data);},
    // 【1002】会员购物车列表	POST 
    cart_getcartlist(data) {return api(URLS.CART_GETCARTLIST, data);},
    // 【1003】调整购物车产品数量	POST 
    cart_changeproductquantity(data) {return api(URLS.CART_CHANGEPRODUCTQUANTITY, data);},
    // 【1004】从购物车删除商品	POST 
    cart_deletefromcart(data) {return api(URLS.CART_DELETEFROMCART, data);},


    // 登录
    // 【202】获取 缤纷服务站点 信息	POST
    getbranchinfo(data) {return api(URLS.GETBRANCHINFO, data);},
    // 【200】验证用户登录信息	POST
    login(data) {return api(URLS.LOGIN, data);},
    // 【203】退出	POST
    logout(data) {return api(URLS.LOGOUT, data);},
    // 【201】验证用户注册信息	POST
    register(data) {return api(URLS.REGISTER, data);},

    // 订单
    // 【701】提交订单	POST
    submitorder(data) {return api(URLS.SUBMITORDER, data);},
    // 【702】取消订单	POST
    cancelorder(data) {return api(URLS.CANCELORDER, data);},
    // 【700】获取订单信息	POST
    getorderinfo(data) {return api(URLS.GETORDERINFO, data);},
    // 【703】获取订单列表	POST
    getorderlist(data) {return api(URLS.GETORDERLIST, data);},
    // 【704】获取运费信息	POST
    getdeliveryfee(data) {return api(URLS.GETDELIVERYFEE, data);},
    // 【705】完成支付后的信息更新(测试用)	POST
    finishpay(data) {return api(URLS.FINISHPAY, data);},
    // 【706】获取可供配送的日期列表	POST
    getavailabledeliverydate(data) {return api(URLS.GETAVAILABLEDELIVERYDATE, data);},

    // 会员
    // 【801】获取会员地址簿信息	POST
    getcontactlist(data) {return api(URLS.GETCONTACTLIST, data);},
    // 【802】新增地址项信息	POST
    createcontact(data) {return api(URLS.CREATECONTACT, data);},
    // 【803】修改地址项信息	POST
    updatecontact(data) {return api(URLS.UPDATECONTACT, data);},
    // 【804】删除地址簿信息	POST
    deletecontact(data) {return api(URLS.DELETECONTACT, data);},
    // 【805】获取区域信息	POST
    getdistlist(data) {return api(URLS.GETDISTLIST, data);},
};