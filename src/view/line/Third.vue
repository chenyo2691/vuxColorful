<template>
    <div>
        <Twocols :list="list" @click="touchItem"></Twocols>
    </div>
</template>

<script>
import api from '@/api/index.js';
import Twocols from '@/components/Twocols.vue';
export default {
    components: {
        Twocols
    },
    mounted() {
        let query = this.$route.query;
        if (query.MainCategoryUuid) {
            this.form.MainCategoryUuid = query.MainCategoryUuid;
        }
        if (query.middleCategoryUuid) {
            this.form.middleCategoryUuid = query.middleCategoryUuid;
        }
        this.init();
    },
    data() {
        return {
            form: {
                MainCategoryUuid: '',
                middleCategoryUuid: ''
            },
            list: []
        };
    },
    methods: {
        init() {
            api.online_getsubcategorylist({
                language: 'tc',
                page: 1,
                pageSize: 5,
                MainCategoryUuid: this.form.MainCategoryUuid,
                middleCategoryUuid: this.form.middleCategoryUuid,
            }).then(res => {
                if (!res.code) {
                    let list = [];
                    res.data.subCategoryList.forEach(function (element) {
                        list.push({
                            img: element.imageUrl,
                            title: element.subCategoryName
                        });
                    }, this);
                    this.list = list;
                }
            });
        },
        touchItem(item) {
            // this.$router.push({
            //     name: 'lineThird',
            //     query: {
            //         uuid: item.MainCategoryUuid
            //     }
            // });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
