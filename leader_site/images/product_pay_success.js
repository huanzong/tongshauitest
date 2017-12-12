$(function() {
    if (getRequest().out_trade_no && getRequest().total_amount) {
        $('.js-order-no').text(getRequest().out_trade_no)
        $('.js-total-amount').text('¥' + getRequest().total_amount)
    }
})    


