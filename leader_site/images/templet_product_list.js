/**========================================================
 * @author Norman
 *
 * 筛选器和对比功能
 * */
//====================初始化筛选器===================================

$(function () {

    //筛选项-全部删除按钮事件
    $('.js_deleteAll').on('click', function () {
        //删除筛选头部选项
        $('.js_filter').empty();
        $(".list-filter-select").css('display', 'none');
        /**
         * 全部删除筛选子项的代码写在这里
         */
        $(".sole-type.active").each(function (e, n) {
            $(this).removeClass("active");
        });
        searchWord = "";
        order = "";
        isSelectItemStr = "";
        //最后一个筛选下，去掉置灰
        isLastFilterItemSelect(".sole-type");
        //重新查询
        search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, isSelectItemStr);
    });


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
    readXmlFile(url);

})
//默认分页信息
var curPage = 1;
var pageSize = 24;
var maxShowPageNo = 8;
var midlleShowPageNo = 5;
var mobileShowPageNo = 3;
var order = "";
//查询条件
var searchWord = "";
var mobileSearchWord = "";
//选中的筛选项集合
var isSelectItemStr = "";
var mobileIsSelectItemStr = "";
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
    var filterItemName = "";
    var filterItemQuery = "";
    $.ajax({
        type: 'get',
        dataType: 'xml',
        url: url,
        success: function (xml) {
            var viewName = $(xml).find("Filter").attr("viewName");
            _tableName = viewName;
            var itemId = "";
            var html = "";
            var mobileHtml = "";
            var filterTypeName = "";
            var searchItemName = "";
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
                //移动端
                mobileHtml += ' <li><span class="list-tit" tag="' + itemId + '" inputName="' + searchItemName + '">' + filterTypeName + '：</span>';
                mobileHtml += '<div class="list-line">';
                //解析option
                $(this).find("option").each(function (index1) {
                    filterItemName = $(this).attr("name");
                    filterItemQuery = "(" + $(this).attr("query") + ")";
                    //pc端筛选项拼接
                    html += '<span class="sole-type" query="' + filterItemQuery + '" id="' + jQuery(this).attr("id") + '" tag="' + itemId + '" inputName="' + searchItemName + '">' + filterItemName + '</span>';
                    //移动端筛选项拼接
                    mobileHtml += '<a class="l-btn-sm list-btn" query="' + filterItemQuery + '" id="' + jQuery(this).attr("id") + '" tag="' + itemId + '" inputName="' + searchItemName + '">' + filterItemName + '</a>';
                });
                //pc端拼接
                html += '</div>';
                html += '</div>';
                //移动端拼接
                mobileHtml += '</div>';
                mobileHtml += ' </li>';
            })
            $(html).insertBefore(".list-more");

            //移动端筛选项初始化
            $(".layer-list").html(mobileHtml);
            //if (document.body.offsetWidth >= 1200 ) {
            setTimeout(function(){noneShaiXuan(".sole-type")}, 1000);
            //noneShaiXuan(".sole-type")
            //pc端监听事件
            filterItemOnclick(".sole-type");
            //对比初始化函数
            setTimeout(function(){initCookie()}, 1000);
            //initCookie()
            setTimeout(function(){initLoadCookie()}, 1000);
            //initLoadCookie()
            // }else{
            setTimeout(function(){noneShaiXuan(".list-btn")}, 1000);
            //noneShaiXuan(".list-btn")
            //移动端监听事件
            filterItemOnclick(".list-btn");
            //重置选择
            mobileResetButtonOnclick();
            //}
        },
        error: function () {
            noneShaiXuan(".sole-type");
            //pc端监听事件
            filterItemOnclick(".sole-type");
            //对比初始化函数
            setTimeout(function(){initCookie()}, 1000);
            setTimeout(function(){initLoadCookie()}, 1000);
            noneShaiXuan(".list-btn");
            //移动端监听事件
            filterItemOnclick(".list-btn");
            //重置选择
            mobileResetButtonOnclick();
        }
    });
}

