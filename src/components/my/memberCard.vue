<template>
     <div class="lebohui-warpper">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
      
      <div class="lebohui-order-number default">
           储值卡
        </div>
        <div class="lebohui-member-card">
            <div class="lebohui-member-lists">
            <template v-if="memberCardList!=null">
            <div class="lebohui-member-card-items relative">
                <div class="lebohui-member-card-comm ">
                    <div class="fs20">乐搏汇运动生活馆</div>
                    <div class="">有效期：{{memberCardList.perMonth}}个月</div>
                </div>
                <div class="lebohui-member-card-content">
                    <div>
                        <p>{{memberCardList.cardName}}·忙时享{{memberCardList.busyDiscount}}折,闲时享{{memberCardList.discount}}折</p>
                        <p class="mt10 fs20">{{memberCardList.tab_card_num | formartCard}}</p>
                    </div>
                </div>
                <div class="lebohui-member-card-comm">
                    <div >卡额：¥{{memberCardList.quota}} </div>
                    <div class=""> 余额：¥{{memberCardList.tab_price}}</div>
                </div>
            </div>
            
            <div class="lebohui-order-item-footer tr mt10" style="border: 0;">
               
                <router-link :to="{name:'membertopup',params:{id:memberCardList.tab_base_id+'&'+memberCardList.tab_id}}" type="button" class="btn-lebohui-k-orirage ml10">充值</router-link>
        </div>
        </template>
<template v-else>
            <div class="lebohui-order-item-footer tc" style="border: 0;">
                <router-link to="/choosecard/order" class="btn-lebohui-k-primary">办理新卡</router-link>
        </div>
        </template>
</div>
</div>
<div class="lebohui-order-number default">
    交易记录
</div>
<div class="lebohui-deal-record">
    <template v-if="recodeList.length!=0">
    <div class="lebohui-deal-record-items default" v-for="item of recodeList">
        <div>
            <p>{{item.tab_desc}}</p>
            <p class="mt5">交易编号：{{item.tab_id}}</p>
        </div>
        <div>{{item.tab_price}}</div>
    </div>
    </template>
    <template v-else>
         <div class="lebohui-deal-record-items tc default">
           暂无交易记录
    </div>
     </template>
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
                lebohuiTitle: '储值卡',
                memberCardList: null,
                recodeList: []
            }
        },
        mounted: function() {
            this.queryMemberCardList();
        },
        methods: {
            //查询储值卡
            queryMemberCardList: function() {
                global.fethAsync(URL.GET_MEMBER_CARD_URL, '', res => {
                    if (res.success) {
                        var reuslt = res.retObj;
                        this.memberCardList = reuslt
                        if (reuslt != null) {
                            this.dealRecodeList(reuslt.tab_id);
                        }
                    } else {
                        global.toask('查询失败')
                    }
                })
            },
            dealRecodeList: function(id) {
                global.fethAsync(URL.GET_DEAL_REOCDE_URL, 'tab_card_id=' + id, res => {
                    if (res.success) {
                        this.recodeList = res.retObj
                    } else {
                        global.toask('查询失败')
                    }
                })
            }

        },
        filters: {
            formartCard: function(val) {
                return val.replace(/(\d{4})(?=\d)/g, "$1 ");
            }
        },
        components: {
            lebohuiHeader,

        }
    }
</script>
<style>
    .lebohui-member-card {
        background: #fff;
        padding: 21px 30px 10px 30px;
    }
    
    .lebohui-member-card-items {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.26);
        background: linear-gradient(157deg, #00D2FF 0%, #3A7BD5 100%);
        height: 150px;
        padding: 15px;
        display: flex;
        color: #fff;
        flex-direction: column;
        border-radius: 10px;
    }
    
    .lebohui-member-card-content {
        display: flex;
        flex: 2;
        align-items: center;
    }
    
    .lebohui-member-card-comm {
        display: flex;
        justify-content: space-between;
    }
    
    .lebohui-deal-record {
        padding: 10px 9px 0 9px;
        background: #fff;
    }
    
    .lebohui-deal-record-items {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .lebohui-deal-record-items>div:nth-child(1) {
        flex: 2;
    }
    
    .pay-choose {
        position: absolute;
        right: -5px;
        top: -10px;
        background: #fff;
        height: 26px;
        width: 25px;
        border-radius: 50%;
    }
</style>