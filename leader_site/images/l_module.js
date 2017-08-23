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

});



