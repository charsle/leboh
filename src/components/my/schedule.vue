<template>
     <div class="lebohui-warpper">
          <div class="lebohui-comm-content" id="lebohui-comm-content">
        <lebohui-header :lebohui-title="lebohuiTitle"></lebohui-header>
        <div class="lebohui-home-content-header">
            <div  class="lebohui-home-time default" v-for="(value,key) in arrayDate" @click="queryTypeList(value.date,key)">
               <p>{{value.weeks}}</p>
               <p>{{value.date | timeReset}}</p>
           </div>
        </div>
        <!--{{suchArray | json}}-->
        <div class="lebohui-schedule mt10">
            <div class="lebohui-schedule-header ">
                <div class="comm-schedule">
                <span class="square lebohui-green"></span><span>我预订</span>
                <span class="square"></span><span>可预订</span>
                 <span class="square lebohui-gray"></span><span>已预订</span>
                  <span class="square lebohui-light-gray"></span><span>已过期</span>
                </div>
            </div>
            <div class="lebohui-schedule-content">
                <div class="lebohui-schedule-item mt5" v-for="(value,key) of jsond" >
                    <div class="lebohui-schedule-item-header lebohui-b-primary">{{value.begin}}-{{value.end}}</div>
                    <div  class="lebohui-schedule-item-content fs20 mt1" :class="[value.is_schedule == 2 ? 'lebohui-green lebohui-white' : value.is_schedule == 0 ? 'lebohui-gray lebohui-white' : value.is_schedule == 3 ? 'lebohui-light-gray':'lebohui-not-choose']" @click="chooseSchedule(value,key)" >
                        ¥{{value.price}}
                    </div>
                </div>
            </div>
        </div>
          </div>
        <div class="lebohuo-home-footer">
          <div class="lebohuo-home-footer-content">
            <div class="lebohui-footer-item" style="flex:1" @click="buyGoodsCar">
              <dl class="relative">
                  <dt ><i class="iconfont icon-bycar1 fs20" ></i><i class="circle fs14" v-if="goodsLen>0">{{goodsLen}}</i></dt>
                  <dd>购物车</dd>
              </dl>
          </div>
          <div  class="lebohui-footer-item lebohui-schedule-footer-item join-buy-car" @click="joinGoodsByCar">
              <dl>
                  <dd class="fs16">加入购物车</dd>
              </dl>
         </div>
          <div  class="lebohui-footer-item lebohui-schedule-footer-item submit-order" @click="submitOrder">
              <dl>
                  <dd class="fs16">提交订单</dd>
              </dl>
          </div>
        </div>
        </div> 
    </div>
</template>
<script>
    import jsonData from '../../mockJson/data1';
    import lebohuiHeader from '../common/header';
    import * as global from '../../assets/global.js';
    import * as URL from '../../assets/restfull.js'
    export default {
        data: function() {
            return {
                arrayDate: [],
                suchArray: [],
                jsond: [],
                params: this.$route.params,
                lebohuiTitle: '',
                goodsLen: 0
            }
        },
        filters: {
            filterGray: function(val) {
                console.log(val);
                var nowDay = new Date();
                var hours = nowDay.getHours();
                var begin = val.begin.split(':')[0];
                if (hours < begin) {
                    console.log(1);
                    return 'lebohui-gray lebohui-white'
                } else {
                    return
                }

            }
        },
        watch: {
            '$route': function(to, from) {
                // console.log(to.params)
                this.params = to.params;
            }
        },
        mounted: function() {
            // alert(1);
            this.querySpaceList();
            global.doResetHeight();
            setTimeout(() => {
                var dateIndex = sessionStorage.getItem('dateIndex')
                this.queryTypeList(this.params.date, dateIndex)
            }, 100)
        },
        components: {
            lebohuiHeader
        },
        methods: {
            //获取列表
            querySpaceList: function(date) {
                this.suchArray = [];
                date = date ? date : this.params.date;
                var param = 'date=' + date + '&space_id=' + this.params.id
                this.arrayDate = global.getAfterDate();
                global.fethAsync(URL.QUERY_BY_SPACE_URL, param, res => {
                    if (res.success) {
                        var result = res.retObj
                        this.jsond = result.scheduleList;
                        this.lebohuiTitle = '羽毛球' + result.space_name;

                    }
                });
            },
            //选择场地
            chooseSchedule: function(item, index) {
                var current = document.querySelectorAll('.lebohui-schedule-item-content')[index];

                if (item.is_schedule == 1) {
                    if (global.hasClass(current, 'lebohui-green')) {
                        global.removeClass(current, 'lebohui-green');
                        var arr = this.suchArray;
                        for (let i = 0, len = arr.length; i < len; i++) {
                            var tt = (item.begin + '-' + item.end);
                            if (arr[i] == tt) {
                                this.suchArray.splice(i, 1);
                            }
                        }
                    } else {
                        this.suchArray.push(item.begin + '-' + item.end);
                        global.addClass(current, 'lebohui-green');
                    }
                } else {
                    global.tipTools('提示', '次场地已经被预订，请选择其他场地', ['确定'], tip => {
                        layer.close(tip);
                    });
                }
            },
            //加入购物车
            joinGoodsByCar: function() {
                var arr = this.suchArray.length;
                var param = 'tab_date=' + this.params.date + '&tab_space_id=' + this.params.id + '&tab_space_time=' + this.suchArray.toString();
                console.log(param);
                if (arr > 0) {
                    this.goodsLen = arr;
                } else {
                    this.suchArray = [];
                }
                global.fethAsync(URL.ADD_MEMBER_CAR_URL, param, res => {
                    if (res.success) {
                        if (res.success) {
                            global.toast('加入成功');
                        } else {
                            global.toast('加入失败');
                        }
                    }
                });
            },

            //进入购物车
            buyGoodsCar: function() {
                this.$router.push({
                    path: '/goods'

                })
            },
            //提交订单
            submitOrder: function() {
                if (this.suchArray.length == 0) {
                    global.toast('亲,您还没有选择场地.');
                    return;
                }
                var param = 'tab_date=' + this.params.date + '&tab_space_id=' + this.params.id + '&tab_space_time=' + this.suchArray.toString();
                // console.log(param)
                // return;
                global.fethAsync(URL.SUBMIT_ORDER_URL, param, res => {
                    if (res.success) {
                        sessionStorage.setItem('orderID', res.retObj.ORDER_IDS.toString());
                        this.$router.push({
                            path: '/submit/order'
                        })
                        this.suchArray = [];
                    } else {
                        global.toast(res.error);
                    }
                })
            },
            queryTypeList: function(date, index) {
                // this.params = {
                //     id: this.params.id,
                //     date: date
                // };
                this.$router.push({
                    name: 'schedule',
                    params: {
                        id: this.params.id,
                        date: date
                    }
                })

                sessionStorage.setItem('dateIndex', index)
                $('.lebohui-not-choose').removeClass('lebohui-green')
                var lebohui = document.querySelectorAll('.lebohui-home-time')[index];
                $('.lebohui-home-time').css({
                    color: '#929292'
                })
                lebohui.style.color = '#10AEFF';
                this.querySpaceList(date)
            }
        }

    }
</script>
<style>
    .lebohui-light-gray {
        background: #f0f0f0;
    }
</style>