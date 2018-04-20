<template>
    <div id="app">
        <!-- <router-view></router-view> -->
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <!-- <div v-transfer-dom>
            <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
        </div> -->

        <drawer width="200px;" :show.sync="drawerVisibility" :show-mode="showMode" placement="left" :drawer-style="{'background-color':'#35495e', width: '200px'}">
            <!-- drawer content -->
            <div slot="drawer">
                <group title="导航" style="margin-top:20px;">
                    <cell title="首页" link="/" @click.native="drawerVisibility = false"></cell>
                    <cell title="网购" link="lineFirst" @click.native="drawerVisibility = false"></cell>
                    <cell title="新品" link="new/FirstLevel" @click.native="drawerVisibility = false"></cell>
                </group>
                <group title="会员中心" style="margin-top:20px;">
                    <cell title="登录" link="/login" @click.native="drawerVisibility = false"></cell>
                    <cell title="我的订单" link="line/FirstLevel" @click.native="drawerVisibility = false"></cell>
                    <cell title="我的积分" link="new/FirstLevel" @click.native="drawerVisibility = false"></cell>
                    <cell title="咨询" link="consultation/index" @click.native="drawerVisibility = false"></cell>
                </group>
            </div>

            <!-- 无tabbar -->
            <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
                <!-- :right-options="rightOptions" @on-click-more="onClickMore"  -->
                <x-header slot="header" :title="title" :left-options="leftOptions" style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#C19B46;">
                    <span slot="overwrite-left" style="fill:#fff;position:relative;top:-8px;">
                        <span @click="onClickBack" v-if="route.path !== '/'">
                            <x-icon type="ios-arrow-back" size="35"></x-icon>
                        </span>
                        <span @click="drawerVisibility = !drawerVisibility">
                            <x-icon type="navicon" size="35"></x-icon>
                        </span>
                    </span>
                    <span slot="right" style="fill:#000;position:relative;top:-8px;">
                        <span @click="drawerVisibility = !drawerVisibility">
                            <x-icon type="ios-camera" size="35"></x-icon>
                        </span>
                        <span @click="drawerVisibility = !drawerVisibility">
                            <x-icon type="ios-cart" size="35"></x-icon>
                        </span>
                        <span @click="drawerVisibility = !drawerVisibility">
                            <x-icon type="ios-list" size="35"></x-icon>
                        </span>
                    </span>
                </x-header>
                <router-view class="router-view" @changeContactInfo="changeContactInfo"></router-view>
                <!-- <tabbar slot="bottom"></tabbar> -->
                <tabbar slot="bottom" v-show="isContantBarShow">
                    <tabbar-item selected>
                        <span slot="icon" @click="selectContact">
                            <x-icon type="ios-person" size="35"></x-icon>
                        </span>
                    </tabbar-item>
                    <tabbar-item>
                    </tabbar-item>
                    <tabbar-item link="/component/demo">
                    </tabbar-item>
                    <tabbar-item>
                    </tabbar-item>
                </tabbar>
            </view-box>

        </drawer>
    </div>
</template>

<script>
import {Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom} from 'vux'
import {mapState, mapActions} from 'vuex';
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
    computed: {
        ...mapState({
            route: state => state.route,
            path: state => state.route.path,
            isLoading: state => state.vux.isLoading,
        }),
        isContantBarShow() {
            return /product$/.test(this.route.name);
        },
    },
    data() {
        return {
            title: '缤纷',
            drawerVisibility: false,
            showMode: 'overlay',// overlay push
            // route: {
            //     path: ''
            // },
            leftOptions: {
                showBack: true
            },
            rightOptions: {
                showMore: true
            },
            // showMenu: false,
            // menus: {
            //     'language.noop': '<span class="menu-title">Language</span>',
            //     'zh-CN': '中文',
            //     'en': 'English'
            // },
            contactInfo: null
        }
    },
    methods: {
        ...mapActions([]),
        onClickBack() {
            // this.drawerVisibility = !this.drawerVisibility;
            this.$router ? this.$router.back() : window.history.back();
        },
        onClickMore() {
            this.showMenu = true
        },
        // changeLocale(locale) {
        //     console.log(locale);
        // this.$i18n.set(locale)
        // this.$locale.set(locale)
        // },
        selectContact() {
            console.log(this.contactInfo.productuuid);
            this.$router.push({
                name: 'customerservice',
                query: {
                    productuuid: this.contactInfo.productuuid
                }
            });
        },
        changeContactInfo(data) {
            this.contactInfo = data;
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
