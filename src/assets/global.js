require('whatwg-fetch');
import * as URL from '../assets/restfull';
require('jquery.nicescroll/jquery.nicescroll.min');
/**
 * 计算高度
 */
function doResetHeight() {
    var winHeight = $(window).height();
    var comm_footer = $('.lebohuo-home-footer').height();
    $('#lebohui-comm-content').css({
            height: winHeight - 60,
            'overflow': 'auto'
        })
        // $('#lebohui-comm-content').niceScroll({
        //     cursorcolor: "#000",
        //     oneaxismousemode: false
        // });

}









let wait = 60;
let timer = null;
/**
 * 倒计时
 */
function sendTime(obj) {
    let textId = document.getElementById(obj.target.id);
    if (wait == 0) {
        clearTimeout(timer);
        wait = 60;
        obj.target.removeAttribute('disabled', 'disabled');
        textId.innerHTML = '重新获取';
    } else {
        wait--;
        obj.target.setAttribute('disabled', 'disabled');
        textId.innerHTML = wait + 's'
        timer = setTimeout(() => {
            sendTime(obj);
        }, 1000);
    };
}
/**
 * 封装ajax  fath
 * @param {Object} url 接口路径
 * @param {Object} parmas 接口参数
 * @param {Object} _callback  数据回调
 */
function fethAsync(url, parmas, _callback) {
    parmas = parmas ? parmas : '';
    var fname = url;
    var tt = layer.open({
        type: 2,
        content: '加载中'
    });
    fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        body: parmas
    }).then(respones => {
        if (respones.status == 500) {
            layer.msg('网络异常，请重新登陆')
            setTimeout(() => {
                location.href = "index.html";
            }, 2000)
            return;
        }
        respones.json().then(res => {
            if (_callback !== undefined) {
                _callback(res);
                layer.close(tt);
            }
        });
    });
}
/**
 * 获取用户信息
 */
function getUserInfo(callback) {
    fethAsync(URL.GET_USER_INFO_URL, '', res => {
        if (res.success) {
            // sessionStorage.setItem('userinfo', JSON.stringify(res.retObj))
            var isUser = res.retObj;
            callback(isUser);
        } else {
            toast(res.message)
        }
    });
}
/**
 * 获取当前时间
 */
function dateFormat() {
    var formatDay = new Date();
    var year = formatDay.getFullYear();
    var month = formatDay.getMonth() + 1;
    var day = formatDay.getDate();
    var HH = formatDay.getHours();
    var hh = formatDay.getMinutes();
    var ss = formatDay.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    HH = HH < 10 ? '0' + HH : HH;
    hh = hh < 10 ? '0' + hh : hh;
    ss = ss < 10 ? '0' + ss : ss;
    // var time = year + '-' + month + '-' + day + ' ' + HH + ':' + hh + ':' + ss
    var time = year + '-' + month + '-' + day;
    return time;
}
/**
 * 弹框提示
 */
function tipTools(title, content, btn, calllback) {
    var _this = this;
    var tip = layer.open({
        title: [
            title,
        ],
        anim: 'up',
        content: content,
        btn: btn,
        yes: function() {
            calllback(tip);
        }
    });
}
/**
 * 气泡提示
 */
function toast(content) {
    layer.open({
        content: content,
        skin: 'msg',
        time: 2 //2秒后自动关闭
    });
}

function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};

function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    };
};

function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    };
};


/**
 * 往后5天时间
 */
function getAfterDate() {
    var arrayDate = [];
    var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        // 循环后面六天时间
    var myDate = new Date(); //获取今天日期
    var nowWeek = myDate.getDay();
    myDate.setDate(myDate.getDate());
    var dateTemp, week;
    var flag = 1;
    for (var i = 0; i < 5; i++) {
        dateTemp = myDate.getFullYear() + '-' + ((myDate.getMonth() + 1) > 10 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1)) + "-" + (myDate.getDate() > 10 ? myDate.getDate() : '0' + myDate.getDate());
        week = myDate.getDay();
        if (nowWeek == week) {
            week = '今天'
        } else {
            week = weeks[week]
        }
        arrayDate.push({
            weeks: week,
            date: dateTemp
        })
        myDate.setDate(myDate.getDate() + flag);
    }
    return arrayDate;
}
//微信支付
function weixinJsBrige(that, item, index) {
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": item.appId, //公众号名称，由商户传入     
            "timeStamp": item.timeStamp + "", //时间戳，自1970年以来的秒数     
            "nonceStr": item.nonceStr + "", //随机串     
            "package": item.package1,
            "signType": item.signType, //微信签名方式：     
            "paySign": item.signature //微信签名 
        },
        function(res) {
            //alert(JSON.stringify(res));
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                //成功后是否跳转到其他页面,在此处添加js代码
                if (index == 4) {
                    that.$router.push({
                        path: '/order/2'
                    })
                } else {
                    that.$router.go(-1);
                }

            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
        }
    );

}
module.exports = {
    mobileReg: /^(13|14|15|18|17)[0-9]{9}$/,
    doResetHeight,
    sendTime,
    fethAsync,
    dateFormat,
    tipTools,
    hasClass,
    addClass,
    removeClass,
    toast,
    getAfterDate,
    getUserInfo,
    weixinJsBrige
}