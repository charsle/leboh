<template>
    <div class="lebohui-warpper">
       <div class="lebohui-comm-content" id="lebohui-comm-content">
            <div class="lebohui-my-header">
                <dl class="lebohui-my-photo tc">
                    <dt><img :src="userInfo.tab_headimgurl" alt=""></dt>
                    <dd>{{userInfo.tab_nick_name}}</dd>
                    <!--<dd>{{}}</dd>-->
                </dl>
            </div>
            <!--{{userInfo}}-->
            <div class="lebohui-my-menu">
                <router-link to="/order/0" tag="div">
                    <div class="lebohui-my-menu-icon">
                        <i class="iconfont icon-order fs30 default"></i>
                        <span>我的订单</span>
                    </div>
                    <div class="lebohui-my-menu-arrow tr"><i class="iconfont icon-right default"></i></div>
                </router-link>
                 <router-link to="membercard" tag="div">
                    <div class="lebohui-my-menu-icon">
                        <i class="iconfont icon-card fs30 default"></i>
                        <span>储值卡</span>
                    </div>
                    <div class="lebohui-my-menu-arrow tr"><i class="iconfont icon-right default"></i></div>
                 </router-link>
               <router-link to="/goods" tag="div">
                    <div class="lebohui-my-menu-icon">
                        <i class="iconfont icon-bycar fs30 default"></i>
                        <span>购物车</span>
                    </div>
                    <div class="lebohui-my-menu-arrow tr"><i class="iconfont icon-right default"></i></div>
                </router-link>
               
            </div>

             <div class="tc mt10 fs18">
        <!--<button type="button" class="btn-lebohui btn-lebohui-red" @click="userExit">确定</button>-->
        </div>
       </div>
      <lebohui-menu></lebohui-menu>
   </div>
</template>
<script>
    import lebohuiMenu from '../common/menu.vue';
    import * as global from '../../assets/global.js'
    export default {
        components: {
            lebohuiMenu
        },
        data: function() {
            return {
                userInfo: Object
            }
        },
        mounted: function() {
            global.getUserInfo((res) => {
                this.userInfo = res
            })
            global.doResetHeight();
        },
        methods: {
            userExit: function() {
                var tip = layer.open({
                    title: [
                        '提示',
                    ],
                    anim: 'up',
                    content: '您确定要退出当前账号吗？',
                    btn: ['确认', '取消'],
                    yes: function() {
                        layer.open({
                            content: '退出成功',
                            time: 2,
                            skin: 'msg'
                        });
                        layer.close(tip);
                    }
                });
            }
        }
    }
</script>