//检索产品方法
function search(sword, _tableName, _xmlPath, _curPage, _pageSize, order, searchTerm) {
    var searchHtml = "";
    $.ajax({
        type: "get",
        dataType: "json",
        url: siteConfig.domain + "/interaction-search/front/search/filterProduct/",
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

            if (data.isSuccess) {
                var filterItemList = data.data.filter.optionGroup;
                //互斥操作
                if (document.body.offsetWidth >= 1200) {
                    displayFilterItem(filterItemList, ".sole-type");
                } else {
                    displayFilterItem(filterItemList, ".list-btn");
                }
                var returnData = data.data.productList.entities;
                var allPageCount = data.data.productList.pageCount;
                var currentPageNo = data.data.productList.pageNo;
                //var currentPageNo = data.data.productList.pageS;
                //if (returnData.length >= 1) {
                for (var i = 0; i < returnData.length; i++) {
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
                    var price = returnData[i].price;//readJsonString(returnData[i].sku_values);//returnData[i].price;
                    //产品类型
                    var cplx = returnData[i].cplx;
                    //当前时间
                    var curDate = new Date().getTime();
                    //上市时间处理
                    var newsssj = new Date(sssj).getTime();
                    var bdate = 180 * 24 * 3600 * 1000;
                    //图片处理
                    if (picUrl == "" || picUrl == null) {
                    } else {
                        picUrl = docPubUrl.substring(0, docPubUrl.lastIndexOf("/")) + "/" + picUrl;
                    }
                    searchHtml += '<div class="o_u o_df_1-4 o_lg_1-3 o_md_1-2 o_sm_2-2 o_xs_2-2">';
                    searchHtml += '<div class="prolist-box">';
                    if (rqcp == "是") {
                        searchHtml += '<span class="l-tag-radius l-tag-green pro-tag">人气</span>'
                    } else if ((curDate - newsssj) <= bdate) {
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
                    searchHtml += '<div class="pro-info-title">' + pName + '</div>';
                    searchHtml += '<div class="pro-info-mark">' + modelNo + '</div>';
                    if (price != 0 || price != "") {//价格处理
                        searchHtml += '<div class="pro-info-price">￥' + price + '</div>';
                    } else {
                        searchHtml += '<div class="pro-info-price"></div>';
                    }
                    searchHtml += '<span class="l-btn-sm l-btn-red pro-info-buy">立即购买</span>';
                    searchHtml += '<span class="l-btn-sm l-btn-line2 pro-info-take">订阅</span></a>';
                    searchHtml += '</div>';
                    searchHtml += '</div>';
                }
                //设置总数
                $(".red").html(returnData.length);
                $(".prolist-con").html(searchHtml);
                //PC
                if (document.body.offsetWidth >= 1200) {
                    //添加对比产品监听事件
                    addCompareOnclick();
                    //是否最后筛选项
                    isLastFilterItemSelect(".sole-type");
                } else {
                    isLastFilterItemSelect(".list-btn");
                    paginationInit(currentPageNo, allPageCount, pageSize, ".product-listpage.pageMobile", mobileShowPageNo);
                }
                //-------------------分页
                paginationInit(currentPageNo, allPageCount, pageSize, ".product-listpage.pageMax", maxShowPageNo);
                paginationInit(currentPageNo, allPageCount, pageSize, ".product-listpage.pageMiddle", midlleShowPageNo);
                //分页结束1
            } else {
                //设置总数
                if (returnData == null) {
                    $(".red").html(0);
                } else {
                    $(".red").html(returnData.length);
                }
                $(".prolist-con").html(searchHtml);
            }

            // }
        }
    })

}

//分页初始化
function paginationInit(curPage, pageCount, pageSize, currentClass, showPageNo) {
    var type;
    var pager = new pagination(currentClass);
    pager.currPage = curPage;
    pager.totalPage = pageCount;
    pager.pageCount = pageSize;
    pager.showPageCount = showPageNo;
    pager.render();
    //重写click方法  ajax取数据
    pager.onclick = function (currPageT) {
        if (document.body.offsetWidth >= 1200) {
            search(searchWord, _tableName, _xmlPath, currPageT, pageSize, order, isSelectItemStr);
        } else {
            search(mobileSearchWord, _tableName, _xmlPath, currPageT, pageSize, order, mobileIsSelectItemStr);
        }
        pager.totalPage = pageCount;
        pager.currPage = currPageT;
        pager.pageCount = pageSize;
        pager.showPageCount = showPageNo;
        pager.render();
    };
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
        if ($(this).text() == "人气") {
            $icon.css("display", "inline-block").removeClass("icon-arrow-refresh-up").addClass("icon-arrow-refresh-down");
            order = "-rqcp"
        }
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
        if ($(this).text() == "人气") {
            $icon.css("display", "inline-block").removeClass("icon-arrow-refresh-down").addClass("icon-arrow-refresh-up");
            order = "+rqcp"
        }
        if ($(this).text() == "价格") {
            order = "-price"
        }
        search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, "");
    });
});

