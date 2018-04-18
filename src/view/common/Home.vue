<template>
    <div class="home-container">
        <panel :list="list" :type="type" @on-img-error="onImgError"></panel>
        <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2" v-for="(item,index) in moduleImgList" :key="index">
                <div class="module" :style="`background-image:url(${item})`" @click="selectModule(index)"></div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
import {Flexbox, FlexboxItem, Panel} from 'vux';
import APPICON from '@/assets/icon/AOS/app/192x192/192.png';
import BOTTOMBG from '@/assets/icon/AOS/standard/1920x1080/9.png';
import LINEBG from '@/assets/icon/AOS/standard/1920x1080/4.png';
import NEWBG from '@/assets/icon/AOS/standard/1920x1080/5.png';
import AUCTIONBG from '@/assets/icon/AOS/standard/1920x1080/6.png';
import SITEBG from '@/assets/icon/AOS/standard/1920x1080/7.png';
export default {
    components: {
        Flexbox,
        FlexboxItem,
        Panel
    },
    data() {
        return {
            APPICON,
            BOTTOMBG,
            moduleImgList: [LINEBG, NEWBG, AUCTIONBG, SITEBG],
            list: [{
                src: APPICON,
                title: '缤纷',
                desc: 'Brighten-Mall'
            }],
            type: '1'
        }
    },
    methods: {
        onImgError(item, $event) {
            console.log(item, $event)
        },
        selectModule(index) {
            if (index === 0) {
                this.$router.push({
                    name: 'lineFirst'
                });
            }
            if (index === 1) {
                console.log(index);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
  .module {
    height: 36vw;
    width: 100%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
    border-radius: 20%;
  }
}
</style>
