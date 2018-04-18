<template>
    <flexbox :gutter="0" wrap="wrap" justify="center">
        <flexbox-item :span="1/2" v-for="(item,index) in list" :key="index">
            <div class="item">
                <img class="img" :src="item.img" alt="">
                <p class="title">{{item.title}}</p>
            </div>
        </flexbox-item>
    </flexbox>
</template>

<script>
import {Flexbox, FlexboxItem} from 'vux';
export default {
    components: {
        Flexbox,
        FlexboxItem
    },
    props: ['list']
};
</script>

<style lang="less" scoped>
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
</style>
