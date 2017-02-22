<template>
     <div class="lebohui-warpper">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
        <div class="lebohui-order-address">
            <div class="lebohui-order-address-item">
                <div class="fs14">名称</div>
                <div>{{userInfo.tab_nick_name}}</div>
            </div>
             <div class="lebohui-order-address-item">
                <div class="fs14">手机号码</div>
                <div>{{userInfo.tab_login_account}}</div>
            </div>
            <div class="lebohui-order-address-item">
                <div class="fs14">储值卡类型</div>
                <div>{{userInfo.cardName}}</div>
            </div>
        </div>
        <!--{{userInfo | json}}-->
        <div class="lebohui-order-number">
           用户信息
        </div>
        <div class="lebohui-user-info">
            <div >充值金额</div>
            <div style="flex:2" class="ml10">
                <input type="text" name="" v-model="money"  placeholder="请输入您要充值的金额">
                </div>
        </div>
        <div class="lebohui-now-pay" @click="nowPayMoney(userInfo.cardQuota)">立即支付</div>
    </div>
</template>
<script>
    import lebohuiHeader from '../common/header';
    import * as URL from '../../assets/restfull.js';
    import * as global from '../../assets/global.js';
    export default {
        data: function() {
            return {
                lebohuiTitle: '会员充值',
                money: '',
                userInfo: Object,
                s_id: this.$route.params.id
            }
        },
        mounted: function() {
            // alert(1);
            this.getPayCardInfo();
        },
        methods: {
            getPayCardInfo: function() {
                global.getUserInfo(data => {
                    this.userInfo = data;
                    this.money = data.cardQuota
                })
            },
            nowPayMoney: function(m) {
                var reg = (/^\d+$/g);
                // console.log(this.money)
                if (reg.test(this.money)) {
                    if (Number(this.money) < Number(m)) {
                        console.log(m)
                        global.toast('您的充值金额不能小于您充值卡的金额');
                        // return;
                    } else {
                        var param = 'type=6&tab_card_id=' + this.s_id.split('&')[1] + '&tab_card_baseid=' + this.s_id.split('&')[0] + '&payMoney=' + this.money;
                        // console.log(param);
                        global.fethAsync(URL.WEIXIN_PAY_URL, param, res => {
                            if (res.success) {
                                console.log(res)
                                global.weixinJsBrige(this, res, 6)
                            } else {
                                global.toast(res.message);
                            }
                        })
                    }
                } else {
                    global.toast('您输入的金额不是数字!');
                    this.money = '';
                    return;
                }
            },

        },
        components: {
            lebohuiHeader
        }
    }
</script>
<style>
    .lebohui-user-info {
        display: flex;
        padding: 15px 10px;
        background: #fff;
        align-items: center;
    }
    
    .lebohui-user-info input {
        border: 0;
        background: none;
        width: 100%;
    }
    
    .lebohui-now-pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: #FF5000;
        color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>