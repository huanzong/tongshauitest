

//对比============================================开始

$(function () {
    //添加对比产品监听事件
    addCompareOnclick();
    //xml中获取tableName

    //对比初始化函数
    setTimeout(initCookie(), 1000);
    setTimeout(initLoadCookie(), 1000);

    //对比栏显示隐藏
    $('.js_compareBoxShow').on('click', function () {
        if (parseInt($(this).attr('data-show'))) {
            hideCompareFlowLayout();
        } else {
            showCompareFlowLayout();
        }
    });
    //显示对比浮层
    function showCompareFlowLayout(){
        $('.prolist-compare').show();
        $('.js_compareBox').show();
        $('.js_compareBoxShow').attr('data-show', 1);
        $('.js_compareBoxShow').html('隐藏<i class="iconfont icon-arrow-line-down"></i>');
    }
//隐藏对比浮层
    function hideCompareFlowLayout(){
        $('.prolist-compare').hide();
        $('.js_compareBox').hide();
        $('.js_compareBoxShow').attr('data-show', 0);
        $('.js_compareBoxShow').html('展开<i class="iconfont icon-arrow-line-up"></i>');
    }
})
var _tableName = "";
var url = "filter.xml";
//当前路径
var currentUrl = window.location.href;
//对比互斥标志
var noCompareChannel = "";
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

function getFilter(){
    $.ajax({
        type: 'get',
        dataType: 'xml',
        url: url,
        async:false,
        success: function (xml) {
            var viewName = $(xml).find("Filter").attr("viewName");
            _tableName = viewName;
        }
    });
}
//添加对比的点击事件
function addContrastClick() {
    var auto = $(this).attr("auto");//是否选中标志
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
    getFilter();//获取tableName
    //获取url
    currentUrlName = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    //如果不是产品详情对比页
    if (currentUrlName.indexOf("compare") == -1) {
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

                });
            }
        } else {
            proObjList = [];
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
    $(".js_compareAddProduct").attr("auto","1");
    if (currentUrlName.indexOf("compare") == -1) {
        //获取当前页cookie
        proCookie = $.cookie('leaderProCookie');
        var $list = $('.js_compareBox');
        var count = $list.find('.compare-product-img').length;
        //如果数据cookie中数据
        if (proCookie != null) {
            //解析，其实里边有最多4个的数据详情
            proObjList = JSON.parse(proCookie);
            var proId = "";
            for (var i = 0; i < proObjList.length; i++) {
                //进页面以后循环将cookie里边保存的产品添加到页面上
                var product = proObjList[i];
                proId = product.id;
            }
            var id = $obj.attr('id');
            if(id!=proId){
                if (count >= 4) {
                    alert("最多只能选择4款产品！");
                    return false;
                }

                if (proObjList.length >= 4) {
                    alert("最多只能选择4款产品！");
                    return false;
                }
                var channelId = $obj.attr('data-chnid');
                var proImg = $obj.attr('data-thumb');
                var proTitle = $obj.attr('data-name');
                var proDesc = $obj.attr('data-type');
                var proUrl = $obj.attr('data-link');

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
                $(".js_compareAddProduct").find("span").html("已对比");
            }else{
                if (count >= 4) {
                    alert("最多只能选择4款产品！");
                    return false;
                }

                if (proObjList.length >= 4) {
                    alert("最多只能选择4款产品！");
                    return false;
                }
                $(".js_compareAddProduct").find("span").html("已对比");
            }


        }else {//无数据
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
            $(".js_compareAddProduct").find("span").html("已对比");
        }
        showCompareFlowLayout();
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
    $(".js_compareAddProduct").attr("auto","0");
    $(".js_compareAddProduct").find("span").html("对比");
    var $list = $('.js_compareBox');
    var id = $obj.attr('id');

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
            return false;
        }
    });

    if ($list.find('li').length <= 0) {
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
    $('.js_compareAddProduct').on("click",function(){
        var isCompare=$(this).attr("auto");
        if(isCompare==0){
            //显示对比栏
            //showCompareFlowLayout();
            //加入商品对比列表的模板,
            $thisObj = $(this);
            add_compare_flyOut_item($thisObj);
        }else if(isCompare==1){//已对比
            remove_compare_fLayout_item($thisObj);
        }
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
    $('.prolist-compare').show();
    $('.js_compareBox').show();
    $('.js_compareBoxShow').attr('data-show', 1);
    $('.js_compareBoxShow').html('隐藏<i class="iconfont icon-arrow-line-down"></i>');
}
//隐藏对比浮层
function hideCompareFlowLayout(){
    $('.prolist-compare').hide();
    $('.js_compareBox').hide();
    $('.js_compareBoxShow').attr('data-show', 0);
    $('.js_compareBoxShow').html('展开<i class="iconfont icon-arrow-line-up"></i>');
}