<template>
    <div class="lebohui-warpper">
   <div class="lebohui-comm-content" id="lebohui-comm-content">
<div class="fs20">此功能正在研发中...</div>
            
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
        mounted: function() {
            global.doResetHeight();
        },
        methods: {

        }
    }
</script>