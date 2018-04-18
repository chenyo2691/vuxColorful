import router from '../router';
import store from '@/store';

router.beforeEach((to, from, next) => {
    // console.log(`路由跳转${from.path}->${to.path}`);
    store.commit('updateLoadingStatus', {isLoading: true});
    next();
});

router.afterEach((to) => {
    store.commit('updateLoadingStatus', {isLoading: false});
});
