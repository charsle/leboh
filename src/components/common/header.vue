<template>
    <div class="lebohui-common-header">
        <div class="lebohui-back" @click="goBack"><i class="iconfont icon-return"></i></div>
        <div class="lebohui-header-title">{{lebohuiTitle}}</div>
        <div v-if="show">
        <div class="" style="padding: 0 10px;color: #fff;" @click="editGoodCar(show)" v-if="isShow&&isShowD">编辑</div>
        <div class="" style="padding: 0 10px;color: #fff;" @click="overGoodCar(show)" v-else>完成</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['lebohuiTitle', 'show'],
        data: function() {
            return {
                isShowD: true
            }
        },
        computed: {
            isShow: function() {
                return this.show;
            }
        },
        methods: {
            goBack: function() {
                var local = location.href;
                if (local.indexOf('/order/') > 0) {
                    this.$router.push({
                        path: '/my'
                    })
                } else if (local.indexOf('/schedule/') > 0) {
                    this.$router.push({
                        path: '/index'
                    })
                    sessionStorage.removeItem('dateIndex');
                } else {
                    this.$router.go(-1);

                    sessionStorage.removeItem('orderID');

                }
            },
            editGoodCar: function(flag) {
                this.isShowD = false;
                this.$emit('editGoodCar', true);
            },
            overGoodCar: function() {
                this.isShowD = true;
                this.$emit('editGoodCar', false);
            }
        }
    }
</script>