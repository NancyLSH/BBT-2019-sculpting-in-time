import $ from "jquery"
const baseUrl = "http://111.230.183.100:5000"
export default {
    getList,
    check,
    commit,
    checkTime
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