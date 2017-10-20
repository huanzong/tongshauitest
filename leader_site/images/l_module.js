$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {


    }

    /**
     * 自定义插件
     */
    $.fn.extend({
        //checkbox  rodio 样式重置
        jq_qvote: function() {
            var opt = {
                BaseClass: "c_ipt_cr",
                CSelectedClass: "c_ipt_cr_cs",
                CUnSelectedClass: "c_ipt_cr_cus",
                RSelectedClass: "c_ipt_cr_rs",
                RUnSelectedClass: "c_ipt_cr_crus",
                loseSelectedClass: "lose"
            };
            $(this).hide();
            $(this).each(function(i) {
                var that = $(this);
                var SelectedClass = "";
                var UnSelectedClass = "";
                var loseSelectedClass = opt.loseSelectedClass;
                var $val = that.attr("value");

                if (that.prop("type") == "radio") {
                    SelectedClass = opt.RSelectedClass;
                    UnSelectedClass = opt.RUnSelectedClass;
                } else if (that.prop("type") == "checkbox") {
                    SelectedClass = opt.CSelectedClass;
                    UnSelectedClass = opt.CUnSelectedClass;
                } else {
                    return;
                }


                var jqvote = document.createElement("span");
                if ($val) {
                    jqvote.innerHTML = $val;
                }

                this.parentNode.insertBefore(jqvote, this.parentNode.childNodes[that.index()]);
                var new_input = that.prev();
                new_input.addClass(opt.BaseClass);
                if (that.prop("disabled")) {
                    ///不可点击
                    new_input.addClass(loseSelectedClass);
                }
                if (that.attr("checked") == 'checked') {
                    new_input.addClass(SelectedClass);
                } else {
                    new_input.addClass(UnSelectedClass);
                }

                new_input.bind("click", function() {
                    if (that.prop("disabled")) {
                        ///不可点击
                        return;
                    }
                    var n = $(this).next();
                    if (n.prop("type") == "radio") {
                        $(":radio[name='" + n.prop("name") + "']").prev().removeClass(SelectedClass).addClass(UnSelectedClass);
                    }
                    n.click();
                    if (n.prop("checked") === true) {
                        new_input.removeClass(UnSelectedClass).addClass(SelectedClass);
                    } else {
                        new_input.removeClass(SelectedClass).addClass(UnSelectedClass);
                    }
                    return false;
                });
            });
        },

        //密码框：密文明文切换
        validPassword:function(){
            //创建明文输入框
            var $ele = $(this).find('input');
            var $el = {
                ph : $(this).find('input').attr('ph'),
                className : 'js_L_pwdClear '+ $(this).find('input').attr('class')
            };
            $(this).prepend('<input type="text" name="" value="'+$el.ph+'" class="'+$el.className+'">');

            $('.js_L_pwdClear').css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'color':'#ccc',
                'z-index':1
            });

            var $eleReplace = $(this).find('input.js_L_pwdClear');
            $eleReplace.on('focus',function(){
                // $(this).css('z-index','-1');
                $(this).hide();
                $ele.val("");
                $ele.focus();
            });
            $ele.on('blur',function(){
                // $(this).val() || $eleReplace.css('z-index','1');
                $(this).val() || $eleReplace.show();
            });
            
        },

        //表单校验展示错误信息--登陆注册页面
        validShowError:function(errorMsg){
            if($(this).is('input')){
                $(this).addClass('Validform_error');
                $(this).siblings('.Validform_checktip').html("<i class='iconfont icon-information-solid'></i>"+errorMsg);
            }else{
                $(this).siblings('input').addClass('Validform_error');
                $(this).html("<i class='iconfont icon-information-solid'></i>"+errorMsg);
            }
        },

        //表单校验隐藏错误信息--登陆注册页面
        validHideError:function(){
            if($(this).is('input')){
                $(this).siblings('.Validform_checktip').html("");
                $(this).removeClass('Validform_error');
            }else{
                $(this).siblings('input').removeClass('Validform_error');
                $(this).html("");
            }                
        },

        placeholderIe8:function(){
            var $this =$(this);
            var text = $this.attr("ph");
            if (text) {
                if ($this.val() === "") {
                    $this.val(text);
                    $this.css('color','#ccc');
                }
            }
            if($this.attr("type") == "text"){
                if (!$this.attr('ph')){
                    return;
                }
                $this.blur(function () {
                    setTimeout(function(){//先校验是否符合规则，再添加样式
                        if($this.val() === ''){
                            $this.val($this.attr("ph"));
                            $this.css('color','#ccc');
                        }else{
                            $this.css('color','#666');
                        }
                        //表单校验时触发
                        if(!$this.attr('phtype')){
                            $this.hasClass('Validform_error')?$this.css('border','1px solid #f39800'):$this.css('border','1px solid #ccc');
                            // $this.css('border','1px solid #ccc');
                        }
                    },300);
                    
                }).focus(function () {
                    // 通用校验-除登录注册
                    if(!$this.attr('data-normal')){
                        $this.validHideError();
                    }
                    
                    if($this.val() == $this.attr("ph")){
                        $this.val("");
                        $this.css('color','#666');
                    }
                    //表单校验时触发
                    if(!$this.attr('phtype')){
                       $this.css('border','1px solid #e60012');
                    }
                });
            }else if($this.attr("type") == "password"){
                $this.blur(function () {
                    setTimeout(function(){//先校验是否符合规则，再添加样式
                        $this.css('border','1px solid #ccc');
                        $this.css('color','#666');
                        //表单校验时触发
                        if(!$this.attr('phtype')){
                            $this.hasClass('Validform_error')?$this.css('border','1px solid #f39800'):$this.css('border','1px solid #ccc');
                            // $this.css('border','1px solid #ccc');
                        }
                    },300);
                }).focus(function () {
                    // 通用校验-除登录注册
                    if(!$this.attr('data-normal')){
                        $this.validHideError();
                    }
                    
                    $this.css('border','1px solid #e60012');
                });
            }
        },

        //数量加减-购物车
        numberRule:function(el){

            var $this = $(this);
            //默认元素
            var elActive = {
                plus:'.icon-plus',
                minus:'.icon-minus',
                input:'input',
                preNum:1,
                callback:function(num){

                }
            };

            //实际元素-用户定义
            jQuery.extend(elActive, el);

            //元素存储
            var ele = {
                plusEle:$this.find(elActive.plus),
                minusEle:$this.find(elActive.minus),
                inputEle:$this.find(elActive.input),
            };

            //加法
            ele.plusEle.on('click',function(){
                var inputVal = parseInt(ele.inputEle.val());
                inputVal += elActive.preNum;
                ele.inputEle.val(inputVal);
                elActive.callback(inputVal);
            });

            //减法
            ele.minusEle.on('click',function(){
                var inputVal = parseInt(ele.inputEle.val());
                inputVal -= elActive.preNum;
                ele.inputEle.val(inputVal);
            });
            
        }
        
    });

    /**
     * 输入框placeholder支持ie8
     */
    $('input').each(function(){
        $(this).placeholderIe8();
    });
    $('textarea').each(function(){
        var $this =$(this);
        var text = $this.attr("ph");
        if (text) {
            if ($this.val() === "") {
                $this.val(text);
                $this.css('color','#ccc');
            }
        }
        // if($this.attr("type") == "text"){
            if (!$this.attr('ph')){
                return;
            }
            $this.blur(function () {
                if($this.val() === ''){
                    $this.val($this.attr("ph"));
                    $this.css('color','#ccc');
                }else{
                    $this.css('color','#666');
                }
                //表单校验时触发
                if(!$this.attr('phtype')){
                    $this.hasClass('Validform_error')?$this.css('border','1px solid #f39800'):$this.css('border','1px solid #ccc');
                    // $this.css('border','1px solid #ccc');
                }
                
            }).focus(function () {
                console.log(text);
                if($this.val() == $this.attr("ph")){
                    $this.val("");
                    $this.css('color','#666');
                }
                //表单校验时触发
                if(!$this.attr('phtype')){
                   $this.css('border','1px solid #e60012');
                }
            });
        // }
    });

    /**
    *登陆框弹窗
    * */
    $('.js_landBtn').click(function(){
        $('.js_landShade').show();
        $('.js_landContBox').show();
        $("body").css({overflow:"hidden"});
        $('.js_landContBox').show();
        $('.js_landClose').click(function(){
            $('.js_landContBox').hide();
            $('.js_landShade').hide();
            $("body").css({overflow:"auto"});
            return false;
        });
    });
    $('.js_landType >div').click(function(){
        var clickIndex = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.js_landInputBox>div').eq(clickIndex).show().siblings().hide();
        $('.js-submintData').addClass('l-btn-disable');
    });




});


