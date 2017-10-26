/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的订单—晒单分享
* @author:      刘悦
* @date        2017.10.19
* ---------------------------------------------------------------------------*/
$(function () {
    var orderId=getQueryString("orderId");
    $.ajax({
        type: "get",
        dataType: "json",
        url: "",
        data: "",
        error : function(XMLHttpRequest, textStatus, errorThrown){
        },
        success: function(returnData){
            if (jQuery.trim(returnData).length > 0) {
                $('.js-productName').html('产品名 <br><span>编码</span>');

            }

        }

})
$('.js-memberShareGetUp').unbind().click(function () {
    var $shareArr=$('.js_shareScoreImg>li');
    var templet_grade=0;
    for(var i=0;i<$shareArr.length;i++){

        if( $shareArr.eq(i).hasClass('member-share-score-selected')){
            templet_grade++;
        }
    }
    
})
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// <li class="member-share-photo-cur"><img src="images/user_img.jpg" alt=""><a href="javascript:;" class="js_sharePhotoDelect member-share-photo-delect">x</a></li>