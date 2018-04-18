// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import FastClick from 'fastclick';
// 路由与管理
import router from './router/index.js';
import './router/routerMgr.js';

import store from '@/store';
import {sync} from 'vuex-router-sync'

sync(store, router);

require('es6-promise').polyfill();

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');
