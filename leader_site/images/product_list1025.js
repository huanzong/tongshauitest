//产品列表页js
$(function () {
    var currentScreenWidth = "";
    $(window).resize(function () {
        init();
    });
    //初始化
    function init() {
        var screenHeight = document.body.offsetHeight;
        var screenWidth = document.body.offsetWidth;
        currentScreenWidth = screenWidth;
        if (screenWidth > 1199) {
            $('.js_layerShowMore').hide();
            //readXmlFile(url);
        } else {
            //mobileReadXmlFile(url);
        }
    }

    // banner背景平铺
    $(".js_bannerImg").oBgCover().init();
    $(".js_bannerImg").css('margin-left', '-1000px');

    //导航-展开全部筛选项 
    $('.js_listNavShowMore').on('click', function () {

        var navList = $('.js_listNavShowMore').siblings('.filter-line');
        var flag = parseInt($('.js_listNavShowMore').attr('data-flag'));

        if (flag) {
            $('.js_listNavShowMore').find('span').text('展开全部筛选项');
            $('.js_listNavShowMore').find('i').removeClass('icon-close').addClass('icon-plus');
        } else {
            $('.js_listNavShowMore').find('span').text('收起全部筛选项');
            $('.js_listNavShowMore').find('i').removeClass('icon-plus').addClass('icon-close');
        }

        navList.each(function (i, n) {
            if (i < 4 || i >= navList.size()) {
                return;
            }
            if (flag) {
                $(this).addClass('o_df-hide');
            } else {
                $(this).removeClass('o_df-hide');
            }
        });

        if (document.body.offsetWidth < 1200) {
            $('.js_layerShowMore').show();
            $('.js_layerClose').on('click', function () {
                $('.js_layerShowMore').hide();
                $('.js_listNavShowMore').find('span').text('展开全部筛选项');
                $('.js_listNavShowMore').find('i').removeClass('icon-close').addClass('icon-plus');
            });

        }

        $('.js_listNavShowMore').attr('data-flag', Math.abs(parseInt(flag) - 1));
    });

    //筛选项-全部删除
    $('.js_deleteAll').on('click', function () {
        $('.js_filter').empty();
        $(".list-filter-select").css('display','none');
        searchWord="";
        order="";
        isSelectItemStr="";
        search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, isSelectItemStr);
        /**
         * 全部删除的代码写在这里
         */

    });


    //checkbox初始化
    $(".js_proGroup,.js_radio").jq_qvote();

    /**
     * 产品对比   //对比栏显示隐藏
     */
    $('.js_compareBoxShow').on('click', function () {
        if (parseInt($(this).attr('data-show'))) {

            hideCompareFlowLayout();
        } else {
            showCompareFlowLayout();
        }
    });

    //初始化筛选器,读取xml文件
    //if(currentScreenWidth> 1199){
    readXmlFile(url);
    //}else{
    mobileReadXmlFile(url);
    //}
    //添加对比产品监听事件
    addCompareOnclick();
});
/**========================================================
 * @author Norman
 *
 * 筛选器和对比功能
 * */
