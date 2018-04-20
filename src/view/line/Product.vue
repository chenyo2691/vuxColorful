<template>
    <div>
        <swiper :list="imgList" :show-desc-mask="false" style="width:85%;margin:0 auto;" :aspect-ratio="500/800" dots-position="center" @click.native="imgPreview"></swiper>
        <group>
            <cell :title="data.productTCName" :inline-desc="data.productENName">
                <div slot="default">
                    <p>{{data.productNumber}}</p>
                    <x-button mini :gradients="['#1D62F0', '#19D5FD']">商品详情</x-button>
                </div>
            </cell>
        </group>

        <group>
            <cell primary="content">
                <div slot="icon" style="color:#803386">
                    <p>售价</p>
                    <p>Price</p>
                </div>
                <p slot="title" style="margin-left:10px;color:#803386">
                    <span>HK ${{data.onlinePurchasePrice}}</span>
                </p>
                <x-button slot="default" mini :gradients="['#6F1BFE', '#9479DF']">订购</x-button>
            </cell>
        </group>

        <group>
            <calendar @on-change="calendarChange" v-model="demo3" title="选择交货时间" :replace-text-list="replaceList" :disable-date-function="disableDateFunction" :render-function="buildSlotFn"></calendar>
            <cell title="可供订购数量：" value="20"></cell>
            <x-number title="订购数量：" :min="-5" :max="8" :value="1"></x-number>
        </group>
    </div>
</template>

<script>
import api from '@/api/index.js';
import {Swiper, Cell, Group, XButton, XNumber, Calendar, Tabbar, TabbarItem} from 'vux';
export default {
    components: {
        Swiper,
        Cell,
        Group,
        XButton,
        XNumber,
        Calendar,
        Tabbar,
        TabbarItem
    },
    created() {
        // console.log(this.$router.history);
        let params = this.$route.params;
        if (params.refresh) {
            let NewPage = '_empty' + '?time=' + new Date().getTime() / 1000;
            this.$router.push(NewPage);
            this.$router.go(-1);
        }
    },
    mounted() {
        let query = this.$route.query;
        if (query.MainCategoryUuid) {
            this.form.MainCategoryUuid = query.MainCategoryUuid;
        }
        if (query.middleCategoryUuid) {
            this.form.middleCategoryUuid = query.middleCategoryUuid;
        }
        if (query.SubCategoryUuid) {
            this.form.SubCategoryUuid = query.SubCategoryUuid;
        }
        if (query.ProductUuid) {
            this.form.ProductUuid = query.ProductUuid;
        }
        this.init();
    },
    data() {
        return {
            form: {
                MainCategoryUuid: '',
                middleCategoryUuid: '',
                SubCategoryUuid: '',
                ProductUuid: ''
            },
            data: {
                productTCName: '',
                productENName: '',
                productNumber: ''
            },
            imgList: [],
            demo3: '',
            replaceList: {'TODAY': '今'}
        };
    },
    methods: {
        init() {
            api.online_getproductinfo({
                language: 'tc',
                ProductUuid: this.form.ProductUuid
            }).then(res => {
                if (!res.code) {
                    this.data = res.data.productInfo;
                    res.data.productInfo.imageName.other.forEach(function (element) {
                        // let img = element.img.replace(/\s/g, '%20');
                        this.imgList.push({
                            url: 'javascript:',
                            img: element.img,
                            title: res.data.productInfo.productTCName
                        });
                    }, this);
                    this.$emit('changeContactInfo', 2);
                }
            });
            // this.data = res.data.productInfo;
            // // 初始化日期与库存
            // if (this.calendarDefault && this.data.quantity.length > 0) {
            //     let first = this.data.quantity[0];
            //     this.formItem.purchaseQuantity = 0;
            //     this.atp = first['atp'];
            //     this.uploadDate = [dateFormat(new Date(first['uploadDate']), 'yyyy-MM-dd')];
            //     this.calendarDefault.setValue([new Date(first['uploadDate'])]);
        },
        imgPreview() {
            let lst = [];
            this.imgList.forEach(function (element) {
                lst.push({
                    src: element.img
                });
            }, this);
            this.$router.replace({
                name: 'imgPreview',
                params: {
                    imgList: lst,
                    lstRoute: this.$route
                }
            });
        },
        disableDateFunction(date) {
            if (date.formatedDate === '2018-04-26') {
                return false;
            }
            else {
                return true;
            }
        },
        buildSlotFn(line, index, data) {
            return '';
            // return /8/.test(data.date) ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : '<div style="height:19px;"></div>'
        },
        calendarChange() {

        }
    }
};
</script>

<style lang="less" scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
</style>
