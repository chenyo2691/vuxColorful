<template>
    <div>
        <swiper :list="imgList" :show-desc-mask="false" style="width:85%;margin:0 auto;" :aspect-ratio="500/800" dots-position="center" @click.native="imgPreview"></swiper>
        <group>
            <cell :title="data.productTCName" :inline-desc="data.productENName">
                <div slot="default">
                    <p>{{data.productNumber}}</p>
                    <!-- <x-button mini :gradients="['#1D62F0', '#19D5FD']">商品详情</x-button> -->
                </div>
            </cell>
        </group>

        <group>
            <cell title="商品详情" is-link :border-intent="false" :arrow-direction="showContent003 ? 'up' : 'down'" @click.native="showContent003 = !showContent003"></cell>

            <template v-if="showContent003">
                <cell-box :border-intent="false" class="sub-item">{{data.detailTCContent}}</cell-box>
            </template>

            <cell primary="content">
                <div slot="icon" style="color:#803386">
                    <p>售价</p>
                    <p>Price</p>
                </div>
                <p slot="title" style="margin-left:10px;color:#803386">
                    <span>HK ${{data.onlinePurchasePrice}}</span>
                </p>
                <x-button slot="default" mini :gradients="['#1D62F0', '#19D5FD']">订购</x-button>
            </cell>
        </group>

        <group>
            <calendar @on-change="calendarChange" v-model="demo3" title="选择交货时间" :replace-text-list="replaceList" :disable-date-function="disableDateFunction" :render-function="buildSlotFn"></calendar>
            <cell title="可供订购数量：" :value="atp"></cell>
            <x-number title="订购数量：" :min="0" :max="atp" v-model="buyAmount"></x-number>
        </group>
    </div>
</template>

<script>
import api from '@/api/index.js';
import {Swiper, Cell, Group, XButton, XNumber, Calendar, Tabbar, TabbarItem, CellBox, dateFormat} from 'vux';
export default {
    components: {
        Swiper,
        Cell,
        Group,
        XButton,
        XNumber,
        Calendar,
        Tabbar,
        CellBox,
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
            this.$emit('changeContactInfo', {
                productuuid: query.ProductUuid
            });
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
            quantity: [],
            atp: 0,
            buyAmount: 0,
            imgList: [],
            demo3: '',
            replaceList: {'TODAY': '今'},
            showContent003: false
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
                    // 图片
                    res.data.productInfo.imageName.other.forEach(function (element) {
                        this.imgList.push({
                            url: 'javascript:',
                            img: element.img,
                            title: res.data.productInfo.productTCName
                        });
                    }, this);
                    // 日期与存量
                    res.data.productInfo.quantity.forEach(function (element) {
                        this.quantity.push({
                            uploadDate: dateFormat(new Date(element.uploadDate), 'YYYY-MM-DD'),
                            atp: element.atp
                        });
                    }, this);
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
            let foundDate = this.quantity.find(v => v.uploadDate === date.formatedDate);
            if (foundDate) {
                return false;
            }
            else {
                return true;
            }
        },
        buildSlotFn(line, index, data) {
            let foundDate = this.quantity.find(v => v.uploadDate === data.formatedDate);
            return foundDate !== undefined ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : '<div style="height:19px;"></div>'
        },
        calendarChange(date) {
            let found = this.quantity.find(v => v.uploadDate === date);
            if (found) {
                this.atp = found.atp;
                if (this.atp < this.buyAmount) {
                    this.buyAmount = this.atp;
                }
            }
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

.sub-item {
  color: #888;
}
</style>
