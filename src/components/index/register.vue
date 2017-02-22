<template>
     <div class="lebohui-warpper">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
        <div class="lebohui-register">点击下方获取验证码按钮，您将收到签名为【乐搏汇运动生活馆】的短信验证码。如果您长时间未收到短信，请拨打人工客服：023-67700906</div>
        <div class="lebohui-verify mt10 ">
            <div class="lebohui-verify-mobile mt10">
                <div>电话号码</div>
                <div class="ml15"><input type="tel" name="" v-model="userphone"  placeholder="请输入您的手机号码"></div>
                <div class="pl5"><button class="blue" @click="sendMobileCode" id="mobileCode">获取验证码</button></div>
            </div>
            <div class="lebohui-verify-code">
                <div>验证码</div>
                 <div class="ml10" style="border-right:0;">
                     <input type="text" name="" v-model="phonecode" placeholder="请输入短信验证码">
                </div>
            </div>
        </div>
        <div class="tc mt10 fs18">
        <button type="button" class="btn-lebohui btn-lebohui-primary" @click="submitRegister">确定</button>
        </div>
    </div>
</template>
<script>
    import lebohuiHeader from '../common/header';
    import * as global from '../../assets/global.js';
    import * as URL from '../../assets/restfull.js';
    export default {
        data: function() {
            return {
                lebohuiTitle: '快速注册成会员',
                userphone: '',
                phonecode: ''
            }
        },
        mounted: function() {
            // alert(1);
        },
        methods: {
            submitRegister: function() {
                if (!global.mobileReg.test(this.userphone)) {
                    global.toast('您输入的手机号码不合法');
                    return;
                }
                if (this.phonecode == '' || this.phonecode.length == 0) {
                    global.toast('验证码不能为空!');
                    return;
                }
                var param = 'phone=' + this.userphone + '&code=' + this.phonecode;
                console.log(param);
                global.fethAsync(URL.SUBMIT_REGISTER_URL, param, res => {
                    if (res.success) {
                        global.toast(res.message);
                        if (res.isCard) {
                            this.$router.push({
                                path: '/index'
                            })
                        } else {
                            this.$router.push({
                                path: '/operate/regsuccess'
                            })
                        }
                    } else {
                        global.toast(res.message);
                    }
                });

            },
            sendMobileCode: function(e) {
                if (!global.mobileReg.test(this.userphone)) {
                    global.toast('您输入的手机号码不合法');
                    return;
                }
                global.fethAsync(URL.SEND_MOBILE_CODE_URL, 'phone=' + this.userphone, res => {
                    if (res.success) {
                        global.sendTime(e);
                        global.toast(res.message);
                    } else {
                        global.toast(res.message);
                    }
                });
            }
        },
        components: {
            lebohuiHeader
        }
    }
</script>