//没有筛选器的隐藏展开按钮
function noneShaiXuan(currentClass) {
    var noneShaiXuan;
    if (currentClass == ".sole-type") {
        noneShaiXuan = $(".js_screenClick").find(".filter-line");

        if (noneShaiXuan.length == '' || noneShaiXuan.length == 0) {
            $(".js_listNavhide").hide();
        } /*else {
            $(".js_listNavhide").show();
        }*/
    } else {
        noneShaiXuan = $(".layer-list").find("li");

        if (noneShaiXuan.length == '' || noneShaiXuan.length == 0) {
            $(".js_listMobileNavhide").hide();
        } /*else {
            $(".js_listMobileNavhide").show();
        }*/
    }


}

//筛选项点击事件
function filterItemOnclick(onclickClass) {

    $(onclickClass).click(function () {

        if ($(this).hasClass("disable")) {
            return;
        }
        //每组筛选项都是单选  =====取消选中筛选项
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            //pc端
            if (onclickClass == ".sole-type") {
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
                isLastFilterItemSelect(".sole-type");

                //移动端
            } else {
                mobileIsSelectItemStr = mobileIsSelectItemStr.replace($(this).attr("inputName") + ";", "");
                if (mobileSearchWord.indexOf("and") > 0) {
                    mobileSearchWord = mobileSearchWord.replace($(this).attr("query") + " and", "");
                    mobileSearchWord = mobileSearchWord.replace("and " + $(this).attr("query"), "");
                } else {
                    mobileSearchWord = mobileSearchWord.replace($(this).attr("query"), "");
                }
                search(mobileSearchWord, _tableName, _xmlPath, curPage, pageSize, order, mobileIsSelectItemStr);
            }

            //点击的筛选项  未选中
        } else {
            //获取所有的同级sole-type对象
            var filterItemArray = $(this).siblings(onclickClass);
            var isSelectFlag = false;
            filterItemArray.each(function (e, n) {
                //如果同级的sole-type已经选中，则直接返回不做任何操作
                if ($(this).hasClass("active")) {
                    isSelectFlag = true;
                }
            });

            if (!isSelectFlag) {
                if (onclickClass == ".sole-type") {
                    isSelectItemStr = isSelectItemStr + $(this).attr("inputName") + ";";
                    if ($.trim(searchWord) == "") {
                        searchWord = searchWord + $(this).attr("query");
                    } else {
                        searchWord = searchWord + " and " + $(this).attr("query");
                    }
                    search(searchWord, _tableName, _xmlPath, curPage, pageSize, order, isSelectItemStr);
                    appendFilterItemShowBar($(this).text(), $(this).attr("inputName"), $(this).attr("query"), $(this).attr("id"));
                    deleteFilterItemShowBarClick();

                    //手机端操作
                } else {
                    mobileIsSelectItemStr = mobileIsSelectItemStr + $(this).attr("inputName") + ";";
                    if ($.trim(mobileSearchWord) == "") {
                        mobileSearchWord = mobileSearchWord + $(this).attr("query");
                    } else {
                        mobileSearchWord = mobileSearchWord + " and " + $(this).attr("query");
                    }
                    search(mobileSearchWord, _tableName, _xmlPath, curPage, pageSize, order, mobileIsSelectItemStr);
                }
                $(this).addClass("active");
            }
        }
    });
}

