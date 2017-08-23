$(function() {

    init();

    $(window).resize(function() {
        init();
    });

    function init() {


    }

    //输入框placeholder支持ie8
    $('input').each(function(){
        var $this =$(this);
        var text = $this.attr("ph");
        if (text) {
            if ($this.val() == "") {
                $this.val(text);
                $this.css('color','#ccc');
            }
        }
        if($this.attr("type") == "text"){
            if (!$this.attr('ph')){
                return;
            }
            $this.blur(function () {
                if($this.val() == ''){
                    $this.val($this.attr("ph"));
                    $this.css('color','#ccc');
                }else{
                    $this.css('color','#666');
                }
                $this.css('border','1px solid #ccc');
            }).focus(function () {
                if($this.val() == $this.attr("ph")){
                    $this.val("");
                    $this.css('color','#666');
                }
                $this.css('border','1px solid #e60012');
            });
        }
    });

    $.fn.extend({
        jq_qvote: function() { //checkbox  rodio 样式重置
            var opt = {
                BaseClass: "c_ipt_cr",
                CSelectedClass: "c_ipt_cr_cs",
                CUnSelectedClass: "c_ipt_cr_cus",
                RSelectedClass: "c_ipt_cr_rs",
                RUnSelectedClass: "c_ipt_cr_crus",
                loseSelectedClass: "lose"
            }
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

                this.parentNode.insertBefore(jqvote, this.parentNode.childNodes[that.index()])
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
                        return
                    }
                    var n = $(this).next();
                    if (n.prop("type") == "radio") {
                        $(":radio[name='" + n.prop("name") + "']").prev().removeClass(SelectedClass).addClass(UnSelectedClass);
                    }
                    n.click();
                    if (n.prop("checked") == true) {
                        new_input.removeClass(UnSelectedClass).addClass(SelectedClass);
                    } else {
                        new_input.removeClass(SelectedClass).addClass(UnSelectedClass);
                    }
                    return false
                });
            });

        }
    })
    $(".js_checkbox,.js_radio").jq_qvote();
});



