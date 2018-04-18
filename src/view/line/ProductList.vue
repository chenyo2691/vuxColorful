<template>
    <div>
    </div>
</template>

<script>
import api from '@/api/index.js';
export default {
    components: {
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
        this.init();
    },
    data() {
        return {
            form: {
                MainCategoryUuid: '',
                middleCategoryUuid: '',
                SubCategoryUuid: ''
            },
            list: []
        };
    },
    methods: {
        init() {
            api.online_getproductlist({
                language: 'tc',
                page: 1,
                pageSize: 5,
                MainCategoryUuid: this.form.MainCategoryUuid,
                middleCategoryUuid: this.form.middleCategoryUuid,
                SubCategoryUuid: this.form.SubCategoryUuid,
            }).then(res => {
                if (!res.code) {
                    this.list = res.data.productList;
                }
            });
        },
        touchItem(item) {
            // this.$router.push({
            //     name: 'productList',
            //     query: {
            //         MainCategoryUuid: this.form.MainCategoryUuid,
            //         middleCategoryUuid: this.form.middleCategoryUuid,
            //         SubCategoryUuid: item.middleCategoryUuid,
            //     }
            // });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
