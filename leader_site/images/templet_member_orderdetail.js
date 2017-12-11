/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-订单详情
* @author:      刘悦
* @date        2017.12.11
* ---------------------------------------------------------------------------*/

$(function() {
    var templet_date = {
        "orderId": 12
    };
    $.ajax({
        url: siteConfig.userUrl + "/buy/order/order-front/show/",
        data: templet_date,
        login: true,
        success_cb: function (data) {
            var templet_data=data.data;
            $('.orderNo').html(templet_data.orderNo);

            if(templet_data.statusDesc=='待付款'){
                $(".js-pay").show();
            }else{
                // $(".js-pay").hide();
            }
        }
    })
})