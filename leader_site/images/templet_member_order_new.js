/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单
* @author:      刘悦
* @date        2017.12.4
* ---------------------------------------------------------------------------*/
$(function(){
    var templet_date={
        "pageNo": 1,
        "pageSize": 10
    };

    $.ajax({
        url: siteConfig.userUrl + "/buy/order/order-front/list/",
        data: JSON.stringify(templet_date),
        applicationType:true,
        login: true,
        success_cb: function (data) {

        }
    });
})