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
        this.init();
    },
    data() {
        return {
            list: []
        };
    },
    methods: {
        init() {
            api.online_getmaincategorylist({
                language: 'tc',
                page: 1,
                pageSize: 5
            }).then(res => {
                if (!res.code) {
                    let list = [];
                    res.data.mainCategoryList.forEach(function (element) {
                        list.push({
                            img: element.imageUrl,
                            title: element.mainCategoryName,
                            mainCategoryUuid: element.mainCategoryUuid
                        });
                    }, this);
                    this.list = list;
                }
            });
        },
        touchItem(item) {
            this.$router.push({
                name: 'lineSecond',
                query: {
                    MainCategoryUuid: item.mainCategoryUuid
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
