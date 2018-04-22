<template>
    <div>
        <group>
            <cell :title="item.productName" v-for="(item,index) in list" :key="index">
                <div slot="icon">
                    <div style="display: flex;align-items: center;">
                        <label style="margin-right:5px;">
                            <input type="checkbox">
                        </label>
                        <img width="100" height="100" style="margin-right:5px;" :src="item.productImageName.primary.img">
                    </div>
                </div>
                <div slot="inline-desc">
                    <!-- dateFormat(new Date(element.uploadDate), 'YYYY-MM-DD') -->
                    <p class="clamp">{{item.productSpecification}}</p>
                    <p class="clamp">{{new Date(item.deliveryDay) | dateFormat('YYYY-MM-DD')}}</p>
                    <div class="clamp price number">
                        <span>{{`HK $${item.purchasePrice}`}}</span>
                        <inline-x-number :min="0" button-style="round" v-model="item.purchaseQuantity" :step="3" @on-change="change($event,index)"></inline-x-number>
                    </div>
                </div>
            </cell>
        </group>
        <p v-for="i in 100">{{i}}<br></p>
    </div>
</template>

<script>
import {Group, Cell, dateFormat, XNumber, InlineXNumber} from 'vux';
import api from '@/api/index.js';
import storage from '@/utils/xStorage.js';
export default {
    components: {
        Group,
        Cell,
        XNumber,
        InlineXNumber
    },
    filters: {
        dateFormat
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
            let token = '';
            let memberInfo = storage.lStorage.getData('memberInfo');
            if (memberInfo) {
                token = memberInfo.token;
            }
            api.cart_getcartlist({
                token
            }).then(res => {
                if (!res.code) {
                    this.list = res.data.productList;
                }
            });
        },
        change($event, val) {
            console.log($event, val);
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

  &.number {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
}
</style>
