<template>
<div id="dialog1">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">弹窗标题</strong></div>
            <div class="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" >取消</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="submitData">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            submitData: function() {
                console.log();
                this.$emit('submitData')
            }
        }

    }
</script>