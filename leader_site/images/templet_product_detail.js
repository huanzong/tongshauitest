/*-----------------------------------------------------------------------------
* @Description:  模板-产品详情页
* @author:      张静
* @date        2017.11.08
* ---------------------------------------------------------------------------*/
//获取价格
/*$(".js_price").find("span").text(readJsonString(templet_price));*///获取最低价格
//获取更多价格
/*
if($('.js_moreProA').find("a").length>3){
    $('.js_morePro .detail-more-price').each(function(){
        var skuValue=$(this).attr("sku_value");
        $(this).find("span").text(readJsonString(skuValue));

    })
}
*/

/*function readJsonString(templet_price){
    var minPrice = 0;
    var jsonObj = eval('(' + templet_price + ')');
    if(jsonObj != null && jsonObj!="" && jsonObj.length>0){
        var currentPrice = 0;
        for(var i=0;i<jsonObj.length;i++){

            currentPrice = jsonObj[i].salePrice;
            if(i==0){
                minPrice=currentPrice;
            }else if(parseInt(minPrice)>parseInt(currentPrice)){
                minPrice = currentPrice;
            }
        }
    }
    return minPrice;
}*/


//更多选择
var morePro=$(".js_moreProA").find("a").length;
if(morePro==0||morePro<3){
    $.ajax({
        type: "get",
        url:templet_channelName+"morePro.json",
        dataType:"json",
        data: "",
        success_cb: function(data){
            $(".js_moreProA").html("");
            $(".js_moreProB").html("");
            var mroeproA="";
            var mroeproB="";
            if(data.length>3){
                for(var j=0; j<data.length-1; j++){
                    var pname=data[j].pname;
                    var modelno=data[j].modelno;
                    var cpms=data[j].cpms;
                    var dochref=data[j].dochref;
                    var pic=data[j].pic;
                    var price=data[j].price;
                    /*var sku_value=data[j].sku_value;
                    var minPrice = 0;
                    if(sku_value != null && sku_value!="" && sku_value.length>0){
                        var currentPrice = 0;
                        for(var i=0;i<sku_value.length;i++){

                            currentPrice = sku_value[i].salePrice;
                            if(i==0){
                                minPrice=currentPrice;
                            }else if(parseInt(minPrice)>parseInt(currentPrice)){
                                minPrice = currentPrice;
                            }
                        }
                    }*/

                    mroeproA+='<a class="swiper-slide" href="'+dochref+'">';
                    mroeproA+='<div class="detail-scene1-img">';
                    mroeproA+='<img src='+pic+' /></div>';
                    mroeproA+='<div class="detail-more-info">';
                    mroeproA+='<div class="detail-more-tit">'+pname+'</div>';
                    mroeproA+='<div class="detail-more-titinfo">'+modelno+'</div>';
                    mroeproA+='<div class="detail-more-special">'+cpms+'</div>';
                    mroeproA+='<div class="detail-more-price" >￥<span>'+price+'</span></div></div></a>';

                    mroeproB+='<a class="detail-scene1-img" href="'+dochref+'">';
                    mroeproB+=' <img src="'+pic+'" /></a>';
                    mroeproB+='<div class="detail-more-info"><div class="detail-more-tit">'+pname+'</div>';
                    mroeproB+='<div class="detail-more-titinfo">'+modelno+'</div>';
                    mroeproB+='<div class="detail-more-special">'+cpms+'</div>';
                    mroeproB+='<div class="detail-more-price">￥<span>'+price+'</span></div></div>';

                }
            }else{
                $(".js_moreTitle").hide();
            }
            $(".js_moreProA").html(mroeproA);
            $(".js_moreProB").html(mroeproB);
            // swiper.moreSwiper.reInit();

            //更多选择
            var screenWidth = document.body.offsetWidth;
            if (screenWidth > 575) {
                // swiper.moreSwiper = new Swiper('.js_swiperMore1', {
                var moreSwiper = new Swiper('.js_swiperMore1', {
                    loop: true,
                    autoplay: 5000,
                    slidesPerView: 3,//滑动展示个数
                    centeredSlides: true,
                    slidesPerGroup: 1//每次滑动移动个数
                    // calculateHeight : true,//Swiper根据slides内容计算容器高度。
    
                });
    
                $('.js_swiperMore_prev').click(function(){
                    moreSwiper.swipePrev(); 
                });
                $('.js_swiperMore_next').click(function(){
                    moreSwiper.swipeNext(); 
                });
            }
           

        }
    });

}

