$(function() {
    if (getRequest().out_trade_no && getRequest().total_amount) {
        $('.js-order-no').text(getRequest().out_trade_no)
        $('.js-total-amount').text('¥' + getRequest().total_amount)
    }

    $('.js-router-to').on('click',function(){
        window.location.href = siteConfig.orderListUrl
    })

    // 倒计时跳转至订单列表页
    var timer = setInterval(function(){
        var last = parseInt($('.js-interval').text())
        if (last > 0){
            $('.js-interval').text(last-1)
        } else {
            clearInterval(timer)
            window.location.href = siteConfig.orderListUrl
        }
    },1000)
})    


