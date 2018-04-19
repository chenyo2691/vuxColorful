<template>
    <div>
        <swiper :list="imgList" style="width:85%;margin:0 auto;" :aspect-ratio="500/800" dots-position="center" @click.native="imgPreview"></swiper>
    </div>
</template>

<script>
import api from '@/api/index.js';
import {Swiper} from 'vux';
export default {
    components: {
        Swiper
    },
    created() {
        let params = this.$route.params;
        if (params.refresh) {
            let NewPage = '_empty' + '?time=' + new Date().getTime() / 1000;
            this.$router.push(NewPage);
            this.$router.go(-1);
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
            data: null,
            imgList: []
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
                        this.imgList.push({
                            url: 'javascript:',
                            img: element.img,
                            // title: '送你一朵fua'
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
            this.$router.push({
                name: 'imgPreview',
                params: {
                    imgList: lst,
                    lstRoute: this.$route
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
