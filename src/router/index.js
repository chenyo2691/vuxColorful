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
            path: 'lineFirst',
            name: 'lineFirst',
            component: () => import('@/view/line/First')
        },
        {
            path: 'lineSecond',
            name: 'lineSecond',
            component: () => import('@/view/line/Second')
        },
        {
            path: 'lineThird',
            name: 'lineThird',
            component: () => import('@/view/line/Third')
        }
    ]
})
