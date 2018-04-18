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
        this.init();
    },
    data() {
        return {
            form: {
                MainCategoryUuid: ''
            },
            list: []
        };
    },
    methods: {
        init() {
            api.online_getmiddlecategorylist({
                language: 'tc',
                page: 1,
                pageSize: 5,
                MainCategoryUuid: this.form.MainCategoryUuid
            }).then(res => {
                if (!res.code) {
                    let list = [];
                    res.data.middleCategoryList.forEach(function (element) {
                        list.push({
                            img: element.imageUrl,
                            title: element.middleCategoryName,
                            middleCategoryUuid: element.middleCategoryUuid
                        });
                    }, this);
                    console.log(list);
                    this.list = list;
                }
            });
        },
        touchItem(item) {
            this.$router.push({
                name: 'lineThird',
                query: {
                    MainCategoryUuid: this.form.MainCategoryUuid,
                    middleCategoryUuid: item.middleCategoryUuid,
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
