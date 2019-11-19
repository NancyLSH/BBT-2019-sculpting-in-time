import $ from "jquery"
import wx from "weixin-js-sdk"
const baseUrl = "http://111.230.183.100:5000"
const bbt = "https://hemc.100steps.net/2017/wechat/Home/Index/index?state=";

export default {
    getList,
    check,
    commit,
    checkTime,
    wxshare,
    Bindwx
}

function getList(fn) {
    $.ajax({
        url: baseUrl + "/getList",
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: fn
    })
}

function check(question_id, option, fn) {
    $.ajax({
        url: baseUrl + "/check",
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        data: {
            question_id,
            option
        },
        success: fn
    })
}

function commit(fn) {
    $.ajax({
        url: baseUrl + "/commit",
        method: "GET",
        statusCode: {
            403: res => {
                alert(res.responseJSON.message);
            }
        },
        xhrFields: {
            withCredentials: true
        },
        success: fn
    });
}

function checkTime(fn) {
    $.ajax({
        url: baseUrl + "/checktime",
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: fn,
        statusCode: {
            401: () => {
                alert("请先微信登录");
            },
            410: () => {
                alert("活动不在进行中");
            }
        }
    });
}

//微信bind
function Bindwx() {
    location.href = bbt + encodeURIComponent(location.href);
}

function wxshare() {
    //分享到朋友圈
    $.ajax({
        url: "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi",
        type: "post",
        dataType: "json",
        data: {
            url: location.href
        },
        success: function (arr) {
            wx.config({
                debug: false,
                appId: arr.appId,
                timestamp: arr.timestamp,
                nonceStr: arr.nonceStr,
                signature: arr.signature,
                jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"]
            });
            wx.ready(function () {
                wx.updateTimelineShareData({
                    title: "",
                    link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: "",
                    success: function () {
                        console.log("success");
                        // 设置成功
                    }
                });
                wx.updateAppMessageShareData({
                    title: "", // 分享标题
                    desc: "", // 分享描述
                    link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: "", // 分享图标
                    success: function () {
                        console.log("success");
                        // 设置成功
                    }
                });
            });
        }
    });

}