<template>
    <div>
        <div class="icon">
            <img width="80" :src="APPICON" alt="">
        </div>
        <group>
            <x-input label-width="3.5rem" title="会员号" v-model="form.memberNumber" name="memberNumber"></x-input>
            <x-input label-width="3.5rem" title="密码" v-model="form.password" name="password" type="password">
                <!-- <x-button slot="right" type="primary" mini>发送验证码</x-button> -->
            </x-input>
            <x-input label-width="3.5rem" title="验证码" v-model="form.code" name="code" type="text" :max="4">
                <canvas slot="right-full-height" id="myCanvas" width="70px" height="44px" style="float: right; border:1px solid #d3d3d3;" @click="createCode"></canvas>
            </x-input>
        </group>
        <box gap="10px 10px">
            <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="login">登录</x-button>
        </box>
        <box gap="10px 10px">
            <flexbox :gutter="0" justify="space-around">
                <flexbox-item>
                    <span class="flex-item-left">忘记密码？</span>
                </flexbox-item>
                <flexbox-item>
                    <span class="flex-item-right">注册</span>
                </flexbox-item>
            </flexbox>
        </box>
    </div>
</template>

<script>
import storage from '@/utils/xStorage.js';
import api from '@/api/index.js';
import {XInput, XButton, Box, Flexbox, FlexboxItem, Group} from 'vux';
import APPICON from '@/assets/icon/AOS/app/192x192/192.png';
export default {
    components: {
        XInput,
        XButton,
        Box,
        Flexbox,
        FlexboxItem,
        Group
    },
    mounted() {
        this.createCode();
    },
    data() {
        return {
            APPICON,
            form: {
                memberNumber: '',
                password: '',
                code: ''
            },
            code: ''
        };
    },
    methods: {
        createCode() {
            let code = '';
            let codeLength = 4;//验证码的长度，可变
            let canvas = document.getElementById('myCanvas');//获取画布
            let selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

            for (let i = 0; i < codeLength; i++) {
                let charIndex = Math.floor(Math.random() * 36);
                code += selectChar[charIndex];
            }
            this.code = code;
            if (canvas) {
                let ctx = canvas.getContext('2d');
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, 70, 44);
                ctx.font = "20px arial";
                // 创建渐变
                let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                gradient.addColorStop("0", "magenta");
                gradient.addColorStop("0.5", "blue");
                gradient.addColorStop("1.0", "red");
                // 用渐变填色
                ctx.strokeStyle = gradient;
                ctx.strokeText(code, 5, 30);//画布上添加验证码
            }
        },
        login() {
            if (this.form.code !== this.code) {
                this.$vux.toast.text('验证码错误但还是给你通过吧', 'middle');
                this.createCode();
            }
            api.login({language: 'tc', memberNumber: this.form.memberNumber, password: this.form.password}).then(res => {
                if (!res.code) {
                    storage.lStorage.setData('memberInfo', res.data);
                    this.$vux.toast.text('登录成功,欢迎回来', 'middle');
                    this.$router ? this.$router.back() : window.history.back();
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.icon {
  text-align: center;
  margin: 10px 0;
  //   justify-content: space-around;
}

.flex-item-left {
  float: left;
  color: #1d62f0;
}
.flex-item-right {
  float: right;
  color: #1d62f0;
}
</style>
