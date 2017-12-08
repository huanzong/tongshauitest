
/**
 * @author  Norman
 * 
 * //产品对比页json读取
 */
jQuery(function () {
    //获取第一个json 初始化
    //获取cookie中的地址
    var backUrl = $.cookie('backUrl');
    //容器: 比较数据的填充与显示区域
    var $cp_parameter_table_area = $(".productCompareShowDiv");
    //获取第二个json中的侧边栏信息
    var curParametersAll_array = [];
    //这里存放当前正在比较的产品的产品ID; 用户的每次添加如比较或者删除比较，会影响
    var curCompareList = [];
    //当前正在比较的产品，初始化为后台传来的用户选择的比较产品
    var cur_compare_pObj_array = [];
    //容器:当前已经比较产品数量
    var $js_compare_pro_total = $("#js_compare_pro_total");

    var $btn_reset = $('.compare_clear');//清空所有产品按钮
    var pid_not_in_local_json = [];
    var pro_total = 0;
    //上边4个图片没有连接就加上
    if (backUrl == null) {
        backUrl = "/cooling";
    }
    $(".add").each(function () {
        $(this).attr("href", backUrl);
    });

    //获取url中的参数
    var productId = getValue("productId");
    //解析产品id
    var productIds = productId.split("_");
    //用于存放地址栏中的产品id
    var _TRS_compare_products_from_user_pid_array = [];
    if (productId.length > 0) {
        //产品数量
        $("#js_compare_pro_total").html(productId.length);
        //如果id有值就push进数组
        for (var i = 0; i < productIds.length; i++) {
            _TRS_compare_products_from_user_pid_array.push(productIds[i]);
        }
    }
    //获取ChanelId
    var channelId = getValue("channelId");
    var compare_channel_url = "";
    //通过url的channel获取第一个json------得到数据集合json的路径
    $.ajax({
        url: "../../compareurl.json",
        type:'get',
        dataType: "json",
        async: false,
        success: function (data) {
            //解析多个数值
            //var obj = eval("(" + data + ")");
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                if (d.id == undefined) {
                    return;
                } else {
                    var id = d.id;
                    var url = d.url;
                    if (id == channelId) {
                        //如果找到相对应的channelid就给url赋值
                        compare_channel_url = url;
                        return;
                    }
                }
            }
        }
    });

    //根据url解析第二个json
    jQuery.getJSON(compare_channel_url, function (json) {
        initJSONdata_obj = json;
        //获取json中冰箱分类中所有产品id
        subcat_array = initJSONdata_obj.casCategoryCompareSub_forCurMainCategory;
        //获取json中侧边栏的数据
        curParametersAll_array = initJSONdata_obj.curCategoryComparing_CustomizedParameters;
        //START 初始化表格区域,将参数名称写入表格
        (function () {
            //获取左边的对比项 绘制
            var parameter_group_size;
            if (curParametersAll_array[curParametersAll_array.length - 1].parameterCategoryName == "") {
                parameter_group_size = curParametersAll_array.length - 1;
            } else {
                parameter_group_size = curParametersAll_array.length;
            }
            ;
            for (var i = 0; i < parameter_group_size; i++) {
                if (!!curParametersAll_array[i].parameterCategoryName) {
                    var parameterList_in_this_group = curParametersAll_array[i].parameterList;//第i组的参数
                    var cur_group_para_num = parameterList_in_this_group.length;
                    var html = '';
                    var html_tr_part1 = '';

                    //开始一块比较区域
                    html += '<div class="table_compareBox">'
                    //开始一个小标题
                    html += '<div class="compare_title">';
                    html += curParametersAll_array[i].parameterCategoryName + '</div>' +
                        '<div class="o_u o_df_1-12"></div>' +
                        '<div class="o_u o_df_10-12">' +
                        '<ul class="compare_table">';
                    //START 初始化参数表格区域，写入参数名称
                    for (var j = 0; j < cur_group_para_num; j++) {
                        if (!!parameterList_in_this_group[j][0]) {
                            html_tr_part1 = parameterList_in_this_group[j][0];
                            //开始一行比较
                            html += '<li class="productPropertiesShowLi"><div class="white-left"></div>' +
                                '<div class="white-right"></div>';
                            //前边标题
                            html += '<div class="o_u o_df_1-5 table_compareBoxL">';
                            html += ' <div class="compare_th">';
                            html += html_tr_part1;
                            html += '</div>';
                            html += ' </div>';
                            //开始后边比较内容
                            html += '<div class="o_u o_df_1-5 table_compareBoxR" data-rel="' + html_tr_part1 + '" data="1"><div class="compare_td row">  &nbsp; </div> </div>';
                            html += '<div class="o_u o_df_1-5 table_compareBoxR" data-rel="' + html_tr_part1 + '" data="2"><div class="compare_td row">  &nbsp; </div> </div>';
                            html += '<div class="o_u o_df_1-5 table_compareBoxR" data-rel="' + html_tr_part1 + '" data="3"><div class="compare_td row">  &nbsp; </div> </div>';
                            html += '<div class="o_u o_df_1-5 table_compareBoxR" data-rel="' + html_tr_part1 + '" data="4"><div class="compare_td row">  &nbsp; </div> </div>';

                        }
                        ;
                    }
                    ;//end for
                    html += '	</ul></div><div class="o_u o_df_1-12"></div></div>';
                    $(".productCompareDiv").append(html);
                }
                ;//end if
            }
            ;//end for
        })();//end 初始化表格区域

        //将产品id放入新的数组中
        var _nf_product_form_user_pid_array = _TRS_compare_products_from_user_pid_array;
        //如果url上边有产品id的话
        if (!!_nf_product_form_user_pid_array) {//如果参数存在的话
            if (_nf_product_form_user_pid_array.length > 4) {
                //多余4个就截取
                _nf_product_form_user_pid_array = _nf_product_form_user_pid_array.slice(0, 4);
            }
            ;
            //end if
            $js_compare_pro_total.html(_nf_product_form_user_pid_array.length);
            pro_total = _nf_product_form_user_pid_array.length;

            var subcat_len = subcat_array.length;

            for (var k = 0; k < _nf_product_form_user_pid_array.length; k++) {
                //获取第几个产品
                var userChannelId = _nf_product_form_user_pid_array[k];
                pid_not_in_local_json.push(_nf_product_form_user_pid_array[k]);
                for (var i = 0; i < subcat_len; i++) {
                    var subCat = subcat_array[i].subCategoryName;//大类名称
                    mold_for_this_subcat = subcat_array[i].moldforSubCategory;	//大类下所有产品
                    for (var j = 0; j < mold_for_this_subcat.length; j++) {
                        var mold = mold_for_this_subcat[j].mold;//产品型号
                        var productID = mold_for_this_subcat[j].productID;//产品ID
                        var json_url = mold_for_this_subcat[j].productJsonUrl;//产品url
                        if (json_url != undefined) {
                            //json_url = json_url.replace(".json", "_json.json");
                            json_url = json_url.replace(".shtml", "_json.json");
                        }
                        ;
                        if (userChannelId == productID) {
                            _load_INIT_pro_data_from_server(json_url);
                            break;
                        }
                    }
                    ;//end for
                }
                ;//end for
            }
            //$('.compare_choose span span').eq(0).click();
        }
        ;//end if

        //获取第三个json方法
        function _load_INIT_pro_data_from_server(json_url) {
            //这个是假的接口，请后台程序员替换成真实的接口地址。该接口接受产品id值，返回一个json格式的数据。
            jQuery.ajax({
                type: 'GET',
                url: json_url,
                dataType: 'json',
                'timeout': 60 * 1000,
                success: function (json) {
                    var p_obj = json;
                    curCompareList.push(pid_not_in_local_json[curCompareList.length]);
                    cur_compare_pObj_array.push(p_obj);
                },//end success function
                error: function (data) {
                    alert("请求失败，"+data)
                },
                complete: function (data) {
                    // START 初始化：将用户选定的比较产品的数据写入页面
                    reDrawCompArea(cur_compare_pObj_array);
                    //END 初始化：将用户选定的比较产品的数据写入页面
                }
            });
        }

        //将产品加入比较的方法，在用户点击"比较"或者'加入比较'这两种按钮时，经过判断后判定是否执行
        function add2Compare(order_index, product_Obj) {
            var $draw_area = $('.productInfo').eq(order_index);
            var $trs = $(".productPropertiesShowLi");
            var productID = product_Obj.productID;//产品ID
            var p_mainCategoryName = product_Obj.mainCategoryName;
            var p_subCategoryName = product_Obj.subCategoryName;
            var p_mold = product_Obj.mold;//产品型号
            var p_seriesModel = product_Obj.seriesModel;//系列
            var p_title = product_Obj.title;
            var p_link = product_Obj.linkUrl;
            var p_imgSrc = product_Obj.imgSrc;//产品小图地址
            var p_starLevel = product_Obj.starLevel;
            var p_curCommentsNum = product_Obj.curCommentsNum;
            var p_price = product_Obj.price;
            var CustomizedParameters_val_array = [];//[{'key':'','val':''},{}]
            var html = '';

            for (var i = 0; i < product_Obj.CustomizedParameters.length; i++) {
                var parameter_val = '';
                for (var j = 0; j < product_Obj.CustomizedParameters[i].parameterList.length; j++) {
                    if (product_Obj.CustomizedParameters[i].parameterList[j][2].hasContentIcon == true) {
                        parameter_val = product_Obj.CustomizedParameters[i].parameterList[j][1] + '<img src="' + product_Obj.CustomizedParameters[i].parameterList[j][2].ContentIconSrc + '" alt="" />';
                    } else {
                        parameter_val = product_Obj.CustomizedParameters[i].parameterList[j][1];
                    }
                    ;//end if else
                    CustomizedParameters_val_array.push({
                        'key': product_Obj.CustomizedParameters[i].parameterList[j][0],
                        'val': parameter_val
                    });
                }
                ;//end for
            }
            ;//end for
            //绘制上边的4个产品

            //html+=' <div class="o_u o_df_1-5 productInfo isAdd">';
            $draw_area.attr('data-pid', productID);
            html += ' <div class="compare_goods" isAdd="0">';
            //href ="' + p_link + '"
            html += '<a class="iconfont icon-close" ></a>';
            html += '  <img src="' + p_imgSrc + '">';
            html += ' <span class="goods_name">' + p_title + '</span>';
            html += '  <span class="goods_type">' + p_mold + '</span>';
            if (p_price != 0 || p_price != "0" || p_price != '' || p_price != undefined) {
                html += '<span class="goods_price">￥' + p_price + '</span>'
            }
            //html+='  <span class="goods_price">￥ 5637</span>';
            html += ' </div>';
            //html+='</div>';
            //去除为选择样式
            $draw_area.html("");
            //$(".productCompareShowDiv").remove(".productInfo");
            $draw_area.prepend(html);
            $draw_area.removeClass("isAdd");
            //绘制下边的比较项
            for (var m = 0; m < CustomizedParameters_val_array.length; m++) {
                var _key = CustomizedParameters_val_array[m]['key'];
                var _val = CustomizedParameters_val_array[m]['val'];

                if (_val == '') {
                    $trs.find('.table_compareBoxR').filter('[data-rel="' + _key + '"]').eq(order_index).find(".row").html('&nbsp;');
                } else {
                    $trs.find('.table_compareBoxR').filter('[data-rel="' + _key + '"]').eq(order_index).find(".row").html(_val);
                }
                ;//end if else

            }
            ;//end for

        }//end function add2Compare(order_index,$pObj)

        //START function reDrawCompArea()//重绘产品比较区域
        function reDrawCompArea() {
            var product_obj = {};
            clearItem();
            for (var i = 0; i < cur_compare_pObj_array.length; i++) {
                add2Compare(i, cur_compare_pObj_array[i]);
            }

            //注册各种按钮事件
            registerOnclickFunction();
            //重新绘制样式
            //高亮
            if ($('.compare_choose span span').eq(0).hasClass('c_ipt_cr_cs')) {
                if (curCompareList.length > 1) {
                    reset_table_highlight_bg();
                } else if (curCompareList.length == 1) {
                    //如果只有一个对比项 去除前边标题和对比项的高亮
                    $('.table_compareBoxR').find("div").removeClass('font-orange');
                }
                ;//end if else
            }
            ;//end if

            //相同项c_ipt_cr c_ipt_cr_cs
            if ($('.compare_choose span span').eq(1).hasClass('c_ipt_cr_cs')) {
                if (curCompareList.length > 1) {
                    hide_table_same_tr();
                } else if (curCompareList.length == 1) {
                    $(".productPropertiesShowLi").show();
                }
                ;//end if else
            }
            ;//end if
            //加载默认点击显示高亮

        }//end function reDrawCompArea

        //清空产品比较的4个框
        function clearItem() {
            //清空上边4个框的比较产品
            var obj = $('.productInfo');
            //obj.remove();
            obj.each(function () {
                $(this).remove();
                var text = "";
                //在这判断是不是吸顶效果的添加 如果是吸顶那要加上高度限制

                if (backUrl == null) {
                    backUrl = "/cooling";
                }

                text += '<div class="o_u o_df_1-5 productInfo isAdd">';
                text += ' <div class="compare_addgoods">';
                text += '   <a class="add_box"  href="' + backUrl + '">';
                text += '添加<br>产品';
                text += '</a>';
                text += '</div>';
                text += '</div>';
                $(".productCompareShowDiv").append(text);
            });
            //清空下边数据
            var $trs = $(".productPropertiesShowLi");
            ;
            $trs.find(".table_compareBoxR").find('.row').html('&nbsp;');
        }

        //用于删除比较数据
        function del_ElementOfArray(idx, array_obj) {
            for (var i = idx; i < (array_obj.length - 1); i++) {
                array_obj[i] = array_obj[i + 1];
            }
            ;
            array_obj.pop();
        }

        //对记录当前参与比较的产品的两个数组，进行数据更新
        function curComparingArray_del_element(idx) {
            del_ElementOfArray(idx, cur_compare_pObj_array);
            del_ElementOfArray(idx, curCompareList);
        }

        //高亮显示方法
        function reset_table_highlight_bg() {
            if (curCompareList.length > 1) {
                var same_tr_idx_array = find_same_trs();
                $('.productPropertiesShowLi').each(function (index) {
                    var $this_tr = jQuery(this);
                    if ((same_tr_idx_array[index]) == false) {
                        $this_tr.find(".table_compareBoxR").find("div").addClass('font-orange');
                    }
                    ;//end if
                });
                //end $cp_parameter_table_area.find('.js_cptr').each
            }
            ;//end if
        }

        //隐藏相同项
        function hide_table_same_tr() {
            if (curCompareList.length > 1) {
                $(".productPropertiesShowLi").show();
                var same_tr_idx_array = find_same_trs();
                $(".productPropertiesShowLi").each(function (index) {
                    var $this_tr = jQuery(this);
                    if ((same_tr_idx_array[index]) == true) {
                        $this_tr.hide();
                    }
                    ;//end if
                });//end $cp_parameter_table_area.find('.js_cptr').each
            }
            ;//end if
        }

        //将返回1个数组 same[]=======比较属性是否相同
        function find_same_trs() {
            var len = curCompareList.length;
            var same = [];
            //对比相同的项
            function checkTrSame($this_tr) {
                var flag = true;
                var val = $this_tr.find('.table_compareBoxR').eq(0).find(".row").html();
                for (var i = 1; i < len; i++) {
                    var val_cur = $this_tr.find('.table_compareBoxR').eq(i).find(".row").html();
                    if (!(val_cur == val)) {
                        flag = false;
                        break;
                    }
                    ;//end if
                }
                ;//end for
                return flag;
            }

            $(".productPropertiesShowLi").each(function (idx) {
                same[idx] = checkTrSame(jQuery(this));
            });//end each
            return same;
        }

        //START 各类事件注册
        function registerOnclickFunction() {
            //删除小按钮注册
            $(".productInfo").find(".compare_goods").find(".icon-close").each(function () {
                $(this).live('click', function () {
                    var pid = $(this).parent().parent().attr('data-pid');
                    var newPId = "compare_" + pid + "_top";

                    //删除cookie里面的相应数据
                    if ($.cookie('leaderProCookie') != null) {
                        var proCookieArr = JSON.parse($.cookie('leaderProCookie'));
                        for (var i = 0; i < proCookieArr.length; i++) {
                            var obj = proCookieArr[i];
                            if (obj.id == newPId) {
                                proCookieArr = remove(proCookieArr, "id", newPId);
                            }
                        }
                        var objString = JSON.stringify(proCookieArr);
                        $.cookie('leaderProCookie', objString, {path: "/"});
                    }
                    //删除cookie数据---------------------------end

                    //确定要删除第几个产品
                    var idx = "";
                    $(".productInfo").each(function (index) {
                        var this_compare_item = $(this).attr('data-pid');
                        if (this_compare_item == pid) {
                            idx = index;
                            return false;
                        }
                    });
                    //删除全局变量数据
                    curComparingArray_del_element(idx);
                    //重新绘制
                    reDrawCompArea();
                    pro_total--;
                    $("#js_compare_pro_total").html(pro_total);
                });
            });

            /* START $compare_holder_box  清空所有产品按钮注册*/
            $btn_reset.live("click", function () {
                if (curCompareList.length > 0) {
                    clearItem();
                    curCompareList = [];
                    cur_compare_pObj_array = [];
                }
                ;
                //删除cookie
                $.cookie('leaderProCookie', null, {path: "/"});
                $.cookie('leaderProCookie', null);
            });
            //end reg reset click

            //高亮选项
            $('.compare_choose span span').eq(0).on("click", function () {
                if (!jQuery(this).hasClass("c_ipt_cr_cs")) {
                    $(".table_compareBoxR").find("div").removeClass('font-orange');
                } else {
                    if (curCompareList.length > 1) {
                        reset_table_highlight_bg();
                    }
                    ;//end if
                }
                ;//end if else
            });
            //end $btn_highlight.click

            //去除重复项选项
            $('.compare_choose span span').eq(1).on("click", function () {
                if (!jQuery(this).hasClass("c_ipt_cr_cs")) {
                    $(".productPropertiesShowLi").show();
                } else {
                    if (curCompareList.length > 1) {
                        hide_table_same_tr();
                    }
                    ;//end if
                }
                ;//end if else
            });//end reg $btn_hide_same click

        }

    });
});

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
//删除方法
function remove(arrPerson, objPropery, objValue) {
    return $.grep(arrPerson, function (cur, i) {
        return cur[objPropery] != objValue;
    });
}


