/**========================================================
 * @author Norman
 *
 * 筛选器和对比功能
 * */
//====================初始化筛选器===================================

$(function () {
    //初始化筛选器,读取xml文件
    //if(currentScreenWidth> 1199){
    readXmlFile(url);
    //}else{
    mobileReadXmlFile(url);
    //}
 
})
//默认分页信息
var curPage = 1;
var pageSize = 24;
var order = "";
//查询条件
var searchWord = "";
//选中的筛选项集合
var isSelectItemStr = "";
//查询条件数组
var query = [];
var _tableName = "";
//wcm xml
var url = "filter.xml";
//当前路径
var currentUrl = window.location.href;
//xml路径
var _xmlPath = currentUrl.substring(0, currentUrl.lastIndexOf("/")) + "/" + url;

//读取配置文件
function readXmlFile(url) {
    var html = "";
    var filterTypeName = "";
    var searchItemName = "";
    var filterItemName = "";
    var filterItemQuery = "";
    var itemId = "";
    $.ajax({
        type: 'get',
        dataType: 'xml',
        url: url,
        success: function (xml) {
            var viewName = $(xml).find("Filter").attr("viewName");
            _tableName = viewName;
            //初始化内容
            $(xml).find("optiongroup").each(function (index) {
                itemId = $(this).attr("id");
                searchItemName = $(this).attr("inputName");
                filterTypeName = $(this).attr("name");
                if (index > 3) {
                    html += '<div class="filter-line o_df-hide">';
                } else {
                    html += '<div class="filter-line">';
                }
                if (index % 2 == 0) {
                    html += '<div class="filter-sole mar-right">';
                } else {
                    html += '<div class="filter-sole mar-left">';
                }
                html += '<span class="sole-title" tag="' + itemId + '" inputName="' + searchItemName + '">' + filterTypeName + '：</span>';
                //解析option
                $(this).find("option").each(function (index1) {
                    filterItemName = $(this).attr("name");

                    filterItemQuery = "(" + $(this).attr("query") + ")";
                    html += '<span class="sole-type" query="' + filterItemQuery + '" id="' + jQuery(this).attr("id") + '" tag="' + itemId + '" inputName="' + searchItemName + '">' + filterItemName + '</span>';
                });

                html += '</div>';
                html += '</div>';

            })
            $(html).insertBefore(".list-more");
            setTimeout(noneShaiXuan(), 1000);
            filterItemOnclick("sole-type");
            //对比初始化函数
            setTimeout(initCookie(), 1000);
            setTimeout(initLoadCookie(), 1000);
        },
        error: function () {
            setTimeout(noneShaiXuan(), 1000);
            //删除对比选项监听
            setTimeout(initCookie(), 1000);
            setTimeout(initLoadCookie(), 1000);
            filterItemOnclick("sole-type");
        }
    });
}

//读取配置文件
function mobileReadXmlFile(url) {
    var html = "";
    var filterTypeName = "";
    var searchItemName = "";
    var filterItemName = "";
    var filterItemQuery = "";
    var itemId = "";
    $.ajax({
        type: 'get',
        dataType: 'xml',
        url: url,
        success: function (xml) {
            var viewName = $(xml).find("Filter").attr("viewName");
            _tableName = viewName;
            //初始化内容
            $(xml).find("optiongroup").each(function (index) {
                itemId = $(this).attr("id");
                searchItemName = $(this).attr("inputName");
                filterTypeName = $(this).attr("name");
                html += ' <li><span class="list-tit" tag="' + itemId + '" inputName="' + searchItemName + '">' + filterTypeName + '：</span>';
                html += '<div class="list-line">';
                //解析option
                $(this).find("option").each(function (index1) {
                    filterItemName = $(this).attr("name");

                    filterItemQuery = "(" + $(this).attr("query") + ")";
                    html += '<a class="l-btn-sm list-btn" query="' + filterItemQuery + '" id="' + jQuery(this).attr("id") + '" tag="' + itemId + '" inputName="' + searchItemName + '">' + filterItemName + '</a>';
                });

                html += '</div>';
                html += ' </li>';

            })
            $(".layer-list").html(html);
            setTimeout(noneShaiXuan(), 1000);
            filterItemOnclick("list-btn");
            //对比初始化函数
            /*setTimeout(initCookie(),1000);
             setTimeout(initLoadCookie(),1000);*/
        },
        error: function () {
            setTimeout(noneShaiXuan(), 1000);
            filterItemOnclick("list-btn");
        }
    });
}

