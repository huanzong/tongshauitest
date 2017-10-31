/*-----------------------------------------------------------------------------
* @Description:  模板-个人中心-我的晒单
* @author:      刘悦
* @date        2017.10.30
* ---------------------------------------------------------------------------*/

$(function(){
    $.ajax({
        type: "get",
        dataType: "json",
        url: siteConfig.userUrl+"/interaction-comment/comment/myComment/myCommentList/",
        data: {

        },
        success: function(returnData){

        }
    });
});