//筛选项置灰
function displayFilterItem(filterItemList, currentClass) {
    var itemId = "";
    for (var i = 0; i < filterItemList.length; i++) {
        var filterObj = filterItemList[i];
        //初始化内容
        for (var j = 0; j < filterObj.optionList.length; j++) {
            var filterItemObj = filterObj.optionList[j];
            itemId = filterItemObj.id;
            var isShow = filterItemObj.isShow;
            //解析option
            var $this = $(currentClass).filter('[query="(' + filterItemObj.query + ')"]');
            if (isShow == "true") {
                //互斥操作
                var query = filterObj.query;
                $(currentClass).filter('[query="(' + filterItemObj.query + ')"]').removeClass("disable");
                //$(currentClass).filter('[query="(' + filterItemObj.query + ')"]').on("click",onclickCommentFunction(currentClass));
            } else {
                //互斥操作
                if (!$(currentClass).filter('[query="(' + filterItemObj.query + ')"]').hasClass("active")) {
                    $(currentClass).filter('[query="(' + filterItemObj.query + ')"]').addClass("disable");
                    //$(currentClass).filter('[query="(' + filterItemObj.query + ')"]').off("click");
                }
            }
        }
    }
}

/**
 * 拼接已筛选的筛选项
 */
function appendFilterItemShowBar(showName, inputName, query, id) {
    $(".list-filter-select").css('display', 'block');
    var itemShowBar = "";
    itemShowBar += '<div class="list-select-bg" inputName="' + inputName + '" query="' + query + '" itemId="' + id + '" itemName="' + showName + '">';
    itemShowBar += ' <span class="list-select-test">' + showName + '</span>';
    itemShowBar += '   <a class="list-select-a-deleteimg js_delete"><i class="iconfont icon-close list-select-deleteimg"></i></a>';
    itemShowBar += '   </div>';
    $(".list-select-bgbox").prepend(itemShowBar);
}

/**
 * 筛选项-单个删除
 */
function deleteFilterItemShowBarClick() {
    //筛选项-单个删除
    $('.js_delete').on('click', function () {
        /**
         * 单个删除的代码写在这里
         */
        isSelectItemStr = isSelectItemStr.replace($(this).parent().attr("inputName") + ";", "");
        if (searchWord.indexOf("and") > 0) {
            searchWord = searchWord.replace($(this).parent().attr("query") + " and", "");
            searchWord = searchWord.replace("and " + $(this).parent().attr("query"), "");
        } else {
            searchWord = searchWord.replace($(this).parent().attr("query"), "");
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
function hideFilterItemHeadShow() {
    $(".list-filter-select").css('display', 'none');
}

//顶部显示筛选选中头部
function showFilterItemHeadShow() {
    $(".list-filter-select").css('display', 'none');
}

//判断是否是最后一个选中标签
function isLastFilterItemHead() {
    //判断是否是最后一个选中标签
    var filterItemHeadLength = $(".list-select-bgbox").children();
    if (filterItemHeadLength.length <= 0) {
        hideFilterItemHeadShow();
        //去掉置灰操作
        isLastFilterItemSelect(".sole-type");
    }
}

//判断是否是最后一个筛选项
function isLastFilterItemSelect(currentClass) {
    var filterItemSelectLength = $(currentClass + ".active");
    //如果选中的
    if (filterItemSelectLength.length <= 0) {
        var filterItemDisableLength = $(currentClass + ".disable");
        filterItemDisableLength.each(function (e, n) {
            $(this).removeClass("disable");
        });
        //pc端初始化
        //filterItemOnclick(currentClass);
        //filterItemOnclick(".list-btn");
    }
}

//移动端筛选器确定按钮事件
function mobileFilterButtonOnclick() {
    $(".mobileFilterButton").on('click', function () {
        //获取所有的选中筛选项
        //search(mobileSearchWord, _tableName, _xmlPath, curPage, pageSize, order, mobileIsSelectItemStr);
        $('.js_layerShowMore').hide();
    });
}

//移动端筛选器确定按钮事件
function mobileResetButtonOnclick() {
    $(".list-btn-reset").on('click', function () {
        /**
         * 全部删除筛选子项的代码写在这里
         */
        $(".list-btn.active").each(function (e, n) {
            $(this).removeClass("active");
        });
    });
}

//初始化筛选器===================================结束