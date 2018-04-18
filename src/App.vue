<template>
    <div id="app">
        <!-- <router-view></router-view> -->
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <div v-transfer-dom>
            <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
        </div>

        <drawer width="200px;" :show.sync="drawerVisibility" :show-mode="showMode" placement="left" :drawer-style="{'background-color':'#35495e', width: '200px'}">
            <!-- drawer content -->
            <div slot="drawer">
                <group title="导航" style="margin-top:20px;">
                    <cell title="首页" link="/" @click.native="drawerVisibility = false"></cell>
                    <cell title="网购" link="line/FirstLevel" @click.native="drawerVisibility = false"></cell>
                    <cell title="新品" link="new/FirstLevel" @click.native="drawerVisibility = false"></cell>
                </group>
                <group title="会员中心" style="margin-top:20px;">
                    <cell title="登录" link="/" @click.native="drawerVisibility = false"></cell>
                    <cell title="我的订单" link="line/FirstLevel" @click.native="drawerVisibility = false"></cell>
                    <cell title="我的积分" link="new/FirstLevel" @click.native="drawerVisibility = false"></cell>
                    <cell title="咨询" link="consultation/index" @click.native="drawerVisibility = false"></cell>
                </group>
            </div>

            <!-- 无tabbar -->
            <!-- body-padding-bottom="55px" -->
            <view-box ref="viewBox" body-padding-top="46px">
                <x-header slot="header" :title="title" :left-options="leftOptions" :right-options="rightOptions" @on-click-more="onClickMore" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
                    <span slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
                        <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
                    </span>
                </x-header>
                <router-view class="router-view"></router-view>
                <tabbar slot="bottom"></tabbar>
            </view-box>

        </drawer>
    </div>
</template>

<script>
// import api from '@/api/index.js';
// import {Loading} from 'vux';
// import {mapState} from 'vuex';
import {Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom} from 'vux'
import {mapState, mapActions} from 'vuex'
import store from '@/store';
export default {
    name: 'app',
    directives: {
        TransferDom
    },
    components: {
        Radio,
        Group,
        Cell,
        Badge,
        Drawer,
        ButtonTab,
        ButtonTabItem,
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Loading,
        Actionsheet
    },
    mounted() {
        // api.online_getmaincategorylist({language: 'tc', page: 1, pageSize: 5}).then(res => {
        //   console.log(res, 'ok');
        // });
    },
    computed: {
        isLoading() {
            return store.state.vux.isLoading;
        }
        // ...mapState({
        //   isLoading: state => state.vux.isLoading
        // })
    },
    data() {
        return {
            title: '缤纷',
            drawerVisibility: false,
            showMode: 'overlay',// overlay push
            route: this.$route,
            leftOptions: {
                showBack: true
            },
            rightOptions: {
                showMore: true
            },
            showMenu: false,
            menus: {
                'language.noop': '<span class="menu-title">Language</span>',
                'zh-CN': '中文',
                'en': 'English'
            }
        }
    },
    methods: {
        onClickMore() {
            this.showMenu = true
        },
        changeLocale(locale) {
            console.log(locale);
            // this.$i18n.set(locale)
            // this.$locale.set(locale)
        }
    }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/close.less";

html,
body {
  background-color: #fbf9fe;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  #app {
    width: 100%;
    height: 100%;
  }
}

.router-view {
  width: 100%;
  top: 46px;
}
</style>
