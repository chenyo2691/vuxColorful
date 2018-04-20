<template>
    <div>
        <group>
            <cell :title="`${index+1}号客服：${item.customerServiceTCName}`" :inline-desc="`联系电话：${item.customerServicePhone}`" v-for="(item,index) in list" :key="index"></cell>
        </group>
    </div>
</template>

<script>
import {Cell, Group} from 'vux'
import api from '@/api/index.js';
export default {
    components: {
        Group,
        Cell
    },
    mounted() {
        let query = this.$route.query;
        if (query.productuuid) {
            this.form.ProductUuid = query.productuuid;
        }
        this.init();
    },
    data() {
        return {
            form: {
                ProductUuid: ''
            },
            list: []
        };
    },
    methods: {
        init() {
            api.online_getcustomerservicelist({
                language: 'tc',
                ProductUuid: this.form.ProductUuid
            }).then(res => {
                if (!res.code) {
                    this.list = res.data.customerServiceList;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
