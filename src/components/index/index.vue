<template>
   <div class="lebohui-warpper">
       <div class="lebohui-comm-content" id="lebohui-comm-content">
      <div class="lebohui-home-header">
         <div  class="lebohui-header-item" @click="chooseSportsType(0)">
              <dl>
                  <dt class="fs36 tc"><i class="iconfont icon-yumaoqiu1"></i></dt>
                  <dd>羽毛球</dd>
              </dl>
          </div>
          <div class="lebohui-header-item" @click="chooseSportsType(1)">
              <dl>
                  <dt class="fs36 tc"><i class="iconfont icon-pingpangqiu"></i></dt>
                  <dd style="color: #ccc;">乒乓球</dd>
              </dl>
          </div>
          <div class="lebohui-header-item" @click="chooseSportsType(2)">
              <dl>
                  <dt class="fs36 tc"><i class="iconfont icon-more"></i></dt>
                  <dd style="color: #ccc;">更多</dd>
              </dl>
          </div>
      </div>
      <home-list :type="type"></home-list>
      </div>
      <lebohui-menu></lebohui-menu>
   </div>
   
</template>
<script>
    import lebohuiMenu from '../common/menu.vue';
    import homeList from '../index/indexList.vue';
    import * as global from '../../assets/global.js'
    export default {
        data: function() {
            return {
                type: ''
            }
        },
        methods: {
            chooseSportsType: function(type) {
                this.type = type;
            }
        },
        mounted: function() {
            global.doResetHeight();
        },
        components: {
            lebohuiMenu,
            homeList
        }
    }
</script>
<style>
    .lebohui-home-content-header {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .lebohui-home-time {
        flex: 1;
        padding: 0 10px;
        text-align: center;
    }
</style>