<template>
    <swipeout>
        <swipeout-item :disabled="disabled" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
            <div slot="right-menu">
                <swipeout-button @click.native="onButtonClick('fav')" type="primary">Yes</swipeout-button>
                <swipeout-button @click.native="onButtonClick('delete')" type="warn">No</swipeout-button>
            </div>
            <div slot="content" class="vux-1px-t">
                <group>
                    <cell :title="item.productTCName" v-for="(item,index) in list" :key="index" @click.native="clickCell(item)">
                        <img slot="icon" width="100" height="100" style="display:block;margin-right:5px;" :src="item.imageName.primary.img">
                        <div slot="inline-desc">
                            <p class="clamp">{{item.productENName}}</p>
                            <p class="clamp">{{item.specification}}</p>
                            <p class="clamp price">{{`HK $${item.onlinePurchasePrice}`}}</p>
                            <p class="clamp">{{item.remark}}</p>
                        </div>
                    </cell>
                </group>
            </div>
        </swipeout-item>
    </swipeout>
</template>

<script>
import {Swipeout, SwipeoutItem, SwipeoutButton, Cell, Group} from 'vux'
export default {
    components: {
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        Group,
        Cell
    },
    props: ['list'],
    data() {
        return {
            disabled: true
        };
    },
    methods: {
        onButtonClick(swipeoutType) {

        },
        handleEvents(swipeoutType) {

        },
        clickCell(item) {
            this.$emit('clickCell', item);
        }
    }
};
</script>

<style lang="less" scoped>
.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &.price {
    color: #ed3f14;
  }
}
</style>
