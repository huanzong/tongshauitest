$(function() {

    $(window).resize(function() {
        init();
    });
    init();

    function init() {
        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;

        // if (screenWidth > 1199) {
        	$('.js_paySystem').find('a').on('click',function(){

                //内容
                var index = parseInt($(this).attr('pay-index'))-1;
                $('.js_paySystemBox').addClass('l-none');
                $('.js_paySystemBox').eq(index).removeClass('l-none');

                //按钮
        		$('.js_paySystem').find('a').removeClass('active');
        		$(this).addClass('active');
        	});
        // }
    }

    console.log(getRequest().code)
    $('.js-pay').on('click', function(){
        orderServer.pay({
            orderId: getRequest().code
        })
    })

    var orderInfo = JSON.parse($.cookie('payCode' + getRequest().code))
    
    $('.js-userinfo').text(orderInfo.userinfo)
    $('.js-address').html('&emsp;' + orderInfo.address)
    $('.js-price').text(orderInfo.price)
});

var orderServer = {
    pay: function (data) {
        $.ajax({
            url: siteConfig.domain + "/buy/order/order-front/pay",
            applicationType: true,
            login: true,
            csrf: true,
            data: JSON.stringify(data),
            success_cb: function (data) {
                if (data.isSuccess) {
                    $('.js-pay-form').html(data.data)
                }
            },
            error_cb: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    console.log('用户未登录');
                }
            }
        });
    }
}