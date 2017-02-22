<template>
    <div class="canvas-relate" @click="schedule(dataID,date)">
        <span>{{dataJson.space_num}}</span>
        <canvas :id="docId"></canvas>
        
    </div>
    
</template>
<script>
    import {
        PieShap
    } from './pie';
    import * as global from '../assets/global.js'
    import * as URL from '../assets/restfull.js'
    export default {
        props: ['dataJson', 'width', 'date'],
        data: function() {
            return {
                list: [],
                docId: 'canvas' + (Math.random() * 10000).toFixed(0),
            }
        },
        computed: {
            dataID: function() {
                return this.dataJson.space_id;
            }
        },
        watch: {
            dataJson: {
                handler: function(newVal, oldVal) {
                    this.$nextTick(() => {
                        this.list = newVal;
                    })
                }
            }
        },
        methods: {
            schedule: function(id, date) {
                global.getUserInfo(isUser => {
                    if (isUser.tab_login_account == '' || isUser.tab_login_account == null) {
                        global.tipTools('提示', '您还没有注册，请注册.', ['立即注册', '取消'], tip => {
                            this.$router.push({
                                path: '/register',
                            })
                            layer.close(tip);
                        });
                    } else {
                        this.$router.push({
                            name: 'schedule',
                            params: {
                                id: id,
                                date: date
                            }
                        })
                    }
                })
            },
            showCanvasList: function() {
                var newVal = this.list.length != 0 ? this.list : this.dataJson;
                new PieShap({
                    docEle: this.docId,
                    resultData: newVal.scheduleList,
                    option: {
                        width: this.width,
                        height: this.width,
                        radius: 80
                    }
                }).initElement();
            }
        },
        mounted: function() {
            this.showCanvasList();
        },
    }
</script>
<style>
    .canvas-relate {
        display: block;
        position: relative;
    }
    
    .canvas-relate span {
        position: absolute;
        top: 40%;
        width: 100%;
        font-size: 20px;
        color: #10AEFF;
    }
</style>