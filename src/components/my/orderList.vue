<template>
    <div>
        <template v-for="item of myOrderList">
    <div class="lebohui-order-item" >
         <div class="lebohui-order-item-number fs14">
             <div class="default">订单号：{{item.tab_id}}</div>
             <div class="orirage">{{item.tab_status | status}}</div>
        </div>
        <div class="lebohui-order-item-content">
            <div class="lebohui-order-item-content-left">
                <div><img src="../../../static/images/badminton_pic_2@3x.png" alt="" width="60"></div>
                    <div class="pl10 fs12">
                        <p class="mt5 fs14">羽毛球场{{item.tab_name}}{{item.space_name}}</p>
                        <p class="mt5 default">{{item.tab_date}}&nbsp;{{item.tab_begin_time}}-{{item.tab_end_time}}</p>
                        <p class="mt5 default">{{item.tab_price | moneyFormat}}</p>
                    </div>
            </div>
            <div class="lebohui-order-item-content-right fs16">
                ¥{{item.tab_price | moneyFormat}}
            </div>
        </div>
        <div class="lebohui-order-item-footer tr">
                <button type="button" class="btn-lebohui-k-primary" @click="lookOrderDetails(item.tab_id,item.tab_status)" >查看详情</button>
                <button type="button" class="btn-lebohui-k-primary" v-if="item.tab_status==0" @click="closeOrder(item)">关闭订单</button>
                <button type="button" class="btn-lebohui-k-orirage" v-if="item.tab_status==0" @click="payOrderMoney(item.tab_id)">我要付款</button>
        </div>
    </div>
    </template>
<template v-if="myOrderList.length==0">
         <div style="display: flex;align-items: center; justify-content: center;margin-top:30px;" >暂无数据</div>
    </template>
</div>
</template>
<script>
    import * as URL from '../../assets/restfull.js';
    import * as global from '../../assets/global.js'
    export default {
        data: function() {
            return {
                type: this.$route.params.type,
                myOrderList: []
            }
        },
        watch: {
            '$route' (to, from) {
                this.type = to.params.type;
                this.getOrderList(this.type);
            }
        },
        mounted: function() {
            this.getOrderList(this.type);
        },
        filters: {
            status: function(status) {
                var tip = '';
                switch (status) {
                    case '0':
                        tip = '待支付';
                        break;
                    case '1':
                        tip = '支付成功';
                        break;
                    case '2':
                        tip = '已关闭';
                        break;
                    case '3':
                        tip = '未退款';
                        break;
                    case '4':
                        tip = '退款中';
                        break;
                    case '5':
                        tip = '已退款';
                        break;
                    case '6':
                        tip = '退款失败';
                        break;
                    default:
                        tip = '支付成功';
                        break;
                }
                return tip;
            }
        },
        methods: {
            getOrderList: function(type) {
                global.fethAsync(URL.MY_ORDER_DETAILS_URL, 'type=' + type, res => {
                    if (res.success) {
                        var result = res.retObj.object;
                        this.myOrderList = result;
                    }
                });
            },
            lookOrderDetails: function(id, type) {
                this.$router.push({
                    name: 'orderdetails',
                    params: {
                        id: id
                    }
                })
            },
            closeOrder: function(item) {
                global.tipTools('提示', '您确定要关闭此订单吗?', ['确定', '取消'], tip => {
                    global.fethAsync(URL.CLOSE_MEMBER_ORDER_URL, 'tab_order_id=' + item.tab_id, res => {
                        if (res.success) {
                            // console.log('关闭')
                            this.myOrderList.splice(item, 1);
                            layer.close(tip);
                            global.toast('关闭成功');
                        }
                    });
                })
            },
            payOrderMoney: function(id) {
                sessionStorage.setItem('orderID', id);
                this.$router.push({
                    path: '/submit/order'
                })
            }
        }
    }
</script>
<style>
    .lebohui-order-item {
        padding: 0 10px;
        background: #fff;
    }
    
    .lebohui-order-item-number {
        background: #fff;
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }
    
    .lebohui-order-item-content {
        display: flex;
        padding: 10px;
        align-items: center;
        background: #f2f2f2;
    }
    
    .lebohui-order-item-content-left {
        flex: 3;
        display: flex;
    }
    
    .lebohui-order-item-footer {
        background: #fff;
        padding: 10px;
        border-bottom: 1px solid #C8C7CC;
    }
</style>