//通用弹窗
function globalShade(alerttext){
    $('.js_landShade').show();
    $('.js_landContBox').show();
    $("body").css({overflow:"hidden"});
    $('.js-landText').html(alerttext);
    $('.js_landClose').click(function(){
        $('.js_landContBox').hide();
        $('.js_landShade').hide();
        $("body").css({overflow:"auto"});
        return false;
    })
    //$('.js_alertClose').click(function(){
    //
    //})
}

//时间戳转换日期 时间戳，选格式，时间戳类型
function getLocalTime(nS,val,type) {
    if(type==2)
    {
        var timestamp4 =new Date(parseInt(nS) * 1000);
    }
    else
    {
        var timestamp4 =new Date(parseInt(nS));
    }

    var y = timestamp4.getFullYear();
    var m = timestamp4.getMonth() + 1;
    var d = timestamp4.getDate();
    if(val == 2){
        return y + "." + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d) ;
    }else if(val == 3){
        return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) ;
    }else if(val == 4){
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) ;
    }
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + timestamp4.toTimeString().substr(0, 8);

}


//判断当前是否存在同域cookie
function istrsidssdssotoken(){
    var trsidssdssotoken = "ssotoken";//同域Cookie
    var sdssotoken = $.cookie(trsidssdssotoken);
    if(sdssotoken!=null){
        return true;
    }else{
        return false;
    }
}

//跳转到登录页面
function jumpToLoginPage(){
    var returnUrl = window.location.href;
    if(!istrsidssdssotoken()){
        var returnUrl = window.location.href;
        window.location.href ='/ids/ts/login.jsp?returnUrl=' +returnUrl;
    }
}





