<template>
     <div class="lebohui-warpper">
          <div class="lebohui-comm-content" id="lebohui-comm-content">
        <lebohui-header :lebohui-title="lebohuiTitle" v-on:editGoodCar="showCarTotal" show="true"></lebohui-header>
        <div class="lebohui-goods-car">
            <div class="lebohui-goods-car-items" v-for="item of carList">
                <div class="lebohui-goods-car-item lebohui-goods-car-left">
                    <input :id="'c'+item.tab_id" type="checkbox"  :value="item.tab_id+'@'+item.tab_price" class="lebohui-input-icon"  v-model="chooseCars"  >
                    <label :for="'c'+item.tab_id" class="lebohui-input-icon lebohui-input-icon-label"></label>
                </div>
                <div class="lebohui-goods-car-item lebohui-goods-car-right">
                    <div><img src="../../../static/images/badminton_pic_2@3x.png" alt="" width="60"></div>
                    <div class="pl10 fs14">
                        <p class="mt5">购买场馆{{item.tab_name}}羽毛球场{{item.space_name}}</p>
                        <p class="mt5">{{item.tab_date}}&nbsp;&nbsp;{{item.tab_space_time}}</p>
                        <p class="mt5">￥{{item.tab_price | moneyFormat}}</p>
                    </div>
                </div> 
            </div>
        </div>
          </div>
        <div class="lebohui-comm-footer">
            <div class="lebohui-comm-footer-content" >
                <div class="lebohui-comm-footer-item" style="flex:2">
                    <span>
                    <input id="allchoose" type="checkbox" v-model="allChecked" class="lebohui-input-icon" >
                    <label for="allchoose" class="lebohui-input-icon lebohui-input-icon-label"></label>
                    </span>
                    <span class="ml5">全选</span>
                    <span class="bold  va ml5 fs16"><span v-if="!isShowTab">总额：¥{{price | moneyFormat}}</span></span>
                </div>
                <div class="lebohui-comm-footer-item submit-order" v-if="!isShowTab" @click="submitOrder" >
                    <span class="fs18 lebohui-white">去结算({{chooseCars.length}})</span>
                </div>
                <div class="lebohui-comm-footer-item submit-order" v-else="isShowTab" @click="deleteOrder" >
                    <span class="fs18 lebohui-white">删除({{chooseCars.length}})</span>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
    import lebohuiHeader from '../common/header';
    import * as URL from '../../assets/restfull'
    import * as global from '../../assets/global'
    export default {

        data: function() {
            return {
                lebohuiTitle: '我的购物车',
                carList: [],
                chooseCars: [],
                price: 0,
                orderIds: [],
                isShowTab: false

            }
        },
        watch: {
            chooseCars: {
                handler: function() {
                    this.price = 0;
                    var cars = this.chooseCars;
                    this.orderIds = [];
                    for (var i = 0, len = cars.length; i < len; i++) {
                        this.price += Number(cars[i].split('@')[1]);
                        this.orderIds.push(cars[i].split('@')[0])
                    }
                }
            }
        },
        computed: {
            allChecked: {
                get: function() {
                    return this.checkedCount == this.carList.length;
                },
                set: function(value) {
                    var _this = this;
                    if (value) {
                        this.chooseCars = this.carList.map(item => {
                            this.price += Number(item.tab_price);
                            return item.tab_id + '@' + item.tab_price;
                        })
                    } else {
                        this.price = 0;
                        this.chooseCars = []
                    }
                }
            },
            checkedCount: {
                get: function() {
                    return this.chooseCars.length;
                }
            }
        },
        mounted: function() {
            this.getMemberCarList();
            global.doResetHeight();
        },
        methods: {
            showCarTotal: function(msg) {
                console.log()
                this.isShowTab = msg
            },
            //GET_MEMBER_CAR_URL
            getMemberCarList: function() {
                global.fethAsync(URL.GET_MEMBER_CAR_URL, '', res => {
                    if (res.success) {
                        this.carList = res.retObj
                    }
                });
            },
            submitOrder: function() {
                if (this.orderIds.length == 0) {
                    global.toast('请选择购物车订单');
                    return;
                }
                global.fethAsync(URL.CARD_ORDER_ADD_URL, 'carIds=' + this.orderIds.toString(), res => {
                    if (res.success) {
                        sessionStorage.setItem('orderID', res.retObj.ORDER_IDS.toString());
                        this.$router.push({
                            path: '/submit/order'
                        })
                        this.chooseCars = [];
                        this.orderIds = [];
                        this.price = 0;

                    } else {
                        global.toast(res.error);
                    }
                });
            },
            deleteOrder: function() {
                if (this.orderIds.length == 0) {
                    global.toast('请选择购物车订单');
                    return;
                }
                global.tipTools('提示', '您确定删除购物清单吗？', ['确定', '取消'], tip => {
                    global.fethAsync(URL.DELETE_MEMBER_CAR_URL, 'carIds=' + this.orderIds.toString(), res => {
                        if (res.success) {
                            this.getMemberCarList();
                            layer.close(tip);
                            this.orderIds = [];
                        }
                    });
                })
            }
        },
        components: {
            lebohuiHeader
        }
    }
</script>
<style>

</style>