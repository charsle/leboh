<template>
     <div class="lebohui-warpper">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
    <div class="lebohui-my-order">
        <div class="lebohui-my-order-header">
             <router-link :to="{path:'/order/0'}" class="default">
                全部
             </router-link>
             <router-link to="/order/1" class="default">未付款</router-link>
             <router-link to="/order/2" class="default">已付款</router-link>
             <router-link to="/order/3" class="default">已退款</router-link>
             <router-link to="/order/4" class="default">已关闭</router-link>
        </div>
         <router-view></router-view>
    </div>
      </div>
</template>
<script>
    import lebohuiHeader from '../common/header';

    export default {
        data: function() {
            return {
                lebohuiTitle: '我的订单'
            }
        },
        components: {
            lebohuiHeader,

        }
    }
</script>
<style>
    .lebohui-my-order-header {
        display: flex;
        background: #fff;
        height: 48px;
        padding: 0 10px;
        justify-content: space-around;
        border-bottom: 1px solid #f2f2f2;
    }
    
    .lebohui-my-order-header a {
        display: block;
        height: 47px;
        line-height: 47px;
        flex: 1;
        text-align: center;
    }
    
    .lebohui-my-order-header .router-link-active {
        border-bottom: 1px solid #10AEFF;
    }
</style>