//====================初始化筛选器===================================
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
        url: "../interaction-search/front/search/filterProduct",
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
                        var price = readJsonString("");//returnData[i].price;
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
    /*if(date != undefined && date != '' && date != null && date != ""){
        type = date;
    }else{
        type=$("#select_type option:selected").attr("attrdesc");
    }*/
    var pager=new pagination(".product-listpage");
    pager.currPage = curPage;
    pager.pageSize=pageSize;
    /*var data = {
        type:type,
        pagesize:pageSize,
        curpage:curPage
    }*/
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
    //getpagedatalistInfo(data,pager);
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

                } else {
                    //互斥操作
                    if ($(this).attr("id") == itemId && !$(this).hasClass("active")) {
                        $(this).addClass("disable");
                        return;
                    }
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

//对比============================================开始
//对比互斥标志
var noCompareChannel = "";
//当前路径
var currentUrlName = "";
//产品集合
var proObjList = "";
//缓存对象
var proCookie = "";
//侧边栏
var proObjListSideBar = "";
//创建一个数组
var arrayMetaDataId = new Array();
//总对比按钮
compareButtonOnclick();
//添加对比的点击事件
function addContrastClick() {

    //$(".js_compareAddProduct").live("click",function(){
    //是否选中标志
    var auto = $(this).attr("auto");
    if (auto == "0") {
        //如果是没有对比的对比
        $(this).addClass("uncontrast");
        $(this).attr("auto", "1");
        $(this).find("span").html("取消对比");
        $(this).find("i").removeClass("o-plus").addClass("o-close");
    } else if (auto == "1") {
        //如果是已经对比的取消对比
        $(this).removeClass("uncontrast");
        $(this).attr("auto", "0");
        $(this).find("span").html("对比");
        $(this).find("i").removeClass("o-close").addClass("o-plus");
    }

    var cla = $(this).attr("class");
    $this = $(this);
    var $flyout = jQuery('.pro_compare_flyout');
    var $list = $flyout.find('.compare_col');
    var count = $list.find('.row').length;

    if (cla.indexOf("uncontrast") > 0) {
        if (!add_compare_flyOut_item($this)) {
            alert("您最多能添加4个产品！");
            unchecked($(this));
            show_compare_flyout();
        } else {
            if (noCompareChannel != "") {
                var pType = $(this).attr("data-chnid");
                //互斥不同类别的
                $(".o_u.o_df_1-2.o_xs-hide.btn").each(function () {
                    var pType_ = $(this).attr("data-chnid");
                    var isChecked_ = $(this).hasClass("uncontrast");
                    if (isChecked_) {
                        if (pType != pType_) {
                            $(this).removeClass("uncontrast");
                            $(this).attr("auto", "0");
                            $(this).find("span").html("对比");
                            $(this).find("i").removeClass("o-close").addClass("o-plus");
                        }
                    }
                    if (pType != pType_ && pType != "") {
                        $(this).addClass("lose");
                        $(this).removeClass("js_contrast");
                    }
                    //智慧家电特殊处理 让冰箱可以比较
                    if (noCompareChannel == smart_product) {

                        if (pType == fscooling || pType == yscooling || pType == dmcooling || pType == dkcooling || pType == txcooling || pType == qrcooling) {
                            if (pType_ == fscooling || pType_ == yscooling || pType_ == dmcooling || pType_ == dkcooling || pType_ == txcooling || pType_ == qrcooling) {
                                $(this).addClass("js_contrast");
                                $(this).removeClass("lose");
                            }
                        }
                    }
                    //育婴家电特殊处理 让冰箱可以比较
                    if (noCompareChannel == maternal_and_child) {

                        if (pType == fscooling || pType == yscooling || pType == dmcooling || pType == dkcooling || pType == txcooling || pType == qrcooling) {
                            if (pType_ == fscooling || pType_ == yscooling || pType_ == dmcooling || pType_ == dkcooling || pType_ == txcooling || pType_ == qrcooling) {
                                $(this).addClass("js_contrast");
                                $(this).removeClass("lose");
                            }
                        }
                        //测试让空调可以比较
                        if (pType == guisair || pType == gsair) {
                            if (pType_ == guisair || pType_ == gsair) {
                                $(this).addClass("js_contrast");
                                $(this).removeClass("lose");
                            }
                        }
                    }

                });
            }
        }
    } else {
        remove_compare_fLayout_item($this);
        $(this).removeClass("uncontrast");
        $(this).attr("auto", "0");
        $(this).find("span").html("对比");
        $(this).find("i").removeClass("o-close").addClass("o-plus");
    }
    //});

}

//加载页面或者检索完毕以后初始化cookie
function initCookie() {
    //获取url
    currentUrlName = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    //如果不是产品详情对比页
    if (currentUrlName.indexOf("product_compare") == -1) {
        //读取产品品类表名
        var proTypeTable = $.cookie('leaderProTypeTable');
        if (proTypeTable != null) {
            if (proTypeTable != _tableName || _tableName.length == 0) {
                //如果cookie中存放的表名和js获取的表名不一致 就置空数据cookie
                $.cookie('leaderProCookie', null, {path: '/', expires: -1});
                $.cookie('leaderProCookie', null);
            }
        }
        //初始化存产品品类表名cookie
        $.cookie('leaderProTypeTable', _tableName, {path: '/'});
        //获取数据cookie
        proCookie = $.cookie('leaderProCookie');
        //如果数据cookie中数据
        if (proCookie != null) {

            //解析，其实里边有最多4个的数据详情
            proObjList = JSON.parse(proCookie);
            var pType = "";
            for (var i = 0; i < proObjList.length; i++) {
                //进页面以后循环将cookie里边保存的产品添加到页面上
                var product = proObjList[i];
                //修改对比样式 todo -----------------样式处理------------------------------------------------
                /* $("#" + product.id).attr("auto", "1");
                 $("#" + product.id).addClass("uncontrast");
                 $("#" + product.id).find("span").html("取消对比");
                 $("#" + product.id).find("i").removeClass("o-plus").addClass("o-close");*/
                pType = product.channelid;
            }
            //互斥不同类别的 找到所有的对比框
            if (noCompareChannel != "") {
                $(".o_u.o_df_1-2.o_xs-hide.btn").each(function () {
                    var pType_ = $(this).attr("data-chnid");
                    var isChecked_ = $(this).hasClass("uncontrast");
                    if (isChecked_) {
                        if (pType != pType_) {
                            $(this).removeClass("uncontrast");
                            $(this).attr("auto", "0");
                            $(this).find("span").html("对比");
                            $(this).find("i").removeClass("o-close").addClass("o-plus");
                        }
                    }
                    if (pType != pType_ && pType != "") {
                        $(this).addClass("lose");
                        $(this).removeClass("js_contrast");
                    }
                    //智慧家电特殊处理 让冰箱可以比较
                    if (noCompareChannel == smart_product) {

                        if (pType == fscooling || pType == yscooling || pType == dmcooling || pType == dkcooling || pType == txcooling || pType == qrcooling) {
                            if (pType_ == fscooling || pType_ == yscooling || pType_ == dmcooling || pType_ == dkcooling || pType_ == txcooling || pType_ == qrcooling) {
                                $(this).addClass("js_contrast");
                                $(this).removeClass("lose");
                            }
                        }
                    }
                    //育婴家电特殊处理 让冰箱可以比较
                    if (noCompareChannel == maternal_and_child) {
                        //生产
                        if (pType == fscooling || pType == yscooling || pType == dmcooling || pType == dkcooling || pType == txcooling || pType == qrcooling) {
                            if (pType_ == fscooling || pType_ == yscooling || pType_ == dmcooling || pType_ == dkcooling || pType_ == txcooling || pType_ == qrcooling) {
                                $(this).addClass("js_contrast");
                                $(this).removeClass("lose");
                            }
                        }
                        //测试让空调可以比较
                        if (pType == guisair || pType == gsair) {
                            if (pType_ == guisair || pType_ == gsair) {
                                $(this).addClass("js_contrast");
                                $(this).removeClass("lose");
                            }
                        }
                    }
                });
            }
        } else {
            proObjList = [];
            //对比按钮样式
            /*$(".uncontrast").find("span").html("对比");
             $(".uncontrast").find("i").removeClass("o-close").addClass("o-plus");
             $(".uncontrast").attr("auto","0");
             $(".uncontrast").removeClass("uncontrast");*/

        }
    }
}
//初始化绘制对比浮层数据
function initLoadCookie() {
    //读取浮层里边内容应该是没有
    var compareHtml = "";
    //因为初始化cookie中将proObjlist这个添加 所以在这直接使用
    if (proObjList != null) {
        if (proObjList.length > 0) {
            for (var i = 0; i < proObjList.length; i++) {
                var product = proObjList[i];
                compareHtml += '<li>' +
                    '<div class="compare-product-img" id="' + product.id + '" data-chanid="' + product.channelid + '">' +
                    '<img src="' + product.img + '">' +
                    '</div>' +
                    '<div class="compare-product-info">' +
                    ' <p>' + product.title + '</p>' +
                    '<p class="leaveout">' + product.desc + '</p>' +
                    '<span>' + product.price + '</span>' +
                    '</div>' +
                    ' <i class="iconfont icon-close compare-close js_compareClose"></i>' +
                    '</li>';
            }
            //$('.js_compareBox').remove("li");
            showCompareFlowLayout();
            $('.js_compareBox').prepend(compareHtml);
            //删除对比选项监听
            deleteCompareItem();
            deleteAllCompareItem();
        } else {
            hideCompareFlowLayout();
            //删除对比选项监听
            deleteCompareItem();
            deleteAllCompareItem();

        }
    }
}
window.unchecked = function ($obj) {
    //对比按钮样式
    $obj.attr("auto", "0");
    $obj.removeClass("uncontrast");
    $obj.find("span").html("对比");
    $obj.find("i").removeClass("o-close").addClass("o-plus");
}

//将添加对比的产品绘制在浮层上
window.add_compare_flyOut_item = function ($obj) {

    if (currentUrlName.indexOf("product_compare") == -1) {

        var $list = $('.js_compareBox');
        var count = $list.find('.compare-product-img').length;
        if (count >= 4) {
            alert("最多只能选择4款产品！");
            return false;
        }

        if (proObjList.length >= 4) {
            alert("最多只能选择4款产品！");
            return false;
        }

        var id = $obj.attr('id');
        var proImg = $obj.attr('data-thumb');
        var proTitle = $obj.attr('data-name');
        var proDesc = $obj.attr('data-type');
        var proUrl = $obj.attr('data-link');
        var channelId = $obj.attr('data-chnid');
        var price = $.trim($obj.parent().parent().find(".pro-info-price").text()).replace(/\s+/g, "");

        var compareHtml = '<li>' +
            '<div class="compare-product-img" id="' + id + '" data-chanid="' + channelId + '">' +
            '<img src="' + proImg + '">' +
            '</div>' +
            '<div class="compare-product-info">' +
            ' <p>' + proTitle + '</p>' +
            '<p class="leaveout">' + proDesc + '</p>' +
            '<span>' + price + '</span>' +
            '</div>' +
            ' <i class="iconfont icon-close compare-close js_compareClose"></i>' +
            '</li>';


        //$('.js_compareBox').prepend(compareHtml);
        $list.prepend(compareHtml);
        //把选择的对比产品存入cookie
        var proObj = new Object();
        proObj.id = id;
        proObj.img = proImg;
        proObj.title = proTitle;
        proObj.url = proUrl;
        proObj.desc = proDesc;
        proObj.channelid = channelId;
        proObj.price = price;
        proObjList.push(proObj);
        var objString = JSON.stringify(proObjList);
        $.cookie('leaderProCookie', objString, {path: '/'});
        //添加侧边栏绘制数据
        /* initSideBarCookie();
         initSideBarLoadCookie();*/
        //总对比按钮
        //删除对比选项监听
        deleteCompareItem();
        deleteAllCompareItem();
        //总对比按钮
        compareButtonOnclick();
        return true;
    }
}

//移除对比
window.remove_compare_fLayout_item = function ($obj) {

    var $list = $('.js_compareBox');
    var id = $obj.siblings(".compare-product-img").attr('id');

    $list.find('li').each(function () {
        var $this_col = jQuery(this);
        var col_id = $this_col.children('.compare-product-img').attr('id');
        if (col_id == id && id != undefined) {
            $this_col.remove();
            //删除cookie里面的相应数据
            for (var i = 0; i < proObjList.length; i++) {
                var obj = proObjList[i];
                if (obj.id == id) {
                    proObjList = remove(proObjList, "id", id);
                }
            }
            var objString = JSON.stringify(proObjList);
            $.cookie('leaderProCookie', objString, {path: '/'});
            /* if (noCompareChannel != "") {
             if (objString == "[]") {
             //恢复互斥项
             $(".js_proList .lose").each(function () {
             $(this).addClass("js_contrast");
             $(this).removeClass("lose");
             });
             }
             }*/
            return false;
        }
        ;
    });

    if ($list.find('.row').length <= 0) {
        hideCompareFlowLayout();
        //删除cookie里面的相应数据,未点比较按钮时删除cookie
        for (var i = 0; i < proObjList.length; i++) {
            var obj = proObjList[i];
            if (obj.id == id) {
                proObjList = remove(proObjList, "id", id);
            }
        }
        var objString = JSON.stringify(proObjList);
        $.cookie('leaderProCookie', objString, {path: '/'});
        if (noCompareChannel != "") {
            if (objString == "[]") {
                //恢复互斥项
                $(".js_proList .lose").each(function () {
                    $(this).addClass("js_contrast");
                    $(this).removeClass("lose");
                });
            }
        }
    }
    //添加侧边栏绘制数据
    initSideBarCookie();
    initSideBarLoadCookie();
};
//移除
function remove(arrPerson, objPropery, objValue) {
    return $.grep(arrPerson, function (cur, i) {
        return cur[objPropery] != objValue;
    });
}

//加载页面或者检索完毕以后初始化cookie
function initSideBarCookie() {
    //获取url
    var sideBarCurrentUrl = window.location.href;
    var sideBarCurrentUrlName = sideBarCurrentUrl.substring(sideBarCurrentUrl.lastIndexOf("/") + 1);
    if (sideBarCurrentUrlName.indexOf("product_compare") == -1) {
        //获取数据cookie
        proCookie = $.cookie('leaderProCookie');
        //如果数据cookie中数据
        if (proCookie != null) {
            proObjListSideBar = JSON.parse(proCookie);
        } else {
            proObjListSideBar = [];
        }
    }
}
//初始化绘制侧边栏对比浮层数据
function initSideBarLoadCookie() {
    //读取侧边栏浮层里边内容应该是没有
    var compareHtml = "";
    //因为初始化cookie中将proObjlist这个添加 所以在这直接使用
    if (proObjListSideBar != null) {
        //如果不是产品列表页或者详情页那么就不要显示对比
        if (proObjListSideBar.length > 0) {
            //URL里边有product这个字符串 就不显示侧边栏的对比
            if (currentUrl.indexOf("product") >= 1) {
                //在这获取页面产品id为了修改按钮样式
                var productId = $(".prodetial_tool .js_btn_addcompare").attr('id');
                //有数据显示侧边 添加数量
                $(".js_compare_door").show();
                $(".js_compare_door .num span").html(proObjListSideBar.length);
                //添加里边的
                $(".js_side_mycompare span").eq(1).html(proObjListSideBar.length);
                //如果两个以上显示比较按钮
                if (proObjListSideBar.length > 1) {
                    $(".js_side_mycompare .tool a").removeClass("o_lose");
                }
                for (var i = 0; i < proObjListSideBar.length; i++) {
                    var product = proObjListSideBar[i];
                    compareHtml += '<li>';
                    compareHtml += '<div class="box" id="' + product.id + '" data-chanid="' + product.channelid + '">';
                    compareHtml += '<a href="' + product.url + '" class="img"><img src="' + product.img + '" alt=""></a>';
                    compareHtml += '<a href="' + product.url + '" class="link cui_c333">' + product.title + '</a>';
                    compareHtml += '<p class="cui_c999 font_sub">' + product.desc + '</p>';
                    compareHtml += '<p class="jg font_sub cui_cyellow">' + product.price + '</p>';
                    compareHtml += '<span class="o_icofont o-close"></span>';
                    compareHtml += '</div>';
                    compareHtml += '</li>';

                    //修改详情侧边栏的对比按钮样式
                    if (productId == product.id) {
                        //如果是同一个型号
                        if (!$(".js_sbtn_compare").hasClass("light")) {
                            //没有样式 加上样式
                            $(".js_sbtn_compare").addClass("light");
                            $(".js_sbtn_compare").find("b").html("取消对比");
                        }
                    }
                }
                $(".js_side_mycompare ul").html(compareHtml);
            }
        } else {
            //没有数据侧边隐藏
            $(".js_compare_door").hide();
            //清空侧边栏
            $(".js_side_mycompare ul").empty();

        }
    }
}

//对比按钮监听事件
function compareButtonOnclick() {
    //对比按钮添加监听事件
    $(".compareButton").click(function () {

        var selected_length = $(".js_compareBox").find('.compare-product-img').length;
        if (selected_length <= 0) {
            alert('您尚未选择需要对比的产品。');
        } else if (selected_length < 2) {
            alert('您必须至少选择两件产品才能进行对比。');
        } else {
            /* 生成跳转链接并跳转到对比页 $(this).attr("data-backUrl")*/
            var backUrl = currentUrl ;
            //存返回路径cookie
            $.cookie('backUrl', backUrl, {path: '/'});
            var vURL = '';
            var vStr = '';
            vURL = backUrl;
            vURL = vURL.substring(0, vURL.lastIndexOf("/"));
            var channelId = "";

            $(".js_compareBox").find('li').each(function () {
                var $col = jQuery(this);
                var proId = $col.children('.compare-product-img').attr('id');
                if(proId!=undefined){
                    channelId = $col.children('.compare-product-img').attr('data-chanid');
                    var j = arrayMetaDataId.length;
                    arrayMetaDataId[j] = proId;
                }

            });
            //不会超过4个，因为点击比较按钮时超过4个就屏蔽其它比较按钮了
            for (var i = 0; i < arrayMetaDataId.length; i++) {
                if (arrayMetaDataId[i] != '' && arrayMetaDataId[i] != null) {
                    //截取掉存储的metaDataId_top后面的_top
                    var ids = arrayMetaDataId[i] + "";
                    if (ids.lastIndexOf("_top") != -1) {//id后缀有_top
                        ids = ids.substring(8, ids.lastIndexOf("_top"));
                    }
                    vStr = vStr + ids + '_';
                }
            }
            if (vStr != '') {
                vStr = vStr.substring(0, vStr.length - 1);
                if (_tableName == "leader_rqrsq" || _tableName == "leader_drsq" || _tableName == "leader_xyyj" || _tableName == "leader_rqz" || _tableName == "leader_kx" || _tableName == "leader_cofmachine" || _tableName == "leader_micro" || _tableName == "leader_micro" || _tableName == "leader_dishwasher") {
                    //如果是特殊的几个栏目就做截取到父栏目
                    vURL = vURL.substring(0, vURL.lastIndexOf("/"));
                } else if (vURL.indexOf("maternal_and_child") >= 0 && vURL.length >= 50) {
                    //如果是育婴家电的几个栏目就做截取到父栏目
                    vURL = vURL.substring(0, vURL.lastIndexOf("/"));
                }
                //todo channelId先暂时固定
                vURL = vURL + '/compare_59.shtml?productId=' + vStr + '&channelId=' + chnlid_owner;
            } else {
                vURL = window.location.href;
            }
            arrayMetaDataId.length = 0;
            window.location.href = vURL;
            return false;
        }
    });
}

//添加对比按钮监听事件
function addCompareOnclick() {

    //添加对比商品监听事件
    $('.js_compareAddProduct').on('click', function () {
        //显示对比栏
        showCompareFlowLayout();

        //加入商品对比列表的模板,
        $thisObj = $(this);
        add_compare_flyOut_item($thisObj);

    });
}

//删除单个对比产品监听事件
function deleteCompareItem() {
    //删除单个对比产品
    $('.js_compareClose.compare-close.icon-close').on('click', function () {
        //商品对象,
        $thisObj = $(this);
        remove_compare_fLayout_item($thisObj);
    });
}
//删除所有个对比产品监听事件
function deleteAllCompareItem() {
    //清空对比栏
    $('.link-clear.js_compareClose').on('click', function () {
        $('.js_compareBox').find("li").find(".compare-product-img").each(function (i, n) {
            $(this).parent().remove();
        });
        $.cookie('leaderProCookie', null, {path: '/'});
    });
}

//显示对比浮层
function showCompareFlowLayout(){
    $('.js_compareBox').show();
    $('.js_compareBoxShow').attr('data-show', 1);
    $('.js_compareBoxShow').html('隐藏<i class="iconfont icon-arrow-line-down"></i>');
}
//隐藏对比浮层
function hideCompareFlowLayout(){
    $('.js_compareBox').hide();
    $('.js_compareBoxShow').attr('data-show', 0);
    $('.js_compareBoxShow').html('展开<i class="iconfont icon-arrow-line-up"></i>');
}