//检索产品方法
function search(sword, _tableName, _xmlPath, _curPage, _pageSize, order, searchTerm) {
    var searchHtml = "";
    $.ajax({
        type: "get",
        dataType: "json",
        url: siteConfig.domain +"/interaction-search/front/search/filterProduct/",
        data: {
            "tableName": _tableName,
            "xmlPath": _xmlPath,
            "searchWord": sword,
            "strOrder": order,
            "currentPage": _curPage,
            "pageSize": _pageSize,
            "searchTerm": searchTerm
        },
        success: function (data) {

            if(data.isSuccess){
                var filterItemList = data.data.filter.optionGroup;
                //互斥操作
                displayFilterItem(filterItemList);
                var returnData = data.data.productList.entities;
                var allPageCount = data.data.productList.pageCount;
                var currentPageNo = data.data.productList.pageNo;
                //var currentPageNo = data.data.productList.pageS;
                if (returnData.length >= 1) {
                    for (var i = 0; i < returnData.length; i++) {
                        //是否退市
                        var sfts = returnData[i].sfts;
                        //产品图片
                        var picUrl = returnData[i].appfile;
                        //产品链接
                        var docPubUrl = returnData[i].docpuburl;
                        //是否人气
                        var rqcp = returnData[i].rqcp;
                        //上市时间
                        var sssj = returnData[i].shangshishijian;
                        //产品名称
                        var pName = returnData[i].pname;
                        //产品型号
                        var modelNo = returnData[i].modelno;
                        //价格
                        var price = readJsonString(returnData[i].sku_values);//returnData[i].price;
                        //产品特性标签
                        var cxtxbq = returnData[i].cxtxbq;
                        //核心卖点
                        var hxmd = returnData[i].hxmd;
                        //产品类型
                        var cplx = returnData[i].cplx;
                        //产品分类
                        var cpfl = returnData[i].cpfl;
                        //当前时间
                        var curDate = new Date().getTime();
                        //上市时间处理
                        var newsssj = new Date(sssj).getTime();
                        var bdate = 180 * 24 * 3600 * 1000;
                        //if(sfts=="否"){//判断是否下市
                        //图片处理
                        if (picUrl == "" || picUrl == null) {

                        } else {
                            picUrl = docPubUrl.substring(0, docPubUrl.lastIndexOf("/")) + "/" + picUrl;
                        }
                        searchHtml += '<div class="o_u o_df_1-4 o_lg_1-3 o_md_1-2 o_sm_2-2 o_xs_2-2">';
                        searchHtml += '<div class="prolist-box">';
                        if (rqcp == "是") {
                            searchHtml += '<span class="l-tag-radius l-tag-green pro-tag">人气</span>'
                        }
                        if ((curDate - newsssj) <= bdate) {
                            searchHtml += '<span class="l-tag-radius l-tag-blue pro-tag">新品</span>';
                        }
                        searchHtml += '<div class="pro-opporate">';
                        searchHtml += '<a class="pro-read">';
                        searchHtml += '<span class="pro-read-i">';
                        searchHtml += '<i class="iconfont icon-price-tag-solid1"></i>';
                        searchHtml += '</span>';
                        searchHtml += '<span class="pro-read-font">订阅</span>';
                        searchHtml += '</a>';
                        searchHtml += '<a class="pro-read l-fr js_compareAddProduct" auto="0" id="compare_' + returnData[i].MetaDataId + '_top" data-id="compare_' + returnData[i].MetaDataId + '_top" data-link="' + returnData[i].docpuburl + '" data-thumb="' + picUrl + '" data-name="' + cplx + '" data-type="' + returnData[i].modelno + '" data-chnid="' + returnData[i].ChannelId + '">';
                        searchHtml += '<span class="pro-read-font">对比</span>';
                        searchHtml += '<span class="pro-read-i">';
                        searchHtml += '<i class="iconfont icon-d-solid"></i>';
                        searchHtml += '</span>';
                        searchHtml += '</a>';
                        searchHtml += '</div>';
                        searchHtml += '<a href="' + docPubUrl + '" class="pro-info-box">';
                        searchHtml += '<img src="' + picUrl + '">';
                        //cxtxbq + hxmd + '<br>' + cplx + cpfl
                        searchHtml += '<div class="pro-info-title">' + pName + '</div>';
                        searchHtml += '<div class="pro-info-mark">' + modelNo + '</div>';
                        if (price != 0 || price != "") {//价格处理
                            searchHtml += '<div class="pro-info-price">￥' + price + '</div>';
                        } else {
                            searchHtml += '<div class="pro-info-price">暂无价格</div>';
                        }
                        searchHtml += '<span class="l-btn-sm l-btn-red pro-info-buy">立即购买</span>';
                        searchHtml += '<span class="l-btn-sm l-btn-line2 pro-info-take">订阅</span></a>';
                        searchHtml += '</div>';
                        searchHtml += '</div>';
                        //}
                    }
                    //设置总数
                    $(".red").html(returnData.length);
                    $(".prolist-con").html(searchHtml);
                    //添加对比产品监听事件
                    addCompareOnclick();
                    //是否未点击筛选项
                    isLastFilterItemSelect();
                    //-------------------分页
                    paginationInit(currentPageNo,allPageCount,pageSize);
                    //分页结束
                }

            }else{
                $(".red").html(0);
                $(".prolist-con").html(searchHtml);
            }
        }
    })

}
//分页初始化
function paginationInit(curPage,pageCount,pageSize){
    var type;

    var pager=new pagination(".product-listpage");
    pager.currPage = curPage;
    pager.pageSize=pageSize;

    //重写click方法  ajax取数据
    pager.onclick = function(currPageT){
        var dataT = {
            type:type,
            pagesize:pageSize,
            curpage:currPageT
        }
        search(searchWord, _tableName, _xmlPath, currPageT, pageSize, order, isSelectItemStr);
        pager.totalCount =  pageCount;
        pager.currPage = currPageT;
        pager.pageCount = pageSize;
        pager.render();
    };

    pager.totalCount =  pageCount;
    pager.currPage = curPage;
    pager.pageCount = pageSize;
    pager.render();
}
//产品列表上市时间人气价格排序
$(".font").each(function () {
    var $icon = $(this).find("i");
    $(this).toggle(function () {
        $(this).parent().find("a").find("i").css("display", "inline-block").removeClass("icon-arrow-refresh-down").removeClass("icon-arrow-refresh-up");
        $icon.css("display", "inline-block").removeClass("icon-arrow-refresh-down").addClass("icon-arrow-refresh-up");

        if ($(this).text() == "上市时间") {
            order = "-shangshishijian"
        }
        // if($(this).text()=="人气"){
        // 	order=""
        // }
        if ($(this).text() == "价格") {
            order = "+price"
        }
        search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, "");
    }, function () {
        $(this).parent().find("a").find("i").css("display", "inline-block").removeClass("icon-arrow-refresh-up").removeClass("icon-arrow-refresh-down");
        $icon.css("display", "inline-block").removeClass("icon-arrow-refresh-up").addClass("icon-arrow-refresh-down");

        if ($(this).text() == "上市时间") {
            order = "+shangshishijian"
        }
        // if($(this).text()=="人气"){
        // 	order=""
        // }
        if ($(this).text() == "价格") {
            order = "-price"
        }
        search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, "");
    });
});

//产品检索分页 底部
function splitPageHTML(searchword, tableName, currentPage, pageSize, totalCount, strOrder) {
    //总页数
    var _totalPage = parseInt(Math.ceil(totalCount / pageSize));//计算页码总数
    var maxButtons = 4;  //按钮数量
    var pageHtmlText = "";
    if (_totalPage < 4) {
        maxButtons = _totalPage;
    }
    currentPage = parseInt(currentPage);
    //当前页大于总页数
    if (currentPage > _totalPage) {
        currentPage = _totalPage;
    }

    if (currentPage < 1) {
        currentPage = 1;
    }

    var _start = Math.max(1, currentPage - parseInt(maxButtons / 2));//
    var _end = Math.min(_totalPage, _start + maxButtons - 1);//最后一个页码按钮的页码数
    _start = Math.max(1, _end - maxButtons + 1);//第一个页码按钮的页码数


    //当前页数 > 1
    if (currentPage > 1) {
        pageHtmlText += '<a class="js_fenye" change="\'' + searchword.replace(/\'/g, "\\'") + '\'|\'' + tableName + '\'|' + (currentPage - 1) + '|' + pageSize + '|\'' + strOrder + '\'"><i class="iconfont"></i></a>';
    } else {

    }
    if (1 != currentPage) {

        pageHtmlText += '<a class="js_fenye" change="\'' + searchword.replace(/\'/g, "\\'") + '\'|\'' + tableName + '\'|1|' + pageSize + '|\'' + strOrder + '\'">' + 1 + '</a>';
    }
    var temp1 = 4;
    if (_totalPage <= 6) {
        temp1 = 5;
    }

    if (currentPage > temp1) {
        pageHtmlText += '<span>...</span>';
    }

    for (var i = _start; i <= _end; i++) {
        if (i == currentPage) {
            pageHtmlText += '<a href="javascript:;" class="cur">' + currentPage + '</a>';
        } else {
            if (i != 1 && i != _totalPage) {

                pageHtmlText += '<a class="js_fenye" change="\'' + searchword.replace(/\'/g, "\\'") + '\'|\'' + tableName + '\'|' + i + '|' + pageSize + '|\'' + strOrder + '\'">' + i + '</a>';
            }
        }
    }

    var temp = 3;
    if (_totalPage <= 6) {
        temp = 5;
    }
    if (currentPage + temp <= _totalPage) pageHtmlText += '<span>...</span>';
    if (currentPage != _totalPage) {

        pageHtmlText += '<a class="js_fenye" change="\'' + searchword.replace(/\'/g, "\\'") + '\'|\'' + tableName + '\'|' + _totalPage + '|' + pageSize + '|\'' + strOrder + '\'">' + _totalPage + '</a>';
    }

    if (_totalPage != currentPage) {
        if (_totalPage != 0) {

            pageHtmlText += '<a class="js_fenye" change="\'' + searchword.replace(/\'/g, "\\'") + '\'|\'' + tableName + '\'|' + (currentPage + 1) + ',' + pageSize + '|\'' + strOrder + '\'"><i class="iconfont"></i></a>';

        } else {
            pageHtmlText += '<a class="lose"><i class="iconfont"></i></a>';
        }
    } else {

    }
    return pageHtmlText;
}

//没有筛选器的隐藏展开按钮
function noneShaiXuan() {
    var noneShaiXuan = $(".js_screenClick").find(".filter-line");
    if (noneShaiXuan.length == '' || noneShaiXuan.length == 0) {
        $(".js_listNavhide").hide();
    } else {
        $(".js_listNavhide").show();
    }

}

//筛选项点击事件
function filterItemOnclick(onclickClass) {

    $("." + onclickClass).click(function () {
        //每组筛选项都是单选  =====取消选中筛选项
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            isSelectItemStr = isSelectItemStr.replace($(this).attr("inputName") + ";", "");
            if (searchWord.indexOf("and") > 0) {
                searchWord = searchWord.replace($(this).attr("query") + " and", "");
                searchWord = searchWord.replace("and " + $(this).attr("query"), "");
            } else {
                searchWord = searchWord.replace($(this).attr("query"), "");
            }
            search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, isSelectItemStr);
            //删除筛选项头部点击选中
            $(".list-select-bg").filter('[itemName="' + $(this).text() + '"]').remove();
            //是否是最后一个筛选头部
            isLastFilterItemHead();
            //判断是否最后一个筛选项
            isLastFilterItemSelect();
            //点击的筛选项  未选中
        } else {
            //获取所有的同级sole-type对象
            var filterItemArray = $(this).siblings("." + onclickClass);
            var isSelectFlag = false;
            filterItemArray.each(function (e, n) {
                //如果同级的sole-type已经选中，则直接返回不做任何操作
                if ($(this).hasClass("active")) {
                    isSelectFlag = true;
                } else {
                    //$(this).off();
                }
            });

            if (!isSelectFlag) {
                //var temp = $(this).attr("inputName");
                isSelectItemStr = isSelectItemStr + $(this).attr("inputName") + ";";
                if (searchWord == "") {
                    searchWord = searchWord + $(this).attr("query");
                } else {
                    searchWord = searchWord + " and " + $(this).attr("query");
                }
                search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, isSelectItemStr);
                $(this).addClass("active");
                appendFilterItemShowBar($(this).text(),$(this).attr("inputName"),$(this).attr("query"),$(this).attr("id"));
                deleteFilterItemShowBarClick();

            }
        }


    });
}

//筛选项灰化
function displayFilterItem(filterItemList) {
    var itemId = "";
    //$("div").remove(".filter-line");
    //var allPageFilterArray = $(".sole-type");
    for (var i = 0; i < filterItemList.length; i++) {
        var filterObj = filterItemList[i];
        //初始化内容
        for (var j = 0; j < filterObj.optionList.length; j++) {

            var filterItemObj = filterObj.optionList[j];
            itemId = filterItemObj.id;
            var isShow = filterItemObj.isShow;
            //解析option
            $(".sole-type").each(function (e, n) {

                if (isShow == "true") {
                    //互斥操作
                    if ($(this).attr("id") == itemId) {
                        $(this).removeClass("disable");
                        return;
                    }
                    //$(".sole-type").filter('[query="(' + filterObj.query + ')"]').removeClass("disable");
                    //return;
                } else {
                    //互斥操作
                    if ($(this).attr("id") == itemId && !$(this).hasClass("active")) {
                        $(this).addClass("disable");
                        return;
                    }
                    //$(".sole-type").filter('[query="(' + filterObj.query + ')"]').addClass("disable");
                    //return;
                }
            });
        }
    }
}

/**
 * 拼接已筛选的筛选项
 */
function appendFilterItemShowBar(showName,inputName,query,id){
    $(".list-filter-select").css('display','block');
    var itemShowBar ="";
    itemShowBar+='<div class="list-select-bg" inputName="'+inputName+'" query="'+query+'" itemId="'+id+'" itemName="'+showName+'">';
    itemShowBar+=' <span class="list-select-test">'+showName+'</span>';
    itemShowBar+='   <a class="list-select-a-deleteimg js_delete"><i class="iconfont icon-close list-select-deleteimg"></i></a>';
    itemShowBar+='   </div>';
    $(".list-select-bgbox").prepend(itemShowBar);
}
/**
 * 筛选项-单个删除
 */
function deleteFilterItemShowBarClick(){
    //筛选项-单个删除
    $('.js_delete').on('click', function () {
        /**
         * 单个删除的代码写在这里
         */
        isSelectItemStr = isSelectItemStr.replace( $(this).parent().attr("inputName") + ";", "");
        if (searchWord.indexOf("and") > 0) {
            searchWord = searchWord.replace( $(this).parent().attr("query") + " and", "");
            searchWord = searchWord.replace("and " +  $(this).parent().attr("query"), "");
        } else {
            searchWord = searchWord.replace($(this).attr("query"), "");
        }
        //删除筛选项中的选中事件
        $(".sole-type.active").filter('[inputName="' + $(this).parent().attr("inputName") + '"]').removeClass("active");

        //删除当前选中的头部筛选项
        $(this).parent().remove();
        //是否是最后一个筛选头部
        isLastFilterItemHead();

        search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, isSelectItemStr);
    });
}
//顶部隐藏筛选选中头部
function hideFilterItemHeadShow(){
    $(".list-filter-select").css('display','none');
}
//顶部显示筛选选中头部
function showFilterItemHeadShow(){
    $(".list-filter-select").css('display','none');
}
//判断是否是最后一个选中标签
function isLastFilterItemHead() {
    //判断是否是最后一个选中标签
    var filterItemHeadLength = $(".list-select-bgbox").children();
    if(filterItemHeadLength.length<=0){
        hideFilterItemHeadShow();
    }
}
//判断是否是最后一个筛选项
function isLastFilterItemSelect() {
    var filterItemSelectLength = $(".sole-type.active");
    //如果选中的
    if(filterItemSelectLength.length<=0){
        var filterItemDisableLength = $(".sole-type.disable");
        filterItemDisableLength.each(function (e, n) {
            $(this).removeClass("disable");
        });
    }
}

//初始化筛选器===================================结束