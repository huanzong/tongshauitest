/*-----------------------------------------------------------------------------
* @Description:  模板-产品列表页
* @author:      张静
* @date        2017.11.07
* ---------------------------------------------------------------------------*/

//获取产品个数
var template_dataNum=$("div.prolist-box").length;
$(".js_dataNum").text(template_dataNum);
//判断当前tab标签
function cur(){
    $(".js_proNameBox").find("a").each(function(){//pc
        var channelid=$(this).attr("channelid");
        if(channelid==chnlid_owner){//是当前栏目 设置样式
            $(this).addClass("active");
        }else{//不为当前栏目移除样式
            $(this).removeClass("active");
        }
    });
    $(".js_proNameBox2").find("a").each(function(){//移动
        var channelid=$(this).attr("channelid");
        if(channelid==chnlid_owner){//是当前栏目 设置样式
            $(this).addClass("active");
        }else{//不为当前栏目移除样式
            $(this).removeClass("active");
        }
    });
}

//重新绘制价格
/*$(".js_minPrice").each(function(){
    var templet_price=$(this).attr("sku_value");
    if(templet_price==''||templet_price==null){
        $(this).css('display','none');//没有价格隐藏
    }else{
        $(this).find("span").text(readJsonString(templet_price));
    }

})*/

//价格转化获取最小值
function readJsonString(templet_price){
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
}

//精选推荐手机端添加class
$(".js_recommend").find('a').eq(2).addClass("o_md-hide o_sm-hide o_xs-hide");
$(".js_recommend").find('a').eq(3).addClass("o_lg-hide o_md-hide o_sm-hide o_xs-hide");
//精选推荐切换

$('.js_recomChange').click(function(){
    $.ajax({
        type: "get",
        dataType:"json",
        url: template_url+"recommend.json",
        data: "",
        success_cb: function(data){
            if(data.length>4) {
                $(".js_recommend").html('');
                var recommendData="";
                var chooseArray=[];
                for (var j = 0; j < 4; j++) {
                    while (true) {
                        var random = Math.round(Math.random() * (data.length - 2));
                        if (!chooseArray[random]) {
                            break;
                        }
                    }
                    chooseArray[random] = true;
                    var pname = data[random].pname;
                    var modelno = data[random].modelno;
                    var dochref = data[random].dochref;
                    var pic = data[random].pic;
                    var price = data[random].price;

                   /* var sku_value = data[random].sku_value;
                    var minPrice = 0;
                    if (sku_value != null && sku_value != "" && sku_value.length > 0) {
                        var currentPrice = 0;
                        for (var i = 0; i < sku_value.length; i++) {

                            currentPrice = sku_value[i].salePrice;
                            if (i == 0) {
                                minPrice = currentPrice;
                            } else if (parseInt(minPrice) > parseInt(currentPrice)) {
                                minPrice = currentPrice;
                            }
                        }
                    }*/
                    recommendData += '<a class="o_u o_df_1-4 o_lg_1-3 o_md_1-2 o_sm_1-2 o_xs_1-2" href="' + dochref + '">';
                    recommendData += '<img src="' + pic + '"/>';
                    recommendData += '<div class="recommend-pro-info">';
                    recommendData += '<span class="pro-info-title">' + pname + '</span>';
                    recommendData += '<span class="pro-info-type">' + modelno + '</span>';
                    recommendData += '<span class="pro-info-price js_minPrice">￥<span>' + price + '</span></span>';
                    recommendData += '</div></a>';

                }
                $(".js_recommend").html(recommendData);
            }
        }
    });
})


