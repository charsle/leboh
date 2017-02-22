<template>
     <div class="lebohui-warpper">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
        <div class="lebohui-goods-car">
            <div class="lebohui-goods-car-items" v-for="item of cardList">
                <div class="lebohui-goods-car-item lebohui-goods-car-right">
                    <div>
                        <div class="lebohui-card">
                            {{item.tab_name}}
                        </div>
                    </div>
                    <div class="pl10">
                        <p class="fs14">卡额:{{item.tab_quota | moneyFormat}}({{item.tab_period_month}}个月有效期)</p>
                        <p>闲时享{{item.tab_discount}}折,忙时享{{item.tab_busy_discount}}折</p>
                        <div class="mt5 orirage">售价：￥{{item.tab_saleprice | moneyFormat}}</div>
                    </div>
                </div> 
                <div class="lebohui-goods-car-item lebohui-goods-car-left" style="padding-right: 0">
                    <input :id="male+item.tab_id" type="radio" v-model="choosecard" class="lebohui-input-icon" name="gender" :value="item.tab_id" >
                    <label :for="male+item.tab_id" class="lebohui-input-icon lebohui-input-icon-label"></label>
                </div>
            </div>
        </div>
        <!--{{choosecard}}-->
          <div class="lebohui-order-number" style="display: none">
           用户信息
        </div>
        <div class="lebohui-user-info" style="display: none">
            <div >手机号码</div>
            <div style="flex:2" class="ml10"><input type="text" name="" value="" placeholder="请输入您的手机号码"></div>
        </div>
        <div class="lebohui-now-pay" @click="weixinPay">立即支付</div>
    </div>
</template>
<script>
    import lebohuiHeader from '../common/header';
    import * as URL from '../../assets/restfull.js';
    import * as global from '../../assets/global.js';
    export default {
        data: function() {
            return {
                lebohuiTitle: '选择储值卡',
                cardList: [],
                choosecard: ''
            }
        },
        mounted: function() {
            this.queryCardInfoList();
        },
        methods: {
            queryCardInfoList: function() {
                global.fethAsync(URL.QUERY_MEMBER_CARD_URL, '', res => {
                    if (res.success) {
                        this.cardList = res.retObj;
                    }
                })
            },
            weixinPay: function() {
                if (this.choosecard == '') {
                    global.toast('请选择您要充值的卡类型!');
                    return;
                }
                var param = 'type=5&tab_card_baseid=' + this.choosecard;
                console.log(param);
                global.fethAsync(URL.WEIXIN_PAY_URL, param, res => {
                    if (res.success) {
                        global.weixinJsBrige(this, res, 5)
                    }
                })
            }
        },
        components: {
            lebohuiHeader,

        }
    }
</script>
<style>
    .lebohui-card {
        border-radius: 5px;
        background: linear-gradient(157deg, #00D2FF 0%, #3A7BD5 100%);
        height: 60px;
        width: 60px;
        color: #fff;
        font-size: 12px;
        justify-content: center;
        display: flex;
        align-items: center;
    }
</style>