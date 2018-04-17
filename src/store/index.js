import Vue from 'vue';
import Vuex from 'vuex';
import vux from './modules/vux';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        vux
    },
    getters
});

export default store;