array(point,"span","js_pointText",'');//功能亮点
array(appendix,"span","js_appendixText","param-attachment-other");//附件信息
function array(str,tab,name,className){
    if(str!=''){
        var text=str.split("~");
        var text2="";
        var strHtml="";
        for(var i=0; i<text.length; i++){
            text2=text[i].split("`")[0];
            if(className==''||className==null){
                strHtml+='<'+tab+'>'+text2+'</'+tab+'>';
            }else{
                strHtml+='<'+tab+' class="'+className+'">'+text2+'</'+tab+'>';
            }
        }
        $('.'+name+'').append(strHtml);

    }
}
//获取口碑内容
getCommentData();
function getCommentData(){
    $.ajax({
        url:siteConfig.domain+"/interaction-comment/comment/commentListShow/getContentData/",
        data:{businessId:templet_businessId,pageNo:1,pageSize:3},
        type:"GET",
        dataType:"json",
        success_cb:	function (data){
            if(data.isSuccess==true){
                var commentNum=data.data.entityCount;
                $(".js_comment").find("span").html(commentNum);
                if(data.data.entities.length>=3){
                    $('.js_commentContent .praise-box').html("");
                    var temple_ConHtml='';
                    for (var i = 0; i<3; i++) {
                        var commentTime=data.data.entities[i].commentTime;//时间
                        var content=data.data.entities[i].content;//内容
                        var isHavePic=data.data.entities[i].isHavePic;//判断有误图片 1有 0无
                        var paths=data.data.entities[i].paths;//图片集合
                        var loginAccountName=data.data.entities[i].loginAccountName;//用户名
                        var channelSource=data.data.entities[i].channelSourceStr;//1.官方 2.天猫 3.京东 4.苏宁 5.国美

                        temple_ConHtml+='<div class="o_u o_df_1-3 o_md_2-2 o_sm_2-2 o_xs_2-2">';
                        temple_ConHtml+='<div class="praise-con">';
                        temple_ConHtml+='<div class="detail-praise-box">'+content+'</div>';

                        if(isHavePic==1){//图片
                            temple_ConHtml+='<div class="detail-praise-img">';
                            for(var j=0; j<paths.length&&j<5; j++){
                                temple_ConHtml+='<img src="/tongshuaifile/'+paths[j]+'"/>';
                            }
                            temple_ConHtml+='</div>';
                        }

                        temple_ConHtml+='<div class="detail-praise-font">';

                        var start = "***";//用户名隐藏
                        var nameLength = loginAccountName.length;
                        if (nameLength>=2) {
                            loginAccountName = loginAccountName.substring(0,1) + start + loginAccountName.substring(loginAccountName.length-1,loginAccountName.length)
                        }
                        temple_ConHtml+='<span class="name">'+loginAccountName+'</span>';

                        commentTime=commentTime.replace(/-/g, "/");//时间处理
                        temple_ConHtml+='<span class="time">'+commentTime+'</span>';
                        temple_ConHtml+='<span class="from">来自&nbsp;'+channelSource+'</span>';
                        temple_ConHtml+='</div></div></div>';
                    }
                    $('.js_commentContent .praise-box').html(temple_ConHtml);

                }else{
                    $('.js_commentTitle').hide();
                    $('.js_commentContent').hide();
                }
            }
        }
    });
}
$(function(){
    //口碑参数页吸顶导航跳转功能
    //获取url地址栏信息方法
    var getValue = function (name) {
        var str = window.location.search;
        if (str.indexOf(name) != -1) {
            var pos_start = str.indexOf(name) + name.length + 1;
            var pos_end = str.indexOf("&", pos_start);
            if (pos_end == -1) {
                return str.substring(pos_start);
            } else {
                return str.substring(pos_start, pos_end)
            }
        } else {
            return "";
        }
    }
    if(getValue("urls")){
        var urls = getValue("urls");
        $('.js_navLink').find('a[data-nav='+urls+']').click();
    }
})