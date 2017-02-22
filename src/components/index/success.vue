<template>
     <div class="lebohui-warpper">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
        <div class="p15" style="background:#fff;">
            <p class="tc fs50 primary"><i class="iconfont icon-smile"></i></p>
            <p class="tc">{{title}}</p>
            <p class="mt10 default">{{messageTxt}}</p>
        </div>
        <div class="tc mt10 fs18" v-if="$route.params.type=='regsuccess'">
        <button type="button" class="btn-lebohui btn-lebohui-primary" @click="operateFun()">去办理储值卡</button>
        </div>
        <div class="tc mt10 fs18">
        <button type="button" class="btn-lebohui btn-lebohui-default" @click="operateReturn()">确定</button>
        </div>
    </div>
</template>
<script>
    import lebohuiHeader from '../common/header';
    export default {
        data: function() {
            return {
                title: '',
                lebohuiTitle: '注册成功'
            }
        },
        computed: {
            messageTxt: function() {
                var type = this.$route.params.type
                if (type == 'regsuccess') {
                    return '您已经注册成功，但是尚未办理储值卡，您可以办理储值卡，即享受会员订场的折扣价！';
                } else if (type == 'bindcard') {
                    return '您已经注册成功，并绑定了储值卡，可以在“储值卡管理”中查看';
                } else if (type == 'paysuccess') {
                    this.title = '订单支付成功'
                    return '您的预订已成功，场地已经订好了，去乐博汇轻松一下吧，不要忘记时间，祝您玩得开心！';
                }
            }
        },
        methods: {
            operateFun: function(type) {
                this.$router.push({
                    path: '/choosecard/order'
                })
            },
            operateReturn: function() {
                this.$router.push({
                    path: '/index'
                })
            }
        },
        mounted: function() {
            // alert(1);
        },
        components: {
            lebohuiHeader
        }
    }
</script>