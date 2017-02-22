<template>
     <div class="lebohui-warpper">
           <div class="lebohui-comm-content" id="lebohui-comm-content">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
        <div class="lebohui-order">
            <div class="lebohui-order-icon"> <p class="tc fs50 primary"><i class="iconfont icon-success"></i></p></div>
            <div class="lebohui-order-text">订单提交成功！<br>请在10分钟内完成支付,超时订单会自动取消。</div>
        </div>
        <div class="lebohui-order-address mt10">
            <template v-for="item of orderList">
            <div class="lebohui-order-number default" style="border-bottom:1px solid #f0f0f0;padding-left:0; ">
            订单号：{{item.tab_id}}
           </div>
            <div class="lebohui-order-address-item">
                <div class="fs14">场地名称</div>
                <div>羽毛球-{{item.tab_name}}-{{item.space_name}}</div>
            </div>
             <div class="lebohui-order-address-item">
                <div class="fs14">预定时间</div>
                <div>{{item.tab_date}}  {{item.tab_begin_time}}-{{item.tab_end_time}}</div>
            </div>
            </template>

<div class="lebohui-order-address-item">
    <div></div>
    <div class="bold fs16">订单金额：￥
        <span> {{pay.totolPrice}}</span>
    </div>
</div>
</div>

<div class="lebohui-order-number">
    支付方式
</div>
<div class="lebohui-order-pay">
    <div class="lebohui-order-address-item" v-if="retObj.isMemberCard==1">
        <div><i class="iconfont icon-card fs18 primary va"></i>&nbsp;&nbsp;储值卡支付 <span class="default">余额：{{retObj.price}}元</span></div>
        <div>
            <!--<i class="iconfont icon-success green fs25"></i>-->
            <input id="pay1" type="radio" name="pay" v-model="checkpay" value="1" class="lebohui-input-icon">
            <label for="pay1" class="lebohui-input-icon lebohui-input-icon-label"></label>
        </div>
    </div>
    <div class="lebohui-order-address-item" v-if="retObj.isWxPay==0">
        <div><i class="iconfont icon-weixin fs18 green va"></i>&nbsp;&nbsp;微信支付</div>
        <div>
            <!--<i class="iconfont icon-not-choose default fs25"></i>-->
            <input id="pay2" type="radio" name="pay" v-model="checkpay" value="4" class="lebohui-input-icon">
            <label for="pay2" class="lebohui-input-icon lebohui-input-icon-label"> </label>
        </div>
    </div>
</div>
</div>
<div class="lebohui-comm-footer">
    <div class="lebohui-comm-footer-content">
        <div class="lebohui-comm-footer-item lebohui-submit-order-detaile">
            <div class="default"> 合计：{{pay.totolPrice}}</div>
            <div class="default mt5">实付：{{pay.payPrice}} 优惠￥{{pay.discountPrice}}</div>
        </div>
        <div class="lebohui-comm-footer-item submit-order" @click="payOrder">
            <span class="fs18 lebohui-white">立即支付</span>
        </div>
    </div>
</div>
</div>
</template>
<script>
    import lebohuiHeader from '../common/header';
    import * as URL from '../../assets/restfull.js';
    import * as global from '../../assets/global.js';
    export default {
        data: function() {
            return {
                lebohuiTitle: '订单详情',
                orderIds: sessionStorage.getItem('orderID'),
                retObj: Object,
                orderList: [],
                checkpay: '',
                pay: {},
                isChoose: false
            }
        },
        mounted: function() {
            this.getMyOrderList();
            global.doResetHeight();
        },
        watch: {
            checkpay: {
                handler: function(newVal, oldVal) {
                    if (newVal == 1) {
                        this.pay = {
                            "discountPrice": this.retObj.discountPrice, //卡优惠
                            "payPrice": this.retObj.payPrice, //卡实付
                            "totolPrice": this.retObj.totolPrice // 卡支付
                        }
                    } else {
                        this.pay = {
                            "discountPrice": this.retObj.moneyDiscountPrice, //微信
                            "payPrice": this.retObj.moneyPayPrice, //微信
                            "totolPrice": this.retObj.moneyTotolPrice // 微信
                        }
                    }
                }
            }
        },
        methods: {
            getMyOrderList: function() {
                // console.log(this.orderIds)
                global.fethAsync(URL.PAY_ORDER_PAGE_URL, 'orderIds=' + this.orderIds, res => {
                    if (res.success) {
                        var result = res.retObj;
                        this.retObj = result;
                        this.orderList = result.listOrder;
                        if (result.isMemberCard == '1') {
                            this.checkpay = '1'
                        } else {
                            this.checkpay = '4'
                        }
                    }
                });
            },
            payOrder: function() {
                if (this.checkpay == '1') {
                    this.payMoneyOrder()
                } else if (this.checkpay == '4') {
                    var param = 'type=4&tab_ids=' + this.orderIds
                    console.log(param);
                    global.fethAsync(URL.WEIXIN_PAY_URL, param, res => {
                        if (res.success) {
                            global.weixinJsBrige(this, res, 4)
                        }
                    })
                } else if (this.checkpay == '') {
                    global.toast('请选择支付方式');
                }


            },
            payMoneyOrder() {
                global.tipTools('提示', '您已经提交支付，支付金额：<br>' + this.retObj.payPrice + '元，优惠' + this.retObj.discountPrice + '元', ['确认支付', '取消'], tip => {
                    global.fethAsync(URL.CARD_PAY_URL, 'orderIds=' + this.orderIds, res => {
                        if (res.success) {
                            global.toast('支付成功')
                            layer.close(tip);
                            this.$router.push({
                                path: '/order/2'
                            })
                            sessionStorage.removeItem('orderID');
                        } else {
                            global.toast(res.error)
                        }
                    });
                })
            }
        },
        components: {
            lebohuiHeader,

        }
    }
</script>
<style>
    .lebohui-order {
        padding: 23px 0px;
        display: flex;
        background: #fff;
    }
    
    .lebohui-order-icon {
        padding: 0px 10px;
    }
    
    .lebohui-order-text {
        padding-left: 0 10px;
        line-height: 30px;
    }
    
    .lebohui-order-number {
        padding: 10px;
    }
    
    .lebohui-order-address,
    .lebohui-order-pay {
        background: #fff;
        padding: 0 10px;
    }
    
    .lebohui-order-address-item {
        display: flex;
        justify-content: space-between;
        height: 48px;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .lebohui-submit-order-detaile {
        flex-direction: column;
        text-align: left;
        flex: 2;
    }
    
    .lebohui-submit-order-detaile div {
        width: 100%;
        padding-left: 20px;
    }
</style>