import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/view/common/Home'),
        },
        {
            path: '/lineFirst',
            name: 'lineFirst',
            component: () => import('@/view/line/First')
        },
        {
            path: '/lineSecond',
            name: 'lineSecond',
            component: () => import('@/view/line/Second')
        },
        {
            path: '/lineThird',
            name: 'lineThird',
            component: () => import('@/view/line/Third')
        },
        {
            path: '/productList',
            name: 'productList',
            component: () => import('@/view/line/ProductList')
        },
        {
            path: '/product',
            name: 'product',
            component: () => import('@/view/line/Product')
        },
        {
            path: '/imgPreview',
            name: 'imgPreview',
            component: () => import('@/components/PreviewImg')
        },
        {
            path: '/customerservice',
            name: 'customerservice',
            component: () => import('@/components/CustomerService')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/common/Login')
        },
        {
            path: '/shop',
            name: 'shop',
            component: () => import('@/view/order/Shop')
        }
    ]
})
