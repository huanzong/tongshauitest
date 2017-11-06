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
$(".js_minPrice").each(function(){
    var templet_price=$(this).attr("sku_value");
    if(templet_price==''||templet_price==null){
        $(this).css('display','none');//没有价格隐藏
    }else{
        $(this).find("span").text(readJsonString(templet_price));
    }

})

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
$(".js_recommend").find('a').eq(2).addClass("o_lg-hide o_md-hide o_sm-hide o_xs-hide");
$(".js_recommend").find('a').eq(3).addClass("o_lg-hide o_md-hide o_sm-hide o_xs-hide");
//精选推荐切换
var template_url=window.location.href;
$('.js_recomChange').click(function(){
    $.ajax({
        type: "get",
        dataType:"json",
        url: template_url+"recommend_116.json",
        data: "",
        success_cb: function(data){
            $(".js_recommend").html('');
            var recommendData="";
            var chooseArray=[];
            for(var j=0; j<4; j++){
                while(true){
                    var random=Math.round(Math.random()*(data.length-2));
                    if(!chooseArray[random]){
                        break;
                    }
                }
                chooseArray[random]=true;
                var pname=data[random].pname;
                var modelno=data[random].modelno;
                var dochref=data[random].dochref;
                var pic=data[random].pic;
                var sku_value=data[random].sku_value;
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
                recommendData+='<a class="o_u o_df_1-4 o_lg_1-3 o_md_1-2 o_sm_1-2 o_xs_1-2" href="'+dochref+'">';
                recommendData+='<img src="'+pic+'"/>';
                recommendData+='<div class="recommend-pro-info">';
                recommendData+='<span class="pro-info-title">'+pname+'</span>';
                recommendData+='<span class="pro-info-type">'+modelno+'</span>';
                recommendData+='<span class="pro-info-price js_minPrice">￥<span>'+minPrice+'</span></span>';
                recommendData+='</div></a>';

            }
            $(".js_recommend").html(recommendData);
        }
    });

})


//wcm分页==========start============

function getPageIncss(_currentPage, pageInclude) {
    var Inc = Math.ceil(_currentPage / pageInclude);
    return Inc;
}

function createPageHTMLS(_nPageCount, _nCurrIndex, _sPageName, _sPageExt,_RECORD_COUNT,pageInclude){
    if(_nPageCount<=1){  //一页时不显示
        return "";
    }
    //_nPageCount, _nCurrIndex, _sPageName, _sPageExt,_RECORD_COUNT,pageInclude
    //一共多少页数，当前页数，   首页，		扩展名，，一共多少数据,显示的分页按钮数量
    //第一页
    var firstPage = _sPageName + "." + _sPageExt;
    //上一页
    var previousPage = 0;
    //下一页
    var nextPage = 0;
    //最后一页
    var lastPage = _sPageName + "_" + (_nPageCount - 1) + "." + _sPageExt;
    var pagehtml = '';

    var maxButtons = 4;  //按钮数量
    if (_nPageCount < 4) {
        maxButtons = _nPageCount;
    }

    var currInNum = _nCurrIndex + 1;
    var nCurrIndex = _nCurrIndex || 0;
    if (nCurrIndex != 0) {

    }
    if (nCurrIndex >= 1) {
        var pageIndex = nCurrIndex - 1;
        var firstIndex = _sPageName;
        if (pageIndex != 0) {
            firstIndex = _sPageName + '_' + pageIndex;
        }
        pagehtml += '<a class="l-pagination-prew" href="' + firstIndex + '.' + _sPageExt + '">上一页</a>';

    } else {
        pagehtml += '<a class="l-pagination-prew">上一页</a>';
    }
    var pL = "";
    var curIndex = _nCurrIndex + 1;
    var currInclude = getPageIncss(curIndex, pageInclude);
    var prePage = pageInclude * currInclude;
    if (prePage > _nPageCount) {
        prePage = _nPageCount;
    }

    if (1 != curIndex) {
        pL += '<a class="l-pagination-pagenumber href="' + firstPage + '">1</a> ';

    }

    var temp1 = 5;
    if (_nPageCount <= 6) {
        temp1 = 5;
    }

    if (curIndex > temp1) {
        pL += '<span>...</span>';
    }

    var pageNum = 0;
    for (var pageN = (currInclude - 1) * pageInclude + 1; pageN <= prePage; pageN++) {
        pageNum = pageN;
        if (pageN == (_nCurrIndex + 1)) {
            pL += '<a href="javascript:;" class="l-pagination-pagenumber active">' + pageN + '</a> ';
        }
        else {
            if (pageN != 1 && pageN != _nPageCount)
                pL += '<a class="l-pagination-pagenumber" href="' + _sPageName + '_' + (pageN - 1) + '.' + _sPageExt + '">' + pageN + '</a> ';

        }
    }

    var temp = 2;
    if (_nPageCount <= 6) {
        temp = 5;
    }

    if (curIndex + temp < _nPageCount) {
        pL += '<span>...</span>';
    }

    if (curIndex != _nPageCount) {
        pL += '<a class="l-pagination-pagenumber" href="' + lastPage + '">' + _nPageCount + '</a>';
    }

    pagehtml += pL;

    if (nCurrIndex < _nPageCount - 1) {
        pagehtml += '<a class="l-pagination-next" href="' + _sPageName + "_" + (nCurrIndex + 1) + "." + _sPageExt + '">下一页</a>';
    } else {
        pagehtml += '<a class="l-pagination-next">下一页</a>';
    }

    if (nCurrIndex != _nPageCount - 1) {
        //	pagehtml+='<a href="'+lastPage+'"><b>尾页</b></a>';
    }


    return pagehtml;
}

//wcm分页==========end============
