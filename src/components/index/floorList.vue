<template>
    <div class="lebohui-home-content">
              <div class="lebohui-home-content-item" v-for="item in resultData.items">
                  <div class="lebohui-home-content-item-header">
                      <div class="comm">场馆{{item.name}}{{queryDate}}</div>
                      <div class="comm">
                         <span class="square"></span><span>可预订</span>
                          <span class="square lebohui-gray"></span><span>已预订</span>
                      </div>
                  </div>
                  <div class="lebohui-home-content-item-canvas">
                      <canvas-pie v-for="it in item.arr" :data-json="it" :width="width" :index="1"></canvas-pie>
                  </div>
              </div>
        </div>
</template>
<script>
    import jsonData from '../../mockJson/data1';
    import canvasPie from '../../utils/peShap';
    import * as URL from '../../assets/restfull'
    export default {
        data: function() {
            return {
                resultData: jsonData.data1,
                width: 240,
                queryDate: this.$route.params.time
            }
        },
        mounted: function() {
            this.queryHomeList();
        },
        watch: {
            '$route': function() {
                this.queryDate = this.$route.params.time
            }
        },
        // computed: {
        //     getFloolData: function() {
        //         this.queryDate = this.$route.params.time
        //     }
        // },
        methods: {
            queryHomeList: function() {
                this.$http.post(URL.INDEX, {
                    data: this.queryDate
                }).then((respone) => {
                    console.log(respone);
                })
            }
        },
        components: {
            canvasPie,
        }
    }
</script>