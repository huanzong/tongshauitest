$(function() {
    init();

    $(window).resize(function() {
        init();
    });
    function init() {

        var screenWidth = document.body.offsetWidth;
        var screenHeight = document.body.offsetHeight;
        var loginHeight = $('.js_center').height();
        if (screenWidth >= 992) {
            setTimeout(function() {
                $('.js_center').css('margin-top',((screenHeight-loginHeight)/2-60)+'px');
            }, 10);
        }
        if(screenWidth >= 576){
            $(".js_picbox").css({"height":screenHeight});
        }
        $(".js_pic").css({"height":screenHeight,"margin-top":-screenHeight/2});
        var picWidth= $(".js_pic").width();
        $(".js_pic").css({"margin-left":-picWidth/2});




        //倒计时
        sendTime();
        var wait = 5;
        function sendTime() {
            if (wait == 0) {
                //window.location.href =""
                wait = 5;
            } else {
                $("#js_time").html(wait);
                wait--;
                var activecodetime= setTimeout(function() {
                    sendTime()
                },1000)
            }
        }
    }
});