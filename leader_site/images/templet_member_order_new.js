/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单
* @author:      刘悦
* @date        2017.12.4
* ---------------------------------------------------------------------------*/
$(function(){
    var templet_date={
        "pageNo":1,
        "pageSize":10
    };

    $.ajax({
        type: "get",
        url: siteConfig.userUrl + "/hshop-user/front/user/userInfo/",
        data: templet_date,
        login: true,
        success_cb: function (data) {

        }
    });
})