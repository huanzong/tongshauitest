$(function() {
    $('.js-order-no').text(getRequest().out_trade_no)
    $('.js-total-amount').text('¥' + getRequest().total_amount)
})    


