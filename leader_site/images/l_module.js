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
            var ele = $(this).find('input');
            var el = {
                ph : $(this).find('input').attr('ph'),
                className : 'js_L_pwdClear '+ $(this).find('input').attr('class')
            };
            $(this).append('<input type="text" name="" value="'+el.ph+'" class="'+el.className+'">');

            $('.js_L_pwdClear').css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'color':'#ccc',
                'z-index':1
            });

            var eleReplace = $(this).find('input.js_L_pwdClear');
            eleReplace.on('focus',function(){
                // $(this).css('z-index','-1');
                $(this).hide();
                ele.val("");
                ele.focus();
            });
            ele.on('blur',function(){
                // $(this).val() || eleReplace.css('z-index','1');
                $(this).val() || eleReplace.show();
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
                    $this.validHideError();
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
                    $this.css('color','#666');
                    //表单校验时触发
                    if(!$this.attr('phtype')){
                        $this.hasClass('Validform_error')?$this.css('border','1px solid #f39800'):$this.css('border','1px solid #ccc');
                        // $this.css('border','1px solid #ccc');
                    }
                    
                }).focus(function () {
                    $this.css('border','1px solid #e60012');
                });
            }
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
});



