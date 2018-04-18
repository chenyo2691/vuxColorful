<template>
    <div class="first-container">
        <flexbox :gutter="0" wrap="wrap" justify="center">
            <flexbox-item :span="1/2" v-for="(item,index) in list" :key="index">
                <div class="item">
                    <img class="img" :src="item.img" alt="">
                    <p class="title">{{item.title}}</p>
                </div>
            </flexbox-item>
        </flexbox>
        <!-- <Twocols :list="list"></Twocols> -->
    </div>
</template>

<script>
import {Flexbox, FlexboxItem} from 'vux';
import api from '@/api/index.js';
import Twocols from '@/components/Twocols.vue';
export default {
    components: {
        Flexbox,
        FlexboxItem,
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
            api.online_getmaincategorylist({language: 'tc', page: 1, pageSize: 5}).then(res => {
                if (!res.code) {
                    let list = [];
                    res.data.mainCategoryList.forEach(function (element) {
                        list.push({
                            img: element.imageUrl,
                            title: element.mainCategoryName
                        });
                    }, this);
                    this.list = list;
                }
            });
        },
        selectItem(item) {
            // this.$f7router.navigate(`/line/SecondLevel/?uuid=${item.mainCategoryUuid}&name=${item.mainCategoryName}`, {
            //     history: true,
            //     animate: false,
            //     ignoreCache: false
            // });
        }
    }
};
</script>

<style lang="less" scoped>
.first-container {
  .item {
    width: 100%;
    height: 60vw;
    text-align: center;

    .img {
      width: 100%;
      max-height: 50vw;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
}
</style>
