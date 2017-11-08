/*-----------------------------------------------------------------------------
* @Description:  模板-产品详情页
* @author:      张静
* @date        2017.11.08
* ---------------------------------------------------------------------------*/
//获取价格
$(".js_price").find("span").text(readJsonString(templet_price));//获取最低价格
//获取更多价格
if($('.js_moreProA').find("a").length>3){
    $('.js_morePro .detail-more-price').each(function(){
        var skuValue=$(this).attr("sku_value");
        $(this).find("span").text(readJsonString(skuValue));

    })
}

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


var channelname="<trs_channel id='parent' field='_recurl' URLISABS='true'/>";
var morePro=$(".js_moreProA").find("a").length;
if(morePro==0||morePro<3){
    $.ajax({
        type: "get",
        url:channelname+"/morePro_101.json",
        dataType:"json",
        data: "",
        success_cb: function(data){
            $(".js_moreProA").html("");
            $(".js_moreProB").html("");
            var mroeproA="";
            var mroeproB="";
            for(var j=0; j<data.length-1; j++){
                var pname=data[j].pname;
                var modelno=data[j].modelno;
                var cpms=data[j].cpms;
                var dochref=data[j].dochref;
                var pic=data[j].pic;
                var sku_value=data[j].sku_value;
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
                }

                mroeproA+='<a class="swiper-slide" href="'+dochref+'">';
                mroeproA+='<div class="detail-scene1-img">';
                mroeproA+='<img src='+pic+' /></div>';
                mroeproA+='<div class="detail-more-info">';
                mroeproA+='<div class="detail-more-tit">'+pname+'</div>';
                mroeproA+='<div class="detail-more-titinfo">'+modelno+'</div>';
                mroeproA+='<div class="detail-more-special">'+cpms+'</div>';
                mroeproA+='<div class="detail-more-price" >￥<span>'+minPrice+'</span></div></div></a>';

                mroeproB+='<a class="detail-scene1-img" href="'+dochref+'">';
                mroeproB+=' <img src="'+pic+'" /></a>';
                mroeproB+='<div class="detail-more-info"><div class="detail-more-tit">'+pname+'</div>';
                mroeproB+='<div class="detail-more-titinfo">'+modelno+'</div>';
                mroeproB+='<div class="detail-more-special">'+cpms+'</div>';
                mroeproB+='<div class="detail-more-price">￥<span>'+minPrice+'</span></div></div>';

            }
            $(".js_moreProA").html(mroeproA);
            $(".js_moreProB").html(mroeproB);

        }
    });

}

array(point,"span","js_pointText",'');//功能亮点
array(appendix,"a","js_appendixText","param-attachment-other");//附件信息
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