<template>
     <div class="lebohui-warpper">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
      <div class="lebohui-order-number default">
            订单号：{{orderDeteail.tab_id}}
        </div>
        <div class="lebohui-order-address">
            <div class="lebohui-order-address-item">
                <div class="fs14">场地名称</div>
                <div>羽毛球场 {{orderDeteail.tab_name}} {{orderDeteail.space_name}}</div>
            </div>
             <div class="lebohui-order-address-item">
                <div class="fs14">预定时间</div>
                <div>{{orderDeteail.tab_date}}&nbsp;{{orderDeteail.tab_begin_time}}-{{orderDeteail.tab_end_time}}</div>
            </div>
            <div class="lebohui-order-address-item">
                <div></div>
                <div class="bold fs16">支付金额：￥{{orderDeteail.tab_price | moneyFormat}}</div>
            </div>
        </div>
        <div class="tc mt10" v-if="orderDeteail.tab_status==1">
        <button type="button" class="btn-lebohui btn-lebohui-primary fs18" @click="applyMoeny">申请退订</button>
        </div>
         <div class="tc mt10" v-if="orderDeteail.tab_status==4">
        <button type="button" class="btn-lebohui btn-lebohui-default fs18" >退款中</button>
        </div>
         <div class="tc mt10" v-if="orderDeteail.tab_status==5">
        <button type="button" class="btn-lebohui btn-lebohui-default fs18">已退款</button>
        </div>
          <div class="tc mt10" v-if="orderDeteail.tab_status==2">
        <button type="button" class="btn-lebohui btn-lebohui-default fs18">已关闭</button>
        </div>
        <div class="default pt20 fs16" style="padding:20px;">
            如订单需退订，具体细则如下：
            <br>1、订场后，请按以下方式办理退订：
            <br>· 在运动项目开始消费前一天12:00点以前提出退订，全额退款。
            <br>· 在运动项目开始消费前一天12:00以后一概不退款，由于场地原因除外。
            <br>· 每张储值卡每个月只能退订2次；
            <br>· 退订过程中遇到问题，请致电客服：023-67700906
            <br>2、订场后，办理退场时，如何退款？
            <br>· 办理退款时，在规定时间内退款回您的储值卡账户。
        </div>
      </div>
</template>
<script>
    import lebohuiHeader from '../common/header';
    import * as global from '../../assets/global.js';
    import * as URL from '../../assets/restfull.js'
    export default {
        data: function() {
            return {
                lebohuiTitle: '订单详情',
                params: this.$route.params,
                orderDeteail: Object
            }
        },
        mounted: function() {
            this.getOrderDeteail();
        },
        //
        methods: {
            getOrderDeteail: function() {
                global.fethAsync(URL.LOOK_MEMBER_DETAILS_URL, 'orderId=' + this.params.id, res => {
                    if (res.success) {
                        this.orderDeteail = res.retObj;
                    }
                });
            },
            //申请退款
            applyMoeny: function() {
                global.tipTools('提示', '您确定申请退款吗?', ['确定', '取消'], tip => {
                    global.fethAsync(URL.APPLY_MONGY_URL, 'orderId=' + this.params.id, res => {
                        if (res.success) {
                            global.toast(res.retObj);
                            this.$router.push({
                                path: '/order/0'
                            })
                        } else {
                            global.toast(res.error);
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