import Home from '../components/index/index';
import RegSuccess from '../components/index/success';
import Register from '../components/index/register';
// import FloorList from '../components/index/floorList';
import Life from '../components/life/app';
import GoodsCar from '../components/my/goodsCar';
import Menu from '../components/common/menu';
import Schedule from '../components/my/schedule';
import MyCenter from '../components/my/app';
import SubmitOrder from '../components/my/submitOrder';
import MyOrder from '../components/my/myOrder';
import OrderList from '../components/my/orderList';
import OrderDetails from '../components/my/orderDetails';
import MemberCard from '../components/my/memberCard';
import MemberTopUp from '../components/my/memberTopUp';
import ChooseCard from '../components/my/chooseCard';
import IndexList from '../components/index/indexList';
module.exports = [
    { path: '', redirect: '/index' },
    {
        path: '/index',
        component: Home,
        children: [{
            path: 'sports',
            component: IndexList,
        }]
    },
    { path: '/register', name: 'register', component: Register },
    { path: '/goods', name: 'goods', component: GoodsCar },
    { path: '/operate/:type', name: 'operate', component: RegSuccess },
    { path: '/schedule/:id/:date', name: 'schedule', component: Schedule },
    { path: '/life', name: 'lift', component: Life },
    { path: '/my', name: 'my', component: MyCenter },
    { path: '/submit/order', name: 'submit', component: SubmitOrder },
    {
        path: '/order',
        name: 'order',
        component: MyOrder,
        children: [
            { path: ':type', component: OrderList },
        ]
    },
    { path: '/orderdetails/:id', name: "orderdetails", component: OrderDetails },
    { path: '/membercard', name: 'membercard', component: MemberCard },
    { path: '/membertopup/:id', name: 'membertopup', component: MemberTopUp },
    { path: '/choosecard/order', name: 'choosecard', component: ChooseCard },

]