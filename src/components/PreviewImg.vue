<template>
    <div v-transfer-dom>
        <previewer :list="imgList" ref="previewer" :options="options" @on-close="previewerClose"></previewer>
    </div>
</template>

<script>
import {Previewer, TransferDom} from 'vux';
export default {
    directives: {
        TransferDom
    },
    components: {
        Previewer
    },
    created() {
        let params = this.$route.params;
        if (params.imgList) {
            this.imgList = params.imgList;
            this.lstRoute = params.lstRoute;
        }
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            imgList: [],
            lstRoute: {},
            options: {
                getThumbBoundsFn(index) {
                    return {x: 90, y: 90, w: 180};
                }
            }
        };
    },
    methods: {
        init() {
            this.$refs.previewer.show(0);
        },
        previewerClose() {
            // this.$router ? this.$router.back() : window.history.back();
            // this.$router.back();
            // this.$router.go(-1);
            this.$router.replace({
                name: this.lstRoute.name,
                query: this.lstRoute.query,
                params: {
                    refresh: true
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
