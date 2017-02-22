import Vue from 'vue';
import App from '../../components/index/index.vue';
import routes from '../../router/router';
import vueResource from 'vue-resource'
import '../../assets/layer_mobile/need/layer.css'
require('../../assets/layer_mobile/layer')
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(vueResource);
// Vue.use(RadonInstall, {
//     Modal: true
// })
Vue.filter('moneyFormat', money => {
    // return "￥" + money.replace(/[^\d]/g, "").replace(/(\d{1,3})(?=(\d{3})+(\.\d*)?$)/g, '$1,');
    return Number(money).toFixed(2)
})
Vue.filter('timeReset', timestamp => {
    if (timestamp != null) {
        return timestamp.substring(5, timestamp.length);
    }
})
const router = new VueRouter({
    routes: routes
})
new Vue({
    router: router
}).$mount('#app');