<template>
    <div>
        <div class="lebohui-home-content-header">
          <div  class="lebohui-home-time default" v-for="(value,key) in arrayDate" @click.stop="queryTypeList(value.date,key)">
               <p>{{value.weeks}}</p>
               <p>{{value.date | timeReset}}</p>
           </div>
        </div>
        <div class="lebohui-home-content">
              <div class="lebohui-home-content-item" v-for="item in resultData">
                  <div class="lebohui-home-content-item-header">
                      <div class="comm">场馆{{item.name}}</div>
                      <div class="comm">
                         <span class="square"></span><span>可预订</span>
                          <span class="square lebohui-gray"></span><span>已预订</span>
                      </div>
                  </div>
                  <div class="lebohui-home-content-item-canvas">
                      <canvas-pie v-for="it in item.floorList" :data-json="it" :date="date" :width="width"></canvas-pie>
                  </div>
              </div>
        </div>
    </div>
   
</template>
<script>
    import jsonData from '../../mockJson/data1';
    import canvasPie from '../../utils/peShap';
    import * as URL from '../../assets/restfull'
    import * as global from '../../assets/global'
    export default {
        props: ['type'],
        data: function() {
            return {
                arrayDate: [],
                resultData: [],
                width: 240,
                date: global.dateFormat()
            }
        },
        mounted: function() {
            this.arrayDate = global.getAfterDate();
            this.queryHomeList();

        },
        methods: {
            queryHomeList: function(date, index) {
                date = date ? date : global.dateFormat();
                index = index ? index : 0;
                sessionStorage.setItem('dateIndex', index)
                global.fethAsync(URL.INDEX_URL, 'date=' + date, res => {
                    if (res.success) {
                        var result = res.retObj;
                        this.resultData = result;
                    }
                });
            },
            queryTypeList: function(date, index) {
                this.date = date;
                this.resultData = [];
                //sessionStorage.setItem('dateIndex', index)
                var lebohui = document.querySelectorAll('.lebohui-home-time')[index];
                $('.lebohui-home-time').css({
                    color: '#929292'
                })
                lebohui.style.color = '#10AEFF'
                this.queryHomeList(date, index)
            }
        },
        components: {
            canvasPie
        }
    }
</script>
<style>
    .lebohui-home-time:first-child {
        color: #10AEFF;
    }
</style>