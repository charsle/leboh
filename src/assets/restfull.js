const ROOT_PATH = 'http://vx.miux.com.cn/lebh_portal/';
// const ROOT_PATH = 'http://192.168.1.66:80/lebh_portal/';
export const INDEX_URL = ROOT_PATH + "user/spaces/index.do"; //查询首页列表

export const GET_USER_INFO_URL = ROOT_PATH + 'user/getUser.do'; //查询用户信息
export const SEND_MOBILE_CODE_URL = ROOT_PATH + 'user/regist/gainCode.do'; //获取短信验证码
export const SUBMIT_REGISTER_URL = ROOT_PATH + 'user/regist/submit.do' //提交注册

export const QUERY_BY_SPACE_URL = ROOT_PATH + 'user/spaces/queryBySpaceId.do'; //订场地

export const SUBMIT_ORDER_URL = ROOT_PATH + 'user/memberOrder/add.do' //提交订单
export const MY_ORDER_DETAILS_URL = ROOT_PATH + 'user/memberOrder/index.do'; //我的订单详情

export const PAY_ORDER_PAGE_URL = ROOT_PATH + 'user/memberOrder/queryOrderByIds.do'; //支付订单

export const QUERY_MEMBER_CARD_URL = ROOT_PATH + 'user/card/getCardBaseInfo.do' // 查询储值卡
export const GET_MEMBER_CARD_URL = ROOT_PATH + 'user/card/getcard.do' //获取储值卡
export const BING_MEMBER_CARD_URL = ROOT_PATH + 'user/card/bindingCard.do' //绑定储值卡
export const GET_DEAL_REOCDE_URL = ROOT_PATH + 'user/card/getCardRecord.do'; //交易记录

export const CLOSE_MEMBER_ORDER_URL = ROOT_PATH + 'user/memberOrder/close.do'; //关闭参数

export const CARD_PAY_URL = ROOT_PATH + 'user/memberOrder/cardPay.do'; //卡支付
export const WEIXIN_PAY_URL = ROOT_PATH + 'user/pay/ajaxZhiFu.do';
export const GET_MEMBER_CAR_URL = ROOT_PATH + 'user/memberCar/index.do'; // 购物车
export const ADD_MEMBER_CAR_URL = ROOT_PATH + 'user/memberCar/add.do'; // 加入购物车
export const DELETE_MEMBER_CAR_URL = ROOT_PATH + 'user/memberCar/del.do'; //删除购物车
export const LOOK_MEMBER_DETAILS_URL = ROOT_PATH + 'user/memberOrder/detailed.do' //查看购物车详情
export const APPLY_MONGY_URL = ROOT_PATH + 'user/memberOrder/cardRefund.do'; //申请退款

export const CARD_ORDER_ADD_URL = ROOT_PATH + 'user/memberOrder/carOrderadd.do'; //购物车结算