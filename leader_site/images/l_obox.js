oPoint = {
    sm: 543,
    md: 699,
    lg: 991,
    xl: 1199
};
(function (win, doc, $) {
    //判断浏览器
    // function IETester(userAgent){
    //  var UA =  userAgent || navigator.userAgent;
    //  if(/msie/i.test(UA)){
    //      return UA.match(/msie (\d+\.\d+)/i)[1];
    //  }else if(~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')){
    //      return UA.match(/rv:(\d+\.\d+)/)[1];
    //  }
    //  return false;
    // }

    isIe = (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0);
    // isOpera=$.browser.opera;
    // isSafari=$.browser.safari;
    isIe11 = ie11();
    isIe8 = isIe && navigator.userAgent.indexOf("MSIE 8.0") > 0 && !isIe11;
    isIe9 = isIe && navigator.userAgent.indexOf("MSIE 9.0") > 0 && !isIe11;
    isPC = isPCFn();
    isUC = isUCFn();
    isFirefox = isFoxFn();
    isTouch = canTouch();

    function ie11() {
        if (Object.hasOwnProperty.call(win, "ActiveXObject") && !win.ActiveXObject) {
            return true;
        } else {
            return false;
        }
    }

    function isFoxFn() {
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
            return true;
        } else {
            return false;
        }
    }


    function canTouch() {
        var touchObj = {};
        touchObj.isSupportTouch = "ontouchend" in doc ? true : false;
        touchObj.isEvent = touchObj.isSupportTouch ? "touchstart" : "click";
        if (touchObj.isEvent == "touchstart") {
            return true;
        } else {
            return false;
        }
    }

    function isUCFn() {
        var u = navigator.userAgent;
        if (navigator.userAgent.indexOf('UCBrowser') > -1 || u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            return true;
        } else {
            return false;
        }
    }
    //alert(isUC)
    function isPCFn() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    $.fn.oClear = function () {
        $(this).contents().filter(function () {
            if ($(this)[0].nodeType === 3) {
                $(this).remove();
            }
        });
    };

    $.fn.oSelect = function (p) {
        var defaults = {
            "go": true,
            showLenght: 5,
            cont: $(this).parent(),
            openfn: function () {},
            closefn: function () {}
        };
        var $p = $.extend(defaults, p);
        var $this = $(this),
            $autotext = $this.attr("autotext"),
            $cont = $p.cont,
            $box = $("<div>").addClass("o_Dropdown"),
            $ico = $("<i>").addClass("i_down"),
            $name = $("<span>").addClass("name").html($autotext),
            $listbox = $("<div>").addClass("list"),
            $ul = $("<ul>"),
            $option = $this.find("option"),
            $optGroup = $this.find("optgroup"),
            $li = $("<li>"),
            $h2 = $("<h2>"),
            $span = $("<span>"),
            $showLenght = $p.showLenght,
            $autoi,
            $openfn = $p.openfn,
            $closefn = $p.closefn,
            $go = $p.go;
        $box.css("cursor", "default");
        $cont.css({
            "position": "relative",
            "z-index": "0"
        });

        $option.each(function (i) {
            if (i > 0) {
                if ($(this).attr("selected")) {
                    var $val = $(this).html();
                    $name.html($val);
                    return false;
                }
            }
        });

        $ul.appendTo($listbox);
        $box.append($ico).append($name).append($listbox);
        $this.before($box).css("display", "none");
        $this.appendTo($box);

        $this.bar = $ul.oScrollBar();
        $box.addClass("lose");

        $this.init = function () {
            $this.lose();
            $ul.find("li").on("click", function (e) {
                //$ul.find("li").removeClass("cur");
                $(this).addClass("cur").siblings().removeClass("cur");
                $i = $ul.find("li").index(this);
                $option = $this.find("option");
                $option.attr("selected", false).eq($i + 1).attr("selected", true);

                $val = $(this).find("span").html();
                $listbox.css("display", "none");
                $cont.css({
                    "z-index": "0",
                     "height": "auto"
                }).removeClass("o_DropdownBox");
                $box.removeClass("o_back_red");
                $name.html($val);
                $this.change();
                e.stopPropagation();
            });
            if (!isPC) {
                $box.on("change", "select", function (e) {
                    var $val = $(this).find("option:selected").html();
                    //$i=$option.index($(this).find("option:selected"));
                    //console.log($(this).find("option:selected").text())
                    //$ul.find("li").removeClass("cur").eq($i-1).addClass("cur");
                    $name.html($val);
                });
            }

            $this.resetting();
            $box.removeClass("lose");
        };

        $this.lose = function () {
            $box.addClass("lose");
            $box.attr("style", "");
            $option = $this.find("option");
            $optGroup = $this.find("optgroup");
            $ul.html("");
            $name.html($autotext);
            if ($optGroup.length > 0) //有标题
            {
                $optGroup.each(function () {
                    var tit = $(this).attr("label");
                    var $h2_1 = $h2.clone();
                    $h2_1.html(tit);
                    $ul.append($h2_1);

                    $(this).find("option").each(function () {
                        var $val = $(this).html();
                        var $li_1 = $li.clone();
                        var $span_1 = $span.clone();
                        if ($(this).attr("selected")) {
                            $val = $(this).html();
                            $name.html($val);
                            $autoi = $option.index(this);
                            $li_1.addClass("cur");
                        }
                        $span_1.html($val);
                        $li_1.append($span_1);
                        $ul.append($li_1);
                    });

                });

            } else { //没有标题
                $option.each(function (i) {
                    if (i > 0) {
                        var $val = $(this).html();
                        var $li_1 = $li.clone();
                        var $span_1 = $span.clone();
                        if (i === 1) {
                            // $li_1.addClass("cur");
                            // $name.html($val);
                        }
                        if ($(this).attr("selected")) {
                            $val = $(this).html();
                            $name.html($val);
                            $autoi = $option.index(this);
                            $li_1.addClass("cur");
                        }
                        $span_1.html($val);
                        $li_1.append($span_1);
                        $ul.append($li_1);
                    }
                });
            }

            $name.off();
            $box.css("cursor", "pointer");
            $this.css({
                display: "none"
            });
        };

        $this.resetting = function () {
            if (isPC) {
                $name.on("click", function () {
                
                    $listbox.css({"display":"inline-block","width": $box.width() - 30});
                    $cont.css({
                        "z-index": "1",
                        "height": $ul.height() + 80,
                        "max-height": "280px"
                    }).addClass("o_DropdownBox");
                    if ($ul.height() <= 200) {
                        $listbox.css("height", $ul.height());
                    } else {
                        $listbox.css("height", "200px");
                    }
                    $box.addClass("o_back_red");

                    $openfn($box);
                    $this.bar.init();
                });
                $box.hover(function () {}, function () {
                    $listbox.css("display", "none");
                    $cont.css({
                        "z-index": "0",
                         "height": "auto"
                    }).removeClass("o_DropdownBox");
                    $box.removeClass("o_back_red");
                    $closefn($box);
                });
                $cont.hover(function(){},function(){
                    $listbox.css("display", "none");
                    $cont.css({
                        "z-index": "0",
                         "height": "auto"
                    }).removeClass("o_DropdownBox");
                    $box.removeClass("o_back_red");
                    $closefn($box);
                });
                $this.css({
                    display: "none"
                });
            } else {
                $name.off();
                $this.css({
                    display: "block"
                });
            }
        };

        // $(window).resize(function(){
        //  $this.resetting();
        // });

        return $this;
    };

    $.fn.oMenu = function (p) {
        var defaults = {
            "menu": "",
            "mainbox": ".o_main",
            "linkage": true,
            /*"position":null,*/ "btnbox": $(this),
            "zztop": 0,
            "openfn": null,
            "closefn": null,
            "menuwidth": null,
            "zzclass": "o_m_zz"
        };
        var $p = $.extend(defaults, p);
        var $this = $(this),
            $mainbox = $($p.mainbox),
            $zz = $("<div>").addClass($p.zzclass),
            $linkage = $p.linkage,
            $btnbox = $($p.btnbox),
            $menu = $($p.menu),
            //$position=$p.position,
            $menu_w = $p.menuwidth ? $p.menuwidth : $menu.width(),
            $positionNum,
            $direction,
            $main_left,
            $main_right,
            $left,
            $right;

        //初始化方向
        //$this.css("float",$position);


        $this.on("click", function () {
            $zz.attr("style", "margin-top:" + $p.zztop + "px");
            $main_left = Math.abs(parseFloat($mainbox.css("left")));
            $main_right = Math.abs(parseFloat($mainbox.css("right")));
            $left = parseFloat($menu.css("left"));
            $right = parseFloat($menu.css("right"));
            if ($linkage) {
                //联动

                if ($main_left > 0 || $main_right > 0) {
                    if ($direction == "left") {
                        $mainbox.oCss3({
                            "transform": "translate3d(" + Math.abs($left) + "px,0px,0px)",
                            "transition-duration": "0s"
                        }, false);
                        $mainbox.css({
                            left: "0px"
                        });
                        setTimeout(function () {
                            $mainbox.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0.3s"
                            }, false);
                        }, 10);
                        $this.removezz();
                        if ($p.closefn) {
                            $p.closefn($this);
                        }

                    } else if ($direction == "right") {
                        $mainbox.oCss3({
                            "transform": "translate3d(" + -Math.abs($right) + "px,0px,0px)",
                            "transition-duration": "0s"
                        }, false);
                        $mainbox.css({
                            right: "0px"
                        });
                        setTimeout(function () {
                            $mainbox.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0.3s"
                            }, false);
                        }, 10);


                        $this.removezz();
                        if ($p.closefn) {
                            $p.closefn($this);
                        }
                    }

                    $this.removeClass("cur");

                } else {
                    //$mainbox.attr("style","");
                    if ($right < 0) {
                        $mainbox.oCss3({
                            "transform": "translate3d(" + -Math.abs($right) + "px,0px,0px)",
                            "transition-duration": "0.3s"
                        }, false);
                        $menu.css({
                            height: $(window).height()
                        });
                        setTimeout(function () {
                            $mainbox.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0.0s"
                            }, false);
                            $mainbox.css({
                                "right": Math.abs($right) + "px",
                                "position": "relative"
                            });
                            $direction = "right";
                        }, 500);

                        $mainbox.append($zz);
                        if ($p.openfn) {
                            $p.openfn($this);
                        }

                    } else if ($left < 0) {
                        $mainbox.oCss3({
                            "transform": "translate3d(" + Math.abs($left) + "px,0px,0px)",
                            "transition-duration": "0.3s"
                        }, false);
                        $menu.css({
                            height: $(window).height()
                        });
                        setTimeout(function () {
                            $mainbox.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0.0s"
                            }, false);
                            $mainbox.css({
                                "left": Math.abs($left) + "px",
                                "position": "relative"
                            });
                            $direction = "left";
                        }, 500);

                        $mainbox.append($zz);
                        if ($p.openfn) {
                            $p.openfn($this);
                        }
                    }

                    $this.addClass("cur");
                }

            } else {
                if ($left === 0 || $right === 0) {
                    if ($direction == "left") {
                        $menu.oCss3({
                            "transform": "translate3d(100%,0px,0px)",
                            "transition-duration": "0s"
                        }, false);
                        $menu.css({
                            "left": "-" + $menu_w + "px"
                        });
                        setTimeout(function () {
                            $menu.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0.3s"
                            }, false);
                        }, 10);

                        if ($btnbox) {
                            $btnbox.stop().animate({
                                marginLeft: 0
                            }, 300);
                        }
                        $this.removezz();
                        if ($p.closefn) {
                            $p.closefn($this);
                        }
                    } else if ($direction == "right") {
                        $menu.oCss3({
                            "transform": "translate3d(-100%,0px,0px)",
                            "transition-duration": "0s"
                        }, false);
                        $menu.css({
                            "right": "-" + $menu_w + "px"
                        });
                        setTimeout(function () {
                            $menu.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0.3s"
                            }, false);
                        }, 10);

                        if ($btnbox) {
                            $btnbox.stop().animate({
                                marginRight: 0
                            }, 300);
                        }
                        $this.removezz();
                        if ($p.closefn) {
                            $p.closefn($this);
                        }
                    }
                    $this.removeClass("cur");
                } else {

                    if ($right < 0) {
                        $menu.oCss3({
                            "transform": "translate3d(-100%,0px,0px)",
                            "transition-duration": "0.3s",
                            height: $(window).height() + "px"
                        }, false);
                        setTimeout(function () {
                            $menu.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0s",
                                height: $(window).height() + "px"
                            }, false);
                            $menu.css({
                                "right": "0px"
                            });
                            $direction = "right";
                        }, 300);
                        if ($btnbox) {
                            $btnbox.stop().animate({
                                marginRight: $menu_w
                            }, 300);
                        }
                        $mainbox.append($zz);
                        if ($p.openfn) {
                            $p.openfn($this);
                        }

                    } else if ($left < 0) {
                        $menu.oCss3({
                            "transform": "translate3d(100%,0px,0px)",
                            "transition-duration": "0.3s",
                            height: $(window).height() + "px"
                        }, false);
                        setTimeout(function () {
                            $menu.oCss3({
                                "transform": "translate3d(0px,0px,0px)",
                                "transition-duration": "0s",
                                height: $(window).height() + "px"
                            }, false);
                            $menu.css({
                                "left": "0px"
                            });
                            $direction = "left";
                        }, 300);
                        if ($btnbox) {
                            $btnbox.stop().animate({
                                marginLeft: $menu_w
                            }, 300);
                        }
                        $mainbox.append($zz);
                        if ($p.openfn) {
                            $p.openfn($this);
                        }
                    }

                    $this.addClass("cur");
                }
            }

        });

        $this.init = function () {
            if ($linkage) {
                $mainbox.attr("style", "");
            } else {
                if ($btnbox) {
                    $btnbox.attr("style", "");
                }
                $menu.attr("style", "");
            }
            $this.removeClass("cur").removezz();
        };
        $(window).resize(function () {
            $this.init();
        });

        $this.removezz = function () {
            $zz.oCss3({
                opacity: 0,
                "transition-duration": "0.5s"
            }, false);
            setTimeout(function () {
                $zz.detach();
            }, 500);
        };

        $zz.click(function () {
            $this.click();
        });


        $this.allback = function () {
            if ($linkage) {
                $mainbox.animate({
                    right: "0px"
                }, 300);
                $zz.detach();
                $this.removeClass("cur");
            } else {
                if ($direction == "left") {
                    $menu.stop().animate({
                        left: "-" + $menu_w
                    }, 300);
                    $btnbox.stop().animate({
                        marginLeft: "0px"
                    }, 300);
                    //$mainbox.animate({left:"0px"},300);
                    $zz.detach();

                } else if ($direction == "right") {
                    $menu.stop().animate({
                        right: "-" + $menu_w
                    }, 300);
                    $btnbox.stop().animate({
                        marginRight: "0px"
                    }, 300);
                    //$mainbox.animate({right:"0px"},300);
                    $zz.detach();
                }
                $this.removeClass("cur");
            }
        };
        $this.menuback = function () {
            if ($linkage) {
                $mainbox.animate({
                    right: "0px"
                }, 300);
                $zz.remove();
                $this.removeClass("cur");
            } else {
                if ($direction == "left") {
                    $menu.stop().animate({
                        opacity: "0.5"
                    }, 300, function () {
                        $menu.css({
                            "left": "-" + $menu_w,
                            "opacity": "1"
                        });
                    });
                    //$btnbox.stop().animate({marginLeft:"0px"},300);
                    //$mainbox.animate({left:"0px"},300);
                    $zz.detach();

                } else if ($direction == "right") {
                    $menu.stop().animate({
                        opacity: "0.5"
                    }, 300, function () {
                        $menu.css({
                            "right": "-" + $menu_w,
                            "opacity": "1"
                        });
                    });
                    //$btnbox.stop().animate({marginRight:"0px"},300);
                    //$mainbox.animate({right:"0px"},300);
                    $zz.detach();
                }
                $this.removeClass("cur");
            }
        };
        return $this;
    };

    $.fn.oAutoH = function (p) {
        var defaults = {
            "targetObj": window,
            "inner": false,
            callback: function () {},
            resize: true,
            minH: false
        };
        var $p = $.extend(defaults, p);
        var $this = $(this),
            $targetH_obj = $($p.targetObj),
            $parent = $this.parent(),
            $siblings = $this.siblings(".o_fixH"),
            $fixbox_list = $siblings,
            $this_h,
            $innerH = 0,
            $child_allH = $this.find(".o_H100");
        if ($p.inner) {
            $targetH_obj = $parent;
        }

        $this.init = function () {
            $parent.oClear();
            $this_h = $targetH_obj.height();
            if ($fixbox_list.length > 0) {
                $fixbox_list.each(function () {
                    if ($(this).css("display") !== "none") {
                        $this_h -= $(this).height();
                    }
                });
            }
            if ($p.minH) {
                $this.css({
                    "min-height": $this_h + "px"
                });
            } else {
                $this.css({
                    "min-height": $this_h + "px",
                    "height": $this_h + "px"
                });
            }


            $child_allH.each(function () {
                $(this).css("height", $this_h + "px");
            });
            $p.callback();
        };
        //$this.init();

        $(window).resize(function () {
            if ($p.resize && !isUC) {
                $this.init();
            }
        });
        return $this;
    };

    $.fn.oAutoW = function (p) {
        var defaults = {
            "obj1": $(this).prev(),
            "obj2": $(this).next(),
            "targetObj": $(this).parent(),
            callback: function () {},
            resize: true
        };
        var $p = $.extend(defaults, p);
        var $this = $(this),
            $obj1 = $p.obj1 ? $($p.obj1) : 0,
            $obj2 = $p.obj2 ? $($p.obj2) : 0,
            $targetW_obj = $($p.targetObj),
            $parent = $this.parent(),
            $siblings = $this.siblings(".o_fixW"),
            $this_w,
            $fixW_list = $siblings;

        $this.init = function () {
            $parent.oClear();
            $this_w = Math.floor($targetW_obj.width() - 1);
            //$this_w=document.body.clientWidth;
            $fixW_list.each(function () {
                if ($(this).css("display") !== "none") {
                    $this_w -= $(this).width();
                    //$(this).css("float","left");
                }
                $this_w = Math.floor($this_w);
                $this.css({
                    "width": $this_w + "px"
                });
                //$parent.css("font-size","0");
            });
            $p.callback();
        };

        $(window).resize(function () {
            if ($p.resize) {
                $this.init();
            }
        });
        return $this;
    };

    $.fn.oPicture = function (p) {
        var defaults = {
            sm: oPoint.sm,
            md: oPoint.md,
            lg: oPoint.lg,
            xl: oPoint.xl
        };
        var $p = $.extend(defaults, p);
        var $this = $(this),
            $window_w,
            $sm = $p.sm,
            $md = $p.md,
            $lg = $p.lg,
            $xl = $p.xl,
            xsImg = $this.attr("xs"),
            smImg = $this.attr("sm"),
            mdImg = $this.attr("md"),
            lgImg = $this.attr("lg"),
            xlImg = $this.attr("xl"),
            dfImg = $this.attr("df"),
            ie8Img = $this.attr("ie8");

        $this.init = function () {
            $window_w = $(window).width();
            if (isIe8 && ie8Img !== undefined) {
                $this.attr("src", ie8Img);
                return false;
            }

            if ($window_w < $sm + 1) {
                if (xsImg === undefined) {
                    $this.attr("src", dfImg);
                } else {
                    $this.attr("src", xsImg);
                }

            } else if ($window_w >= $sm && $window_w < $md + 1) {
                if (smImg === undefined) {
                    $this.attr("src", dfImg);
                } else {
                    $this.attr("src", smImg);
                }

            } else if ($window_w >= $md && $window_w < $lg + 1) {
                if (mdImg === undefined) {
                    $this.attr("src", dfImg);
                } else {
                    $this.attr("src", mdImg);
                }

            } else if ($window_w >= $lg && $window_w < $xl + 1) {
                if (lgImg === undefined) {
                    $this.attr("src", dfImg);
                } else {
                    $this.attr("src", lgImg);
                }
            } else if ($window_w >= $xl) {
                if (xlImg === undefined) {
                    $this.attr("src", dfImg);
                } else {
                    $this.attr("src", xlImg);
                }
            }
        };

        $(window).resize(function () {
            $this.init();
        });

        return $this;
    };

    $.fn.oInputclear = function () {
        var autotext = $(this).attr("autotext");
        $(this).val(autotext);
        $(this).focus(function () {
            if ($(this).val() == autotext) {
                $(this).attr("value", "");
            }
        });
        $(this).blur(function () {
            if ($(this).val() === "") {
                $(this).val(autotext);
            }
        });
    };

    $.fn.oTextareaclear = function () {
        var autotext = $(this).attr("autotext");
        $(this).html(autotext);

        $(this).focus(function () {
            if ($(this).html() === autotext) {
                $(this).html("");
            }
        });
        $(this).blur(function () {
            if ($(this).html() === "") {
                $(this).html(autotext);
            }
        });
    };

    $.fn.oSlider = function (p) {
        defaults = {
            "showBoxClass": "showbox",
            "autoWidth": false,
            "loop": false,
            "directionVertical": false,
            "scrollbar": false,
            "windowResize": true,
            "pager": null,
            "touch": true,
            speed: false,
            "pagerShow": false,
            "touchClear": false,
            /*"gotoFn":null,*/ "nextFn": null,
            "prevFn": null,
            "moveOne": false,
            "moveTouch": true,
            "playFn": null,
            "btnHobj": null
        };
        $p = $.extend(defaults, p);

        $(this).oCss3({
            "transform": "translateZ(0)"
        });
        $(this).oClear();
        $(this).find("ul").oClear();
        $(this).find("." + $p.showBoxClass).oClear();
        var $this = $(this),
            $showbox = $this.find("." + $p.showBoxClass),
            $originalH = $(this).height(),
            $cont = $showbox.find("ul"),
            $li = $cont.find("li"),
            $autoLi;
            $this.amount_yuan=$li.length;
        var $amount = $li.length,
            $moveOne = $p.moveOne,
            $moveTouch = $p.moveTouch,
            $moveDistance = null,
            $movebox = $("<div>"),
            $nextLeft,
            $directionVertical = $p.directionVertical,
            $moveDirection = "left",
            $loop = $p.loop,
            $havescroll = $p.scrollbar,
            $boxautoW = $p.autoWidth,
            $pager = $this.find($p.pager),
            $pagerShow = $p.pagerShow,
            $showpage = 0,
            $pagerNum,
            $page /*=Math.ceil($amount/$showAmt)*/ ,
            $yu = true,
            $newli = $("<li></li>"),
            $showWidth,
            $showHeight,
            $wResize = $p.windowResize,
            $showHeigh,
            $canTouch = $p.touch,
            $speed = $p.speed,
            $t,
            $touchEvent = null,
            $canMove = true,
            $playFn = $p.playFn,
            //$gotoFn=$p.gotoFn,
            $nextFn = $p.nextFn,
            $prevFn = $p.prevFn,
            $added = false,
            $touchI = 1,
            $liW,
            $pianyi,
            $nextA,
            $prevA,
            $playing = false,
            $active = false,
            $btnHobj = $p.btnHobj;

        if ($directionVertical) {
            $this.css("height", $originalH + "px");
        }

        $li.css("display", "inline-block");

        if ($directionVertical) {
            $moveDirection = "top";
            $cont.css({
                "font-size": "0",
                "width": "100%",
                "display": "inline"
            });
        } else {
            $cont.css({
                "font-size": "0",
                "white-space": "nowrap",
                "width": "100%",
                "display": "inline"
            });
        }

        $showbox.css({
            "overflow": "hidden",
            "position": "relative"
        });

        $this.showAmt = 0;
        $this.i = 0;
        $this.prevBtn = $("<span class='btn_prev'></span>");
        $this.nextBtn = $("<span class='btn_next'></span>");
        $this.clickI = null;

        $cont.appendTo($movebox);
        $movebox.appendTo($showbox);
        $li.on("click", function () {
            $this.clickI = $li.index(this);
        });
        if ($loop) {
            $movebox.addClass("o_font0");
            var $clone = $cont.clone(),
                $listers = $clone.find("li"),
                $listers2 = $listers.clone();
            $listers.on("click", function () {
                $this.clickI = $listers.index(this);
            });
            $listers2.on("click", function () {
                $this.clickI = $listers2.index(this);
            });
        }

        function isInteger(obj) {
            return Math.floor(obj) === obj;
        }
        $this.prepend($this.prevBtn);
        $this.prepend($this.nextBtn);
        $this.oNoSelect();

        $this.init = function () {
            $this.removeLi();
            if ($this.width() > 0) {

                if ($directionVertical) {
                    $originalH = $showbox.height();
                    $this.css("height", $originalH + "px");
                }
                //初始化 样式
                $movebox.attr("style", "");
                $cont.css("margin-" + $moveDirection, "0");
                $this.prevBtn.css({
                    "display": "inline-block",
                    "position": "absolute",
                    "z-index": 1
                });
                $this.nextBtn.css({
                    "display": "inline-block",
                    "position": "absolute",
                    "z-index": 1
                });
                $showWidth = $this.width() - $this.prevBtn.width() - $this.nextBtn.width();
                if ($directionVertical) {
                    $showHeight = $this.height() - $this.prevBtn.height() - $this.nextBtn.height();
                } else {
                    $showHeight = $showbox.height();
                }


                for (var i = 0; i < $li.length; i++) {
                    if (!$li.eq(i).hasClass('cur')) {
                        $autoLi = $li.eq(i);
                        break;
                    }
                }
                
                //重置显示个数
                if ($directionVertical) {
                    $this.showAmt = Math.round($showbox.height() / ($autoLi.height() + parseInt($autoLi.css("padding-top")) + parseInt($autoLi.css("padding-bottom"))) - 0.4);
                    $amount=$this.amount_yuan<=Math.ceil($cont.height()/$autoLi.height())?$this.amount_yuan:Math.ceil($cont.height()/$autoLi.height());
                } else {
                    $this.showAmt = Math.round($showbox.width() / ($autoLi.width() + parseInt($autoLi.css("padding-left")) + parseInt($autoLi.css("padding-right"))) - 0.4);
                    $amount=$this.amount_yuan<=Math.ceil($cont.width()/$autoLi.width())?$this.amount_yuan:Math.ceil($cont.width()/$autoLi.width());
                }
                //console.log($amount);
                // if($p.moveNum!=null){
                //  console.log($this.showAmt);
                // }
                //$movebox.attr("style","");
                
                $showPage = Math.ceil($amount / $this.showAmt);
                $this.i = 0;
                $movebox.css({
                    "position": "relative",
                    "left": "0px",
                    "top": "0px"
                });
                if (isInteger($speed) && $amount > $this.showAmt) {
                    if (isPC) {
                        $this.hover(function () {
                            $this.stop();
                        }, function () {
                            $this.play($speed);
                        });
                    }
                }
                //初始化计算
                if ($amount <= $this.showAmt) {
                    //如果 位置个数 >实际个数
                    //$showbox.attr("style","").css({"position":"relative"/*,"text-align":"center"*/});
                    $showWidth = $this.width();
                    // if($amount<$this.showAmt){
                    //  $li.css("width",$showWidth/$amount+"px");
                    // }
                    $showbox.css("width", "");
                    // $movebox.css({"position":"absolute","left":"0px","top":"0px"});
                    $this.prevBtn.hide();
                    $this.nextBtn.hide();
                    clearInterval($t);

                    if ($canTouch && $touchEvent !== null) {
                        $touchEvent.touchClear();
                        $canTouch = false;
                        $touchEvent = null;
                    }
                    $pager.empty();
                    return false;

                } else {

                    $canTouch = true;
                    //修改
                    if ($moveOne || $moveTouch) {

                        $yu = false;

                    } else {
                        if ($amount % $this.showAmt === 0) {
                            $yu = false;
                        } else {
                            $yu = true;
                        }
                    }

                    $li.attr("style", "");
                    if ($boxautoW) {
                        if ($directionVertical) {
                            $showbox.css({
                                "height": $showHeight + "px"
                            });
                            $showWidth = $showbox.width();
                            $cont.find("li").css("height", Math.ceil($showHeight / $this.showAmt) + "px");
                            $this.showHeightFn();
                        } else {
                            $showbox.css({
                                "width": $showWidth + "px"
                            });
                            $this.prevBtn.css({
                                "position": "relative",
                                "float": "left"
                            });
                            $this.nextBtn.css({
                                "position": "relative",
                                "float": "right"
                            });
                            $showHeight = $showbox.height();
                            $this.showWidthFn();
                        }

                    }
                    if ($directionVertical) {
                        if ($btnHobj === null) {
                            $this.prevBtn.css({
                                "width": $showbox.width() + "px"
                            });
                            $this.nextBtn.css({
                                "width": $showbox.width() + "px"
                            });
                        } else {
                            $this.prevBtn.css({
                                "width": $this.find($btnHobj).eq(0).width() + "px"
                            });
                            $this.nextBtn.css({
                                "width": $this.find($btnHobj).eq(0).width() + "px"
                            });
                        }
                    } else {
                        if ($btnHobj === null) {
                            $this.prevBtn.css({
                                "height": $showHeight + "px",
                                "line-height": $showHeight + "px"
                            });
                            $this.nextBtn.css({
                                "height": $showHeight + "px",
                                "line-height": $showHeight + "px"
                            });
                        } else {
                            $this.prevBtn.css({
                                "height": $this.find($btnHobj).eq(0).height() + "px",
                                "line-height": $this.find($btnHobj).eq(0).height() + "px"
                            });
                            $this.nextBtn.css({
                                "height": $this.find($btnHobj).eq(0).height() + "px",
                                "line-height": $this.find($btnHobj).eq(0).height() + "px"
                            });
                        }
                    }
                }


                if ($moveTouch || $moveOne) {
                    if ($directionVertical) {
                        $liW = Math.ceil($autoLi.height() + parseInt($autoLi.css("padding-top")) + parseInt($autoLi.css("padding-bottom")));
                    } else {
                        $liW = Math.ceil($autoLi.width() + parseInt($autoLi.css("padding-left")) + parseInt($autoLi.css("padding-right")));
                    }

                } else {
                    if ($directionVertical) {
                        $liW = $showbox.height();
                    } else {
                        $liW = $showbox.width();
                    }
                }

                if ($moveOne || $moveTouch) { /*移动1个 或 随机移动*/
                    if ($this.showAmt > 1 && !$loop) {
                        $page = Math.ceil(($amount - $this.showAmt + 1));
                        $pagerNum = $amount;

                    } else {
                        $page = $amount;
                        $pagerNum = $amount;
                    }

                } else { /*移动普通*/

                    $page = Math.ceil($amount / $this.showAmt);
                    $pagerNum = $page;
                }


                if ($moveOne) {
                    $moveDistance = $autoLi.width();
                }

                if ($loop && !$yu) {
                    if ($cont.find("li").length == $amount) {
                        $this.removeLi();
                        $this.addLi();
                    }
                    if ($directionVertical) {
                        $pianyi = -$amount * ($autoLi.height() + parseInt($autoLi.css("padding-top")) + parseInt($autoLi.css("padding-bottom"))) + "px";
                    } else {
                        $pianyi = -$amount * ($autoLi.width() + parseInt($autoLi.css("padding-left")) + parseInt($autoLi.css("padding-right"))) + "px";
                    }

                    $cont.css("margin-" + $moveDirection, $pianyi);
                } else {
                    if ($cont.find("li").length > $amount) {
                        $this.removeLi();
                    }
                    $cont.css("margin-" + $moveDirection, "0px");
                }

                //pager
                if ($pager) {

                    $pager.empty();
                    for (var i = 0; i < $pagerNum; i++) {

                        if ($pagerShow) {
                            var $pagerli = $newli.clone();
                            var img = $li.eq(i).html();
                            $pagerli.html(img);
                            $this.find($pager).append($pagerli);
                        } else {
                            $this.find($pager).append($newli.clone());
                        }

                    }
                    $this.find($pager).find("li").eq(0).addClass("cur");
                }

                $this.find($pager).find("li").on("click", function () {
                    var i = $this.find($pager).find("li").index($(this));
                    if (i > $page - 1) {
                        i = $page - 1;
                    }
                    $this.goto(i);
                });

                if (isInteger($speed) && !$playing) {
                    $this.play($speed);
                }

                if ($canTouch && $touchEvent === null) {
                    if ($directionVertical) { //纵向
                        $touchEvent = $showbox.oTouch({
                            touchStart: function ($p) {
                                if (isInteger($speed) && $playing) {
                                    $this.stop();
                                }
                                $active = true;
                            },
                            touchMoveV: function ($p) {

                                if ($page > 1) {
                                    if (isIe8 || isIe9 || isUC) {

                                        if ($moveDistance === null) {

                                            $movebox.css("top", -$this.i * $liW + ($p.moveY - $p.startY) + "px");
                                        } else {
                                            if ($this.showAmt + $this.i >= $amount) {
                                                $movebox.css("top", -$this.i * $moveDistance + ($p.moveY - $p.startY) + "px");
                                            } else {
                                                $movebox.css("top", -$this.i * $moveDistance + ($p.moveY - $p.startY) + "px");
                                            }
                                        }

                                    } else {

                                        if ($moveDistance === null) {
                                            $movebox.oCss3({
                                                transform: "translate3d(0px," + -($this.i * $liW + ($p.startY - $p.moveY)) + "px,0px)",
                                                "transition-duration": "0s"
                                            });
                                        } else {
                                            if ($this.showAmt + $this.i >= $amount) {
                                                $movebox.oCss3({
                                                    transform: "translate3d(0px," + -($this.i * $moveDistance + ($p.startY - $p.moveY)) + "px,0px)",
                                                    "transition-duration": "0s"
                                                });
                                            } else {
                                                $movebox.oCss3({
                                                    transform: "translate3d(0px," + -($this.i * $moveDistance + ($p.startY - $p.moveY)) + "px,0px)",
                                                    "transition-duration": "0s"
                                                });
                                            }
                                        }
                                    }
                                }

                            },
                            touchUp: function ($p) {

                                if ($page > 1) {
                                    if ($p.startY - $p.endY > 20 && $canMove) {
                                        $touchI = Math.abs(Math.ceil(($p.startY - $p.endY) / $liW));
                                        $this.next();
                                    } else {

                                        if (isIe8 || isIe9 || isUC) {
                                            if ($moveDistance === null) {
                                                $movebox.stop().animate({
                                                    "top": -$this.i * $liW + "px"
                                                }, 300);
                                            } else {
                                                $movebox.stop().animate({
                                                    "top": -$this.i * $moveDistance + "px"
                                                }, 300);
                                            }

                                        } else {
                                            if ($moveDistance === null) {
                                                $movebox.oCss3({
                                                    transform: "translate3d(0px," + -($this.i * $liW) + "px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            } else {
                                                $movebox.oCss3({
                                                    transform: "translate3d(0px," + -($this.i * $moveDistance) + "px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            }
                                        }

                                    }

                                    // if($gotoFn!==null){
                                    //  $gotoFn($this.i);
                                    // }
                                }

                            },
                            touchDown: function ($p) {

                                if ($page > 1) {

                                    if ($p.startY - $p.endY < -20 && $canMove) {

                                        $touchI = Math.abs(Math.ceil(($p.endY - $p.startY) / $liW));

                                        $this.prev();
                                    } else {
                                        if (isIe8 || isIe9 || isUC) {
                                            if ($moveDistance === null) {
                                                $movebox.stop().animate({
                                                    "top": -$this.i * $liW + "px"
                                                }, 300);
                                            } else {
                                                $movebox.stop().animate({
                                                    "top": -$this.i * $moveDistance + "px"
                                                }, 300);
                                            }

                                        } else {

                                            if ($moveDistance === null) {
                                                $movebox.oCss3({
                                                    transform: "translate3d(0px," + -($this.i * $liW) + "px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            } else {
                                                $movebox.oCss3({
                                                    transform: "translate3d(0px," + -($this.i * $moveDistance) + "px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            }
                                        }

                                    }
                                    // if($gotoFn!==null){
                                    //  $gotoFn($this.i);
                                    // }
                                }

                            },
                            touchEnd: function () {
                                if (!isPC) {
                                    if (isInteger($speed) && !$playing) {
                                        $this.play($speed);
                                    }
                                }
                            }
                        });
                    } else { //横向
                        $touchEvent = $showbox.oTouch({
                            touchStart: function () {
                                if (isInteger($speed) && $playing) {
                                    $this.stop();
                                }
                                $active = true;
                            },
                            touchMoveH: function ($p) {

                                if ($page > 1) {
                                    if (isIe8 || isIe9 || isUC) {
                                        if ($moveDistance === null) {
                                            $movebox.css("left", -$this.i * $liW + ($p.moveX - $p.startX) + "px");
                                        } else {
                                            if ($this.showAmt + $this.i >= $amount) {

                                                $movebox.css("left", -$this.i * $moveDistance + ($p.moveX - $p.startX) + "px");
                                            } else {
                                                $movebox.css("left", -$this.i * $moveDistance + ($p.moveX - $p.startX) + "px");
                                            }
                                        }

                                    } else {

                                        if ($moveDistance === null) {
                                            $movebox.oCss3({
                                                transform: "translate3d(" + -($this.i * $liW + ($p.startX - $p.moveX)) + "px,0px,0px)",
                                                "transition-duration": "0s"
                                            });
                                        } else {
                                            if ($this.showAmt + $this.i >= $amount) {
                                                $movebox.oCss3({
                                                    transform: "translate3d(" + -($this.i * $moveDistance + ($p.startX - $p.moveX)) + "px,0px,0px)",
                                                    "transition-duration": "0s"
                                                });
                                            } else {
                                                $movebox.oCss3({
                                                    transform: "translate3d(" + -($this.i * $moveDistance + ($p.startX - $p.moveX)) + "px,0px,0px)",
                                                    "transition-duration": "0s"
                                                });
                                            }
                                        }
                                    }
                                }

                            },
                            touchLeft: function ($p) {

                                if ($page > 1) {
                                    if ($p.startX - $p.endX > 50 && $canMove) {
                                        $touchI = Math.abs(Math.ceil(($p.startX - $p.endX) / $liW));
                                        $this.next();
                                    } else {

                                        if (isIe8 || isIe9 || isUC) {
                                            if ($moveDistance === null) {
                                                $movebox.stop().animate({
                                                    "left": -$this.i * $liW + "px"
                                                }, 300);
                                            } else {
                                                $movebox.stop().animate({
                                                    "left": -$this.i * $moveDistance + "px"
                                                }, 300);
                                            }

                                        } else {
                                            if ($moveDistance === null) {
                                                $movebox.oCss3({
                                                    transform: "translate3d(" + -($this.i * $liW) + "px,0px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            } else {
                                                $movebox.oCss3({
                                                    transform: "translate3d(" + -($this.i * $moveDistance) + "px,0px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            }
                                        }

                                    }

                                    // if($gotoFn!==null){
                                    //  $gotoFn($this.i);
                                    // }
                                }

                            },
                            touchRight: function ($p) {

                                if ($page > 1) {
                                    if ($p.startX - $p.endX < -50 && $canMove) {
                                        $touchI = Math.abs(Math.ceil(($p.endX - $p.startX) / $liW));

                                        $this.prev();
                                    } else {
                                        if (isIe8 || isIe9 || isUC) {
                                            if ($moveDistance === null) {
                                                $movebox.stop().animate({
                                                    "left": -$this.i * $liW + "px"
                                                }, 300);
                                            } else {
                                                $movebox.stop().animate({
                                                    "left": -$this.i * $moveDistance + "px"
                                                }, 300);
                                            }

                                        } else {

                                            if ($moveDistance === null) {
                                                $movebox.oCss3({
                                                    transform: "translate3d(" + -($this.i * $liW) + "px,0px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            } else {
                                                $movebox.oCss3({
                                                    transform: "translate3d(" + -($this.i * $moveDistance) + "px,0px,0px)",
                                                    "transition-duration": "0.3s"
                                                });
                                            }
                                        }

                                    }
                                    // if($gotoFn!==null){
                                    //  $gotoFn($this.i);
                                    // }
                                }

                            },
                            touchEnd: function () {
                                if (!isPC) {
                                    if (isInteger($speed) && !$playing) {
                                        $this.play($speed);
                                    }
                                }
                            }
                        });
                    }

                }
                if ($p.touchClear) {
                    $showbox.oTouch({
                        "clearE": true
                    });
                }
                //$this.oClear();
                $this.pagerlist();
            }
        };

        $this.play = function (t) {
            setTimeout(function () {
                clearInterval($t);
                $t = setInterval(function () {
                    //$touchI=1;
                    $this.next();
                }, t);
                $playing = true;
            }, 500);
        };

        $this.showWidthFn = function () { //显示区域宽度重置

            if ($showWidth % $autoLi.width() !== 0) {
                $showWidth = Math.ceil($autoLi.width()) * $this.showAmt;

                $showbox.css({
                    "width": $showWidth + "px"
                });
                if ($boxautoW) {
                    $this.prevBtn.css("width", Math.floor(($this.width() - $showWidth) / 2) + "px");
                    $this.nextBtn.css("width", Math.floor(($this.width() - $showWidth) / 2) + "px");
                }
            }
        };
        $this.showHeightFn = function () { //显示区域高度重置
            if ($showHeight % $autoLi.height() !== 0) {
                $showHeight = Math.ceil($autoLi.height()) * $this.showAmt;
                $showbox.css({
                    "height": $showHeight + "px"
                });
                if ($boxautoW) {
                    $this.prevBtn.css("height", Math.floor(($originalH - $showHeight) / 2) + "px");
                    $this.nextBtn.css("height", Math.floor(($originalH - $showHeight) / 2) + "px");
                    $showbox.css({
                        top: Math.floor(($originalH - $showHeight) / 2) + "px"
                    });
                }
            }
        };

        $this.stop = function () {
            clearInterval($t);
            $playing = false;
        };

        $this.change = function () {
            //初始化
            $li = $showbox.find("li");
            $amount = $li.length;
            $cont = $showbox.find("ul");
            if ($loop) {
                $clone = $cont.clone();
                $listers = $clone.find("li");
                $listers2 = $listers.clone();
            }
            $this.init();
        };

        $this.goto = function (i) {
            $canMove = false;
            if ($loop && !$yu) {

                //循环通常
                if ($moveDistance === null) {
                    $nextLeft = (-i * $liW) + "px";

                } else {
                    $nextLeft = (-i * $moveDistance) + "px";
                    // if(/*$this.showAmt+*/i>=$amount){
                    //  //$nextLeft=($amount-$this.showAmt)/$moveOne*$moveDistance+"px";
                    // }
                }
                $this.i = i;

                if (isIe8 || isIe9 || isUC) {
                    if ($directionVertical) {
                        $movebox.stop().animate({
                            top: $nextLeft
                        }, 300, function () {
                            if (i >= $page) {
                                $movebox.css({
                                    top: -$this.i * $liW
                                });
                            } else if (i <= -1) {
                                $movebox.css({
                                    top: -$this.i * $liW
                                });
                            }
                        });
                    } else {
                        $movebox.stop().animate({
                            left: $nextLeft
                        }, 300, function () {
                            if (i >= $page) {
                                $movebox.css({
                                    left: -$this.i * $liW
                                });
                            } else if (i <= -1) {
                                $movebox.css({
                                    left: -$this.i * $liW
                                });
                            }
                        });
                    }

                } else {
                    if ($directionVertical) {
                        $movebox.oCss3({
                            transform: "translate3d(0px," + $nextLeft + ",0px)",
                            "transition-duration": "0.3s"
                        });
                    } else {
                        $movebox.oCss3({
                            transform: "translate3d(" + $nextLeft + ",0px,0px)",
                            "transition-duration": "0.3s"
                        });
                    }

                }

                if (i >= $page) {

                    //$cont.css("margin-left",$pianyi);

                    $this.i = i - $page;

                    setTimeout(function () {
                        //重置位置

                        if (isIe8 || isIe9 || isUC) {
                            //$movebox.css({left:-$this.i*$liW});


                        } else {
                            if ($directionVertical) {
                                $movebox.oCss3({
                                    transform: "translate3d(0px," + -$this.i * $liW + "px" + ",0px)",
                                    "transition-duration": "0s"
                                });
                            } else {
                                $movebox.oCss3({
                                    transform: "translate3d(" + -$this.i * $liW + "px" + ",0px,0px)",
                                    "transition-duration": "0s"
                                });
                            }
                        }



                        if (isInteger($speed) && !isPC && !$playing) {
                            $this.play($speed);
                        }

                    }, 200);



                } else if (i <= -1) {
                    //$cont.css("margin-left",$pianyi);
                    $this.i = $page + i;

                    setTimeout(function () {
                        //重置位置
                        if (isIe8 || isIe9 || isUC) {
                            //  $movebox.css({left:-$this.i*$liW+"px"});
                        } else {
                            if ($directionVertical) {
                                $movebox.oCss3({
                                    transform: "translate3d(0px," + -$this.i * $liW + "px" + ",0px)",
                                    "transition-duration": "0s"
                                });
                            } else {
                                $movebox.oCss3({
                                    transform: "translate3d(" + -$this.i * $liW + "px" + ",0px,0px)",
                                    "transition-duration": "0s"
                                });
                            }
                        }


                        if (isInteger($speed) && !isPC && !$playing) {
                            $this.play($speed);
                        }
                    }, 200);

                } else {

                    setTimeout(function () {

                        if (isInteger($speed) && !isPC && !$playing) {
                            $this.play($speed);
                        }
                    }, 200);
                }
                setTimeout(function () {
                    $canMove = true;
                }, 300);

            } else {

                //不循环通常
                if ($moveDistance === null) {
                    $nextLeft = i * $liW + "px";
                } else {
                    $nextLeft = i * $moveDistance + "px";
                    if ($this.showAmt + i > $amount) {
                        $nextLeft = ($amount - $this.showAmt) / $moveDistance + "px";
                    }
                }

                $this.i = i;
                if (isIe8 || isIe9 || isUC) {
                    if ($directionVertical) {
                        $movebox.stop().animate({
                            top: "-" + $nextLeft
                        }, 300, function () {});
                    } else {
                        $movebox.stop().animate({
                            left: "-" + $nextLeft
                        }, 300, function () {});
                    }

                } else {
                    if ($directionVertical) {
                        $movebox.oCss3({
                            transform: "translate3d(0px,-" + $nextLeft + ",0px)",
                            "transition-duration": "0.3s"
                        });
                    } else {
                        $movebox.oCss3({
                            transform: "translate3d(-" + $nextLeft + ",0px,0px)",
                            "transition-duration": "0.3s"
                        });
                    }

                }


                setTimeout(function () {
                    $canMove = true;
                    if (isInteger($speed) && !isPC && !$playing) {
                        $this.play($speed);
                    }
                }, 300);

            }
            $this.prevOrNextFn();
            if ($playFn !== null) {
                $playFn({
                    i: $this.i,
                    next: $this.nextBtn,
                    prev: $this.prevBtn
                });
            }

            $this.pagerlist();

        };

        $this.prevOrNextFn = function () {
            if ($nextFn !== null && $next) {
                $nextFn($this.i);
            } else if ($prevFn !== null && $prev) {
                $prevFn($this.i);
            }
        };


        $this.pagerlist = function () {
            if ($this.showAmt > 1) {
                if ($moveTouch || $moveOne) {
                    if ($loop) {
                        $pager.find("li").removeClass("cur").removeClass("firstcur");
                        for (var i = 0; i < $this.showAmt; i++) {
                            if ($this.i + i >= $amount) {
                                $pager.find("li").eq($this.i - $amount + i).addClass("cur");
                            } else {
                                $pager.find("li").eq($this.i + i).addClass("cur");
                            }
                        }
                        $pager.find("li").eq($this.i).addClass("firstcur");
                    } else {
                        $pager.find("li").removeClass("cur").removeClass("firstcur");
                        for (var i = 0; i < $this.showAmt; i++) {
                            if ($this.i > $amount - $this.showAmt) {
                                $pager.find("li").eq($amount - $this.showAmt + i).addClass("cur");
                            } else {
                                $pager.find("li").eq($this.i + i).addClass("cur");
                            }
                        }
                        $pager.find("li").eq($this.i).addClass("firstcur");
                    }
                } else {
                    $pager.find("li").eq($this.i).addClass("cur").siblings().removeClass("cur");
                }

            } else {
                $pager.find("li").eq($this.i).addClass("cur").siblings().removeClass("cur");
            }

            if ($loop) {
                $listers.removeClass("cur").eq($this.i).addClass("cur");
                $listers2.removeClass("cur").eq($this.i).addClass("cur");
            }
            $li.removeClass("cur").eq($this.i).addClass("cur");

            $touchI = 1;

        };


        //轮播个数大于显示个数
        if ($havescroll) {
            var $scrollbar = $("<div class='scroll'></div>");
            var $scrollmark = $("<span></span>");
            $scrollbar.append($scrollmark);

        }

        $this.addLi = function () {
            if ($added === false) {
                $listers.appendTo($cont);
                $listers2.appendTo($cont);
                $listers.on("click",function () {
                    $this.clickI = $listers.index(this);
                });
                $listers2.on("click",function () {
                    $this.clickI = $listers2.index(this);
                });
                $added = true;
            }

        };

        $this.removeLi = function () {
            if ($added === true) {
                $listers.remove();
                $listers2.remove();
                $added = false;
            }

        };

        $this.prevBtn.click(function () {
            $this.prev();

        });

        $this.prev = function () {

            $next = false;
            $prev = true;
            if ($canMove) {
                if ($moveOne) {
                    $this.i--;
                } else {
                    $touchI > $this.showAmt ? $this.showAmt : $touchI;
                    $this.i -= $touchI;
                }

                if ($loop && !$yu) {
                    $this.goto($this.i);

                } else if ($this.i < 0) {
                    if (!$loop || $yu) {
                        if ($active) { //滑动触发第一个
                            if ($moveOne) {
                                $this.i++;
                            } else {
                                $this.i = 0;
                            }
                            $prev = false;
                            $active = false;
                        } else {
                            $this.i = $page - 1;
                        }
                    }
                    $this.goto($this.i);

                } else {
                    $this.goto($this.i);

                }

                // else if($gotoFn!==null){
                //  $gotoFn($this.i);
                // }
            }
        };

        $this.nextBtn.click(function () {
            //$touchI=1;
            $this.next();
        });

        $this.next = function () {

            $next = true;
            $prev = false;
            if ($canMove) {

                if ($moveOne) {
                    $this.i++;
                } else {
                    $touchI > $this.showAmt ? $this.showAmt : $touchI;
                    $this.i += $touchI;
                }

                if ($loop && !$yu) { //循环
                    $this.goto($this.i);
                    if ($nextFn !== null) {
                        $nextFn($this.i);
                    }
                } else if ($this.i > $page - 1) {
                    if (!$loop || $yu) {
                        if ($active) { //滑动触发最后一个
                            if ($moveOne) {
                                $this.i--;
                            } else {
                                $this.i = $page - 1;
                            }
                            $next = false;
                            $active = false;
                        } else {
                            $this.i = 0;
                        }

                    } //else{
                    //  $this.i=$page-1;
                    //}
                    $this.goto($this.i);
                } else {
                    $this.goto($this.i);

                }

                // else if($gotoFn!==null){
                //  $gotoFn($this.i);
                // }
            }

        };

        if ($wResize) {
            $(window).resize(function () {
                $this.init();
            });
        }

        return $this;
    };

    //高度跟随
    $.fn.oHrel = function (p) {
        var ele = $(this),
            backEle = [];
        ele.each(function () {
            var defaults = {
                resize: true,
                obj: null
            };
            var $p = $.extend(defaults, p);
            var $this = {};
            $this.obj = $(this);
            if ($this.obj.attr("obj") !== null) {
                $this.target = $($this.obj.attr("obj"));
            }
            if ($p.obj !== null) {
                $this.target = eval($p.obj);
            }
            $this.h = 0;

            $this.init = function () {
                $this.h = $this.target.height();
                $this.obj.css("height", $this.h + "px");
            };

            if ($p.resize) {
                $(window).resize(function () {
                    $this.init();
                });
            }
            backEle.push($this);
        });
        var $backEle = $(backEle);
        $backEle.init = function (a) {
            if (a) {
                backEle[a].init();
            } else {
                $backEle.each(function (i) {
                    backEle[i].init();
                });
            }
        };
        return $backEle;
    };

    $.fn.oCss3 = function ($p, a) {
        var $this = $(this),
            $style = "",
            // $styleJson=jquery.press,
            $qz = ["-webkit-", "-o-", "-moz-"];
        if (a === false) {
            $style = $this.attr("style");
        }
        for (var o in $p) {
            $style += ";" + o + ":" + $p[o];

            for (var i = 0; i < $qz.length; i++) {
                $style += ";" + $qz[i] + o + ":" + $p[o];
            }
        }
        $this.attr("style", $style);
    };

    $.fn.oRotate = function ($p) {
        var $this = $(this);
        if (isIe8) {
            var m11 = Math.cos($p),
                m12 = -Math.sin($p),
                m21 = Math.sin($p),
                m22 = Math.cos($p),
                $width = $this.width(),
                $height = $this.height(),
                dx = -$width / 2 * Math.cos($p) + $height / 2 * Math.sin($p) + $width / 2,
                dy = -$width / 2 * Math.sin($p) - $height / 2 * Math.cos($p) + $height / 2,
                $style = $this.attr("style");
            $style += ";filter:progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=" + m12 + ",M21=" + m21 + ",M22=" + m22 + ",SizingMethod='auto expand');";
            $this.attr("style", $style);
        } else {
            $this.oCss3({
                "transform": "rotate(" + $p + "deg)"
            }, false);
        }
    };

    // $.fn.oAnimate=function($p){
    //  defaults=({css:({}),speed:300});
    //  var $this=$(this);
    // }

    $.fn.oPopup = function (p) {

        defaults = {
            "confirm": ".js_confirm",
            "confirmFn": null,
            "zz": "<div class='o_shade'></div>",
            "closeFn": null,
            absolute: false
        };
        $p = $.extend(defaults, p);

        var $this = $(this);
        $this.obj = $(this);
        $this.target = null;
        if ($(this).attr("oData-popup") !== null) {
            $this.target = $($(this).attr("oData-popup"));
        }
        $this.zz = $($p.zz);
        $this.confirm = $this.target.find($p.confirm);
        $this.closebtn = $this.target.find(".js_popupClose");
        $this.confirmFn = $p.confirmFn;
        $this.closeFn = $p.closeFn;
        $this.absolute = $p.absolute;
        $this.top = 0;

        if ($this.absolute) {
            $this.target.addClass("absolute");
        }

        $this.on("click", function () {
            $this.open();
        });

        $this.open = function () {
            $this.zz.appendTo($(".o_body")).addClass("show");
            $this.target.show().addClass("show");

            if ($this.confirm.length > 0) {
                $this.confirm.off();
                $this.confirm.on("click", function () {
                    $this.closebtn.click();
                    if ($this.confirmFn) {
                        $this.confirmFn({
                            selfEle: $this.obj,
                            targetEle: $this.target,
                            self: $this
                        });
                    }

                });
            }
            $this.init();
        };

        $this.closebtn.on("click", function () {
            $this.close();
        });

        $this.close = function () {
            $this.target.addClass("hide");
            $this.zz.removeClass("show");
            setTimeout(function () {
                $this.zz.detach();
                $this.target.removeClass("hide").removeClass("show").hide();
                if ($this.closeFn !== null) {
                    $this.closeFn($this.target);
                }

            }, 300);
        };

        $this.init = function () {
            var wH = $(window).height(),
                dH = $(document).height(),
                scrollH = $(window).scrollTop(),
                objH = $this.target.height();
            if (!$this.absolute) { //不固定
                if (objH <= wH) { //小于
                    $this.top = (wH - objH) / 2;
                    $this.target.css('top', $this.top).removeClass("absolute");
                } else { //大于
                    if (scrollH + objH + 30 > dH) {
                        scrollH = dH - (objH + 60);
                        $("html,body").animate({
                            scrollTop: scrollH
                        }, 200);
                        $this.top = scrollH + 30;
                        $this.target.css('top', $this.top).addClass("absolute");
                    } else {
                        $this.top = scrollH + 30;
                        $this.target.css('top', $this.top).addClass("absolute");
                    }
                }
            } else { //固定
                if (objH <= wH) {
                    $this.top = scrollH + (wH - objH) / 2;
                    $this.target.css('top', $this.top);
                } else {
                    if (scrollH + objH + 30 > dH) {
                        scrollH = dH - (objH + 60);
                        $("html,body").animate({
                            scrollTop: scrollH
                        }, 200);
                        $this.top = scrollH + 30;
                        $this.target.css('top', $this.top).addClass("absolute");
                    } else {
                        $this.top = scrollH + 30;
                        $this.target.css('top', $this.top);
                    }
                }
            }
        };

        if (isPC) {
            $(window).resize(function () {
                $this.init();
            });
        }

        return $this;
    };

    // $.fn.oAlert=function(p){
    //  defaults={"info":"没有信息"};
    //  $p=$.extend(defaults,p);
    //  var $body=$(".o_body"),
    //      $this={};

    //      $this.openbtn=$("<span>");
    //      $this.openbtn.attr("href",".js_alertbox");
    //      $this.info=$p.info;

    //      $this.box=$("<div>");
    //      $this.box.addClass("o_popup o_alert js_alertbox");

    //      $this.closebtn=$("<span>");
    //      $this.closebtn.addClass("o_popupclose js_popupClose");

    //      $this.contbox=$("<div>");
    //      $this.contbox.addClass("cont");

    //      $this.closebtn.appendTo($this.box);
    //      $this.contbox.appendTo($this.box);
    //      $body.after($this.box);
    //      $body.append($this.openbtn);

    //      $this.openbtn.oPopup();
    //      $this.open=function(info){
    //          $this.contbox.html(info);
    //          $this.openbtn.click();
    //      };

    //      return $this;
    // };

    $.fn.oNoSelect = function () {
        if (!isIe) {
            $(this).oCss3({
                "user-select": "none"
            }, false);
        } else if (isPC) {

            $(this).on("selectstart", function () {
                return false;
            });
            $(this).on("drag", function () {
                return false;
            });
        }
    };

    $.fn.oCutImg = function (p) {
        defaults = {
            "imgurl": [],
            showimg: "",
            min: 50,
            "windowResize": true
        };
        $p = $.extend(defaults, p);
        var $this = $(this),
            $url = $p.imgurl,
            $min = $p.min,
            $showimg = $($p.showimg),
            $mainbox = $("<div class='o_cutimgbox'>"),
            $bgbox = $("<div class='bgbox'>"),
            $imgbox = $("<div class='imgbox'>"),
            $cutbox = $("<div class='cutbox'>"),
            $cutimg = $("<div class='box'>"),
            $controlbox = $("<div class='controlbox'>"),
            $control = $("<div class='control'>"),
            $resize = $("<div class='resize'>"),
            $img = $("<img>"),
            $maxH = $this.height(),
            $maxW = $this.width(),
            $maxCol = $colW,
            $imgautoH,
            $imgH,
            $imgW,
            $colW,
            $imgL,
            $imgT,
            $curL,
            $curT,
            $longName,
            $bl,
            $showbl,
            $degI = 0,
            $cutInfo;


        $img.attr("src", $url[0]);
        var $img2 = $img.clone(true);

        $this.changeImg = function (url) {
            $degI = 0;
            $url = url;
            $img.attr("src", $url[0]);
            $img2.attr("src", $url[0]);
        };

        $this.rotate = function () {
            $degI++;
            if ($degI > 3) {
                $degI = 0;
            }
            $img.attr("src", $url[$degI]);
            $img2.attr("src", $url[$degI]);

        };

        $this.reset = function () {
            $img.appendTo($imgbox);
            $imgbox.appendTo($bgbox);

            $img2.appendTo($cutimg);
            $cutimg.appendTo($cutbox);

            $resize.appendTo($control);
            $control.appendTo($controlbox);
            $mainbox.append($bgbox).append($cutbox).append($controlbox);
            $this.append($mainbox);

            $imgbox.attr("style", "");
            $img2.attr("style", "");
            $imgbox.attr("style", "");
            $img.attr("style", "");
            $imgautoH = $img2.height();
            $imgW = $img.width();
            $imgH = $img.height();
            if ($img.height() > $this.height()) {
                $imgH = $this.height();
                $imgbox.height($imgH);
                $img.height($imgH);
                $img2.height($imgH);
                $imgW = $img.width();
            }
            $longName = $imgW >= $imgH ? "width" : "height";

            if (isIe) {

                $img.attr("style", "");
                $imgbox.attr("style", "");
                if ($longName == "height") {
                    if ($img.height() > $maxH) {
                        $img.height($maxH);
                        $imgbox.css({
                            "height": $img.height(),
                            "width": "auto"
                        });
                    }
                } else if ($longName == "width") {

                    if ($img.width() > $maxW) {
                        $img.width($maxW);
                        $imgbox.css({
                            "width": $img.width(),
                            "height": "auto"
                        });
                    }
                }
                //ie重置
                $imgW = $img.width();
                $imgH = $img.height();

            }
            $colW = $imgW - $imgH > 0 ? $imgH : $imgW;
            $colW = $colW < $control.width() ? $colW : $control.width();
            $maxCol = $colW;

            $imgL = -Math.round(($imgW - $colW) / 2);
            $imgT = -Math.round(($imgH - $colW) / 2);
            $img2.css({
                "width": $imgW,
                "height": $imgH,
                "left": $imgL,
                "top": $imgT
            });

            if (!isIe8) {
                $imgbox.css({
                    "width": $imgW,
                    "height": $imgH
                });
                $cutbox.css({
                    "width": $imgW,
                    "height": $imgH,
                    "margin-left": -Math.round($imgW / 2),
                    "margin-top": -Math.floor($imgH / 2)
                });
                $controlbox.css({
                    "width": $imgW,
                    "height": $imgH,
                    "margin-left": -Math.round($imgW / 2),
                    "margin-top": -Math.floor($imgH / 2)
                });
            } else {
                $imgbox.css({
                    "width": $imgW,
                    "height": $imgH
                });
                $cutbox.css({
                    "width": $imgW,
                    "height": $imgH,
                    "margin-left": -Math.floor($imgW / 2),
                    "margin-top": -Math.floor($imgH / 2)
                });
                $controlbox.css({
                    "width": $imgW,
                    "height": $imgH,
                    "margin-left": -Math.floor($imgW / 2),
                    "margin-top": -Math.floor($imgH / 2)
                });
            }


            $curL = Math.round(($imgW - $colW) / 2);
            $curT = Math.round(($imgH - $colW) / 2);
            $control.css({
                "width": $colW,
                "height": $colW,
                "left": $curL,
                "top": $curT
            });
            $cutimg.css({
                "width": $colW,
                "height": $colW,
                "left": $curL,
                "top": $curT
            });
            //showimg
            if ($longName == "width") {
                $bl = $imgH / $colW;
            } else if ($longName == "height") {
                $bl = $imgW / $colW;
            }

            $showimg.each(function () {
                var $bl2 = $(this).parent().width() / $colW;
                $(this).parent().css({
                    "position": "relative",
                    "overflow": "hidden",
                    "-webkit-transform": "translateZ(0)",
                    "-webkit-backface-visiblity": "hidden"
                });
                if ($longName == "width") {
                    $(this).attr("src", $url[$degI]).css({
                        "position": "absolute",
                        "height": $(this).parent().width() * $bl,
                        "width": "auto",
                        "left": -$curL * $bl2,
                        "top": -$curT * $bl2
                    });
                } else if ($longName == "height") {
                    $(this).attr("src", $url[$degI]).css({
                        "position": "absolute",
                        "width": $(this).parent().width() * $bl,
                        "height": "auto",
                        "left": -$curL * $bl2,
                        "top": -$curT * $bl2
                    });
                }
            });

        };

        $control.oTouch({
            touchStart: function () {

            },
            touchMove: function ($p) {
                if ($curL + ($p.moveX - $p.startX) >= 0 && $curL + ($p.moveX - $p.startX) <= $imgW - $colW) {

                    $cutimg.css({
                        "left": $curL + ($p.moveX - $p.startX)
                    });
                    $control.css({
                        "left": $curL + ($p.moveX - $p.startX)
                    });
                    $img2.css({
                        "left": $imgL - ($p.moveX - $p.startX)
                    });

                } else if ($curL + ($p.moveX - $p.startX) < 0) {
                    //小于
                    $img2.css({
                        "left": 0
                    });
                    $cutimg.css({
                        "left": 0
                    });
                    $control.css({
                        "left": 0
                    });
                } else if ($curL + ($p.moveX - $p.startX) > $imgW - $colW) {
                    //大于
                    $img2.css({
                        "left": $colW - $imgW
                    });
                    $cutimg.css({
                        "left": $imgW - $colW
                    });
                    $control.css({
                        "left": $imgW - $colW
                    });
                }

                if ($curT + ($p.moveY - $p.startY) >= 0 && $curT + ($p.moveY - $p.startY) <= $imgH - $colW) {
                    $img2.css({
                        "top": $imgT - ($p.moveY - $p.startY)
                    });
                    $cutimg.css({
                        "top": $curT + ($p.moveY - $p.startY)
                    });
                    $control.css({
                        "top": $curT + ($p.moveY - $p.startY)
                    });
                } else if ($curT + ($p.moveY - $p.startY) < 0) {
                    $img2.css({
                        "top": 0
                    });
                    $cutimg.css({
                        "top": 0
                    });
                    $control.css({
                        "top": 0
                    });
                } else if ($curT + ($p.moveY - $p.startY) > $imgH - $colW) {
                    $img2.css({
                        "top": $colW - $imgH
                    });
                    $cutimg.css({
                        "top": $imgH - $colW
                    });
                    $control.css({
                        "top": $imgH - $colW
                    });
                }

                $showimg.each(function () {
                    $(this).css({
                        "left": $img2.position().left * ($(this).width() / $img2.width()),
                        "top": $img2.position().top * ($(this).width() / $img2.width())
                    });

                });

            },
            touchEnd: function ($p) {
                $curL = $control.position().left;
                $curT = $control.position().top;
                $imgL = $img2.position().left;
                $imgT = $img2.position().top;
            },
            clearE: true
        });

        $resize.oTouch({
            touchStart: function ($p) {

            },
            touchMove: function ($p) {

                var m = Math.abs($p.moveX - $p.startX) > Math.abs($p.moveY - $p.startY) ? $p.moveX - $p.startX : $p.moveY - $p.startY;

                if ($colW + m + $curL <= $imgW && $colW + m + $curT <= $imgH && $colW + m >= $min) {

                    $control.css({
                        "width": $colW + m,
                        "height": $colW + m
                    });
                    $cutimg.css({
                        "width": $colW + m,
                        "height": $colW + m
                    });

                } else if ($colW + m + $curL > $imgW && $colW + m + $curT <= $imgH) {

                    $control.css({
                        "width": $imgW - $curL,
                        "height": $imgW - $curL
                    });
                    $cutimg.css({
                        "width": $imgW - $curL,
                        "height": $imgW - $curL
                    });

                } else if ($colW + m + $curT > $imgH && $colW + m + $curL <= $imgW) {

                    $control.css({
                        "width": $imgH - $curT,
                        "height": $imgH - $curT
                    });
                    $cutimg.css({
                        "width": $imgH - $curT,
                        "height": $imgH - $curT
                    });

                } else if ($colW + m < $min) {

                    $control.css({
                        "width": $min,
                        "height": $min
                    });
                    $cutimg.css({
                        "width": $min,
                        "height": $min
                    });

                }

                if ($longName == "width") {
                    $bl = $imgW / $control.width();

                } else if ($longName == "height") {
                    $bl = $imgH / $control.height();
                }

                $showimg.each(function () {

                    var bl = $(this).parent().width() / $control.width();

                    if ($longName == "width") {
                        $(this).css({
                            "width": $(this).parent().width() * $bl,
                            "height": "auto",
                            "left": $img2.position().left * bl,
                            "top": $img2.position().top * bl
                        });

                    } else if ($longName == "height") {
                        $(this).css({
                            "height": $(this).parent().width() * $bl,
                            "width": "auto",
                            "left": $img2.position().left * bl,
                            "top": $img2.position().top * bl
                        });
                    }
                });

            },
            touchEnd: function () {
                $colW = $control.width();
            },

            clearE: true
        });

        $this.init = function () {
            $img.load(function () {
                $this.reset();
            });
        };

        if ($p.windowResize) {
            $(window).resize(function () {
                $this.reset();
            });
        }

        $this.cut = function () {
            var bl_auto = $imgautoH / $img.height();
            $cutInfo = {
                url: $url[$degI] + "",
                x: Math.floor($control.position().left * bl_auto),
                y: Math.floor($control.position().top * bl_auto),
                width: Math.floor($control.height() * bl_auto)
            };
            return ($cutInfo);
        };
        return $this;

    };

    $.fn.oTouch = function ($p) {
        defaults = {
            "clearE": false,
            "touchStart": function () {},
            "touchMove": null,
            "touchMoveH": null,
            "touchMoveV": null,
            "touchLeft": function () {},
            "touchRight": function () {},
            "touchUp": function () {},
            "touchDown": function () {},
            "touchEnd": function () {}
        };
        $p = $.extend(defaults, $p);
        var $this = $(this),
            $startX,
            $startY,
            $endX,
            $endY,
            $moveX,
            $moveY,
            $touchStart = $p.touchStart,
            $touchMove = $p.touchMove,
            $touchMoveH = $p.touchMoveH,
            $touchMoveV = $p.touchMoveV,
            $touchLeft = $p.touchLeft,
            $touchRight = $p.touchRight,
            $touchUp = $p.touchUp,
            $touchDown = $p.touchDown,
            $touchEnd = $p.touchEnd,
            $cantouch = true,
            $clearE = $p.clearE;

        if ($this.length) {
            if (!isPC /*|| isTouch*/ ) {

                function touchStart(e) {
                    // if($clearE){
                    //  e.stopPropagation();
                    //  e.preventDefault();}
                    var touchE = e.originalEvent.targetTouches[0];
                    $startX = touchE /*.targetTouches[0]*/ .pageX;
                    $startY = touchE /*.targetTouches[0]*/ .pageY;
                    $touchStart({
                        self: $this,
                        startX: $startX,
                        startY: $startY
                    });
                    //$cantouch = false;
                }

                function touchMove(e) {
                    
                    if ($clearE) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    var touchE = e.originalEvent.targetTouches[0];
                    $moveX = touchE /*.changedTouches[0]*/ .pageX;
                    $moveY = touchE /*.changedTouches[0]*/ .pageY;
                    if ($touchMove !== null) {
                        $touchMove({
                            self: $this,
                            startX: $startX,
                            startY: $startY,
                            moveX: $moveX,
                            moveY: $moveY
                        });
                        //$cantouch = true;
                    }
                    if ($touchMoveH !== null) {
                        if (Math.abs($moveX - $startX) > Math.abs($moveY - $startY) && Math.abs($moveX - $startX) > 1) {
                            $touchMoveH({
                                self: $this,
                                startX: $startX,
                                startY: $startY,
                                moveX: $moveX,
                                moveY: $moveY
                            });
                            e.stopPropagation();
                            e.preventDefault();
                        //  $cantouch = true;
                        }
                    }
                    if ($touchMoveV !== null) {
                        if (Math.abs($moveX - $startX) < Math.abs($moveY - $startY) && Math.abs($moveY - $startY) > 1) {
                            $touchMoveV({
                                self: $this,
                                startX: $startX,
                                startY: $startY,
                                moveX: $moveX,
                                moveY: $moveY
                            });
                            e.stopPropagation();
                            e.preventDefault();
                        //  $cantouch = true;
                        }
                    }
                    if($touchMoveV === null && $touchMoveH === null && $touchMove === null){
                        //$cantouch = true;
                    }
                    
                }

                function touchEnd(e) {
                    // if($clearE){
                    //  e.stopPropagation();
                    //  e.preventDefault();}
                    var touchE = e.originalEvent.changedTouches[0];
                    $endX = touchE /*.changedTouches[0]*/ .pageX;
                    $endY = touchE /*.changedTouches[0]*/ .pageY;
                    //$this[0].removeEventListener('touchend');
                    //$this[0].removeEventListener('touchmove');
                
                    if ($cantouch) {
                        
                        //$cantouch = false;
                        if ($startX - $endX < -1) {
                            $touchRight({
                                self: $this,
                                startX: $startX,
                                endX: $endX,
                                startY: $startY,
                                endY: $endY
                            });
                        }
                        if ($startX - $endX > 1) {
                            $touchLeft({
                                self: $this,
                                startX: $startX,
                                endX: $endX,
                                startY: $startY,
                                endY: $endY
                            });
                        }
                        if ($startY - $endY > 1) {
                            $touchUp({
                                self: $this,
                                startX: $startX,
                                endX: $endX,
                                startY: $startY,
                                endY: $endY
                            });
                        }
                        if ($startY - $endY < -1) {
                            $touchDown({
                                self: $this,
                                startX: $startX,
                                endX: $endX,
                                startY: $startY,
                                endY: $endY
                            });
                        }

                        $touchEnd({
                            self: $this,
                            startX: $startX,
                            endX: $endX,
                            startY: $startY,
                            endY: $endY
                        });
                    }
                }

                // $this[0].addEventListener('touchstart', touchStart,false);
                // $this[0].addEventListener('touchmove',touchMove,false);
                // $this[0].addEventListener('touchend',touchEnd,false);
                $this.on("touchstart", function (e) {
                    touchStart(e);
                });
                $this.on("touchmove", function (e) {
                    touchMove(e);
                });
                $this.on("touchend", function (e) {
                    touchEnd(e);
                });

            } else {

                $this.on("mousedown", function (e) {

                    $startX = e.pageX;
                    $startY = e.pageY;
                    $touchStart({
                        self: $this,
                        startX: $startX,
                        startY: $startY
                    });
                    $("body,html").bind("mousemove", function (e) {
                        mouseMove(e);
                        return false;
                    });
                    $("body,html").bind("mouseup", function (e) {
                        mouseUp(e);
                        return false;
                    });
                    return false;
                });

                function mouseMove(e) {
                    $moveX = e.pageX;
                    $moveY = e.pageY;

                    // $touchMoveH({self:$this,startX:$startX,startY:$startY,moveX:$moveX,moveY:$moveY});
                    // $touchMoveV({self:$this,startX:$startX,startY:$startY,moveX:$moveX,moveY:$moveY});
                    // $touchMove({self:$this,startX:$startX,startY:$startY,moveX:$moveX,moveY:$moveY});
                    if ($moveX - $startX > 10 || $moveX - $startX < -10) {
                        $this.on("click", function () {
                            return false;
                        });
                    }
                    if ($touchMove !== null) {
                        $touchMove({
                            self: $this,
                            startX: $startX,
                            startY: $startY,
                            moveX: $moveX,
                            moveY: $moveY
                        });
                        e.stopPropagation();
                        e.preventDefault();
                        //$cantouch = true;
                    }
                    if ($touchMoveH !== null) {
                        if (Math.abs($moveX - $startX) > Math.abs($moveY - $startY) && Math.abs($moveX - $startX) > 10) {
                            $touchMoveH({
                                self: $this,
                                startX: $startX,
                                startY: $startY,
                                moveX: $moveX,
                                moveY: $moveY
                            });
                            e.stopPropagation();
                            e.preventDefault();
                            //$cantouch = true;
                        } else {

                        }
                    }
                    if ($touchMoveV !== null) {
                        if (Math.abs($moveX - $startX) < Math.abs($moveY - $startY) && Math.abs($moveY - $startY) > 10) {
                            $touchMoveV({
                                self: $this,
                                startX: $startX,
                                startY: $startY,
                                moveX: $moveX,
                                moveY: $moveY
                            });
                            e.stopPropagation();
                            e.preventDefault();
                            //$cantouch = true;
                        }
                    }
                }

                function mouseUp(e) {
                    $("body,html").off("mousemove");
                    $("body,html").off("mouseup");
                    // $this.off("mouseleave");
                    $endX = e.pageX;
                    $endY = e.pageY;

                    if ($startX - $endX < -1) {
                        $touchRight({
                            self: $this,
                            startX: $startX,
                            endX: $endX,
                            startY: $startY,
                            endY: $endY
                        });
                    }
                    if ($startX - $endX > 1) {
                        $touchLeft({
                            self: $this,
                            startX: $startX,
                            endX: $endX,
                            startY: $startY,
                            endY: $endY
                        });
                    }
                    if ($startY - $endY > 1) {
                        $touchUp({
                            self: $this,
                            startX: $startX,
                            endX: $endX,
                            startY: $startY,
                            endY: $endY
                        });
                    }
                    if ($startY - $endY < -1) {
                        $touchDown({
                            self: $this,
                            startX: $startX,
                            endX: $endX,
                            startY: $startY,
                            endY: $endY
                        });
                    }

                    $touchEnd({
                        self: $this,
                        startX: $startX,
                        endX: $endX,
                        startY: $startY,
                        endY: $endY
                    });
                    setTimeout(function () {
                        $this.off("click");
                    }, 10);


                }
            }
        }

        $this.touchClear = function () {
            if (!isPC /* || isTouch*/ ) {
                $this[0].removeEventListener('touchstart', touchStart, false);
                $this[0].removeEventListener('touchmove', touchMove, false);
                $this[0].removeEventListener('touchend', touchEnd, false);
            } else {
                $this.off("mousedown");
            }
        };

        return $this;
    };

    $.fn.oToggle = function (fn1, fn2) {
        var $this = $(this);
        $this.on("click", function () {
            if ($this.attr("auto") === "0" || $this.attr("auto") === undefined) {
                fn1($this);
                $this.attr("auto", "1");
            } else if ($this.attr("auto") == "1") {
                fn2($this);
                $this.attr("auto", "0");
            }
            return false;
        });
        return $this;

    };

    $.fn.oToggleAll = function (p) {
        defaults = {
            fn1: function () {},
            fn2: function () {},
            target: "",
            door: function () {
                return true;
            }
        };
        $p = $.extend(defaults, p);
        var $this = $(this),
            $target = $p.target,
            $fn1 = $p.fn1,
            $fn2 = $p.fn2,
            $door = $p.door;

        $this.on("click", $target, function () {

            if ($door()) {
                var auto = $(this).attr("auto");
                if (auto === "0" || auto === undefined) {
                    $fn1($(this));
                    $(this).attr("auto", "1");
                } else if (auto === "1") {
                    $fn2($(this));
                    $(this).attr("auto", "0");
                }
            }
        });

    };

    $.fn.oScrollGoto = function ($p) {
        defaults = ({
            spped: 1000,
            count: 0,
            beforefn: null,
            afterfn: null,
            door: null,
            doorclass: null
        });
        $p = $.extend(defaults, $p);

        var $this = $(this),
            $target = $("." + $this.attr("target")),
            $spped = $p.speed,
            $count = $p.count,
            $afterfn = $p.afterfn,
            $beforefn = $p.beforefn,
            $timeout = $p.timeout,
            $door = $("." + $p.door),
            $doorclass = $p.doorclass,
            $targetT;

        $this.on("click", function () {

            $targetT = $target.offset().top + $count;
            if ($beforefn !== null) {
                if ($doorclass !== null) {

                    if ($door.hasClass($doorclass)) {

                        $beforefn();
                        setTimeout(function () {
                            $this.goto();
                        }, $timeout);
                    } else {
                        $beforefn();
                        $this.goto();
                    }
                }
            } else {
                $this.goto();
            }
        });


        $this.goto = function () {
            $("html,body").animate({
                scrollTop: $targetT
            }, $spped);
            setTimeout(function () {
                if ($afterfn !== null) {
                    $afterfn();
                }
            }, $timeout);
        };
        return $this;
    };

    $.fn.oScrollFn = function ($p) {
        defaults = ({
            upFn: function () {},
            downFn: function () {}
        });
        $p = $.extend(defaults, $p);
        var $this = $(this),
            $upfn = $p.upFn,
            $downfn = $p.downFn,
            mousewheel = 'onmousewheel' in doc ? 'mousewheel' : 'DOMMouseScroll';

        $this.scrollfun = function (e) {
            ev = e.originalEvent;
            d = parseInt(ev.wheelDelta || -ev.detail);
            if (d > 0) {
                $upfn();
            } else {
                $downfn();
            }
            e.stopPropagation();
            e.preventDefault();
        };
        $.event.add($this[0], mousewheel, $this.scrollfun);
    };

    $.fn.oScrollBar = function ($p) {
        var ele = $(this),
            backEle = [];
        ele.each(function () {
            var defaults = ({
                step: 50, //鼠标滚轮滚动步长
                surplus: 7, //滚动内容体额外高度
                vShowBar: true, //是否控制滚动条的显示
                vPScroll: true,//内容区域显示内容过短时 滚动时 按正常页面滚动
                topFn:null,
                downFn:null
            });
            $p = $.extend(defaults, $p);

            var $this = $(this);
            $this.obj = $(this);
            $this.parent = $this.obj.parent();
            $this.win = $("<div class='o_scrollWin'>");
            $this.body = $("<div class='o_scrollbody'>");
            $this.barbox = $("<div class='o_barbox'>");
            $this.line = $("<span>");
            $this.step = $p.step;
            $this.bar = $("<div class='o_bar'>");
            $this.winH = null;
            $this.bodyH = null;
            $this.barH = null;
            $this.barboxH = null;
            $this.cha = 0;
            $this.sScale = 1;
            $this.sTop = 0;
            $this.sTop_next = null;
            $this.barT = null;
            $this.topFn=$p.topFn;
            $this.downFn=$p.downFn;

            $this.bar.appendTo($this.barbox);
            $this.line.appendTo($this.barbox);
            $this.barbox.appendTo($this.win);
            $this.obj.appendTo($this.body);
            $this.body.appendTo($this.win);
            $this.win.appendTo($this.parent);

            $this.init = function () {
                $this.sTop = 0;
                $this.bar.css("top", $this.sTop + "px");
                $this.body.css("margin-top", $this.sTop);
                $this.win.css("padding-right", $this.barbox.width() + "px");

                $this.winH = $this.win.height();
                $this.bodyH = $this.body.height();
                $this.barboxH = $this.barbox.height();
                $this.sScale = $this.barboxH / $this.bodyH;
                $this.cha = $this.bodyH - $this.winH;
                $this.barH = $this.barbox.height() / Math.max($this.bodyH / $this.winH, 1);

                $this.bar.css("height", $this.barH + "px");
                if ($this.cha <= 0) {
                    $this.barbox.hide();
                    $this.win.css("padding-right", "0px");
                    $this.off();
                } else {
                    $this.barbox.show();
                    if (isPC) {
                        $this.scrollDown = function () {
                            if ($this.bodyH > $this.winH) {
                                $this.sTop_next = $this.sTop - $this.step;
                                if (-$this.sTop_next + $this.winH > $this.bodyH) {
                                    $this.sTop_next = $this.winH - $this.bodyH;
                                    if($this.downFn){
                                        $this.downFn();
                                    }
                                }
                                $this.sTop = $this.sTop_next;
                                $this.bar.css("top", -$this.sTop_next * $this.sScale + "px");
                                $this.body.css("margin-top", $this.sTop_next);
                            }
                        };

                        $this.scrollUp = function () {
                            if ($this.bodyH > $this.winH) {
                                $this.sTop_next = $this.sTop + $this.step;
                                if ($this.sTop_next > 0) {
                                    $this.sTop_next = 0;
                                    if($this.topFn){
                                        $this.topFn();
                                    }
                                }
                                $this.sTop = $this.sTop_next;
                                $this.bar.css("top", -$this.sTop_next * $this.sScale + "px");
                                $this.body.css("margin-top", $this.sTop_next);
                            }
                        };

                        $this.win.oScrollFn({
                            upFn: function () {
                                $this.scrollUp();
                            },
                            downFn: function () {
                                $this.scrollDown();
                            }
                        });

                    } else { //移动设备
                        $this.body.oTouch({
                            touchMove: function (p) {
                                $this.sTop_next = $this.sTop + (p.moveY - p.startY);
                                if ($this.sTop_next > 0) {
                                    $this.sTop_next = 0;
                                    if($this.topFn!==null){
                                        $this.topFn();
                                    }
                                } else if (-$this.sTop_next + $this.winH > $this.bodyH) {
                                    $this.sTop_next = $this.winH - $this.bodyH;
                                    if($this.downFn!==null){
                                        $this.downFn();
                                    }
                                }
                                $this.sTop = $this.sTop_next;
                                $this.bar.css("top", -$this.sTop_next * $this.sScale + "px");
                                $this.body.css("margin-top", $this.sTop_next);
                            },
                            clearE: true
                        });
                        //$this.parent.css("overflow","scroll");
                    }
                }
            };


            $this.bar.oTouch({
                touchStart: function () {},
                touchMove: function (s) {
                    moveH = s.moveY - s.startY;
                    $this.sTop_next = $this.sTop - (moveH / $this.sScale);
                    if ($this.sTop_next > 0) {
                        $this.sTop_next = 0;
                    } else if (-$this.sTop_next + $this.winH > $this.bodyH) {
                        $this.sTop_next = $this.winH - $this.bodyH;
                    }
                    $this.body.css("margin-top", $this.sTop_next);
                    $this.bar.css("top", -$this.sTop_next * $this.sScale + "px");
                },
                touchEnd: function () {
                    $this.sTop = $this.sTop_next;
                },
                clearE: true
            });

            $this.lose=function(){
                $this.obj.appendTo($this.parent);
                $this.win.remove();
            };

            backEle.push($this);
        });

        var $backEle = $(backEle);
        $backEle.init = function (a) {
            if (a) {
                backEle[a].init();
            } else {
                $backEle.each(function (i) {
                    backEle[i].init();
                });
            }
        };
        $backEle.lose = function (a) {
            if (a) {
                backEle[a].lose();
            } else {
                $backEle.each(function (i) {
                    backEle[i].lose();
                });
            }
        };

        return $backEle;
    };

    $.fn.oHoverMove = function ($p) {
        if (isPC) {
            defaults = {
                clearE: false,
                "mouseStart": function () {},
                "mouseMove": function () {},
                "mouseLeave": function () {},
                "mouseStopFn": null,
                "stopTime": 1000
            };
            $p = $.extend(defaults, $p);
            var $this = $(this),
                $startX,
                $startY,
                $moveX,
                $moveY,
                $leaveX,
                $leaveY,
                $mouseStar = $p.mouseStart,
                $mouseMove = $p.mouseMove,
                $mouseLeave = $p.mouseLeave,
                $mouseStopFn = $p.mouseStopFn,
                $stopTime = $p.stopTime,
                $t,
                $beforeX,
                $beforeY;

            $this.on("mouseenter", function (e) {
                $startX = e.pageX;
                $startY = e.pageY;
                if ($mouseStopFn) {
                    $t = setInterval(function () {
                        foo();
                    }, $stopTime);
                }
                $mouseStar({
                    self: $this,
                    startX: $startX,
                    startY: $startY
                });
                $this.bind("mousemove", function (e) {
                    mouseMove(e);
                    return false;
                });
                $this.bind("mouseleave", function (e) {
                    mouseLeave(e);
                    $this.off("mousemove");
                    $this.off("mouseleave");
                });
            });

            function mouseMove(e) {
                $moveX = e.pageX;
                $moveY = e.pageY;
                if ($mouseStopFn) {
                    $beforeX = $moveX;
                    $beforeY = $moveY;
                }

                $mouseMove({
                    self: $this,
                    startX: $startX,
                    startY: $startY,
                    moveX: $moveX,
                    moveY: $moveY
                });
            }

            function mouseLeave(e) {
                $leaveX = e.pageX;
                $leaveY = e.pageY;
                if ($mouseStopFn) {
                    clearInterval($t);
                }
                $mouseLeave({
                    self: $this,
                    startX: $startX,
                    startY: $startY,
                    leaveX: $leaveX,
                    leaveY: $leaveY
                });
            }

            function foo() {
                if ($beforeX === $moveX && $beforeY === $moveY) {
                    $mouseStopFn({
                        self: $this,
                        startX: $startX,
                        startY: $startY,
                        moveX: $moveX,
                        moveY: $moveY
                    });
                } else {
                    return false;
                }
            }
            return $this;
        }
    };

    $.fn.oBgCover = function () {
        var ele = $(this),
            backEle = [];
        ele.each(function () {
            var $this = $(this);
            $this.obj = $(this);
            $this.parent = $this.obj.parent();
            $this.parent.css({
                "position": "relative",
                "overflow": "hidden"
            });
            $this.pw = 0;
            $this.ph = 0;
            $this.w1 = 0;
            $this.h1 = 0;
            $this.loaded=false;
            $this.init = function () {
                $this.obj.css({
                    "width": "auto",
                    "height": "auto",
                    "position":"absolute"
                });
                $this.pw = $this.parent.width();
                $this.ph = $this.parent.height();
                $this.w1 = $this.obj.width();
                $this.h1 = $this.obj.height();
                if (!$this.loaded) {
                    $this.loaded=true;
                    $this.obj.load(function () {
                        $this.pw = $this.parent.width();
                        $this.ph = $this.parent.height();
                        $this.w1 = $this.obj.width();
                        $this.h1 = $this.obj.height();

                        if ($this.pw / $this.w1 > $this.ph / $this.h1) {
                            $this.css({
                                "width": $this.pw + "px",
                                "height": "auto",
                                "position": "absolute"
                            });
                            $this.css({
                                "margin-left": -($this.obj.width()) / 2 + "px",
                                left: "50%",
                                top: "50%",
                                "margin-top": -($this.obj.height()) / 2 + "px"
                            });
                        } else {
                            $this.css({
                                "height": $this.ph + "px",
                                "width": "auto",
                                "position": "absolute"
                            });
                            $this.css({
                                "margin-left": -($this.obj.width()) / 2 + "px",
                                left: "50%",
                                top: "50%",
                                "margin-top": -($this.obj.height()) / 2 + "px"
                            });
                        }
                        return false;
                    });
                } else {
                    if ($this.pw / $this.w1 > $this.ph / $this.h1) {
                        $this.css({
                            "width": $this.pw + "px",
                            "height": "auto",
                            "position": "absolute"
                        });
                        $this.css({
                            "margin-left": -($this.obj.width()) / 2 + "px",
                            left: "50%",
                            top: "50%",
                            "margin-top": -($this.obj.height()) / 2 + "px"
                        });
                    } else {
                        $this.css({
                            "height": $this.ph + "px",
                            "width": "auto",
                            "position": "absolute"
                        });
                        $this.css({
                            "margin-left": -($this.obj.width()) / 2 + "px",
                            left: "50%",
                            top: "50%",
                            "margin-top": -($this.obj.height()) / 2 + "px"
                        });
                    }
                }
            };
            if (isPC) {
                $(window).resize(function () {
                    $this.init();
                });
            }

            backEle.push($this);

        });
        var $backEle = $(backEle);
        $backEle.init = function (a) {
            if (a) {
                backEle[a].init();
            } else {
                $backEle.each(function (i) {
                    backEle[i].init();
                });
            }
        };

        return $backEle;
    };

    $.fn.oBoxCenter = function () {
        var ele = $(this),
            backEle = [];
        ele.each(function () {
            var $this = $(this);
            $this.obj = $(this);
            $this.parent = $this.obj.parent();
            $this.w = 0;
            $this.h = 0;
            $this.init = function () {
                $this.w = $this.obj.width();
                $this.h = $this.obj.height();
                $this.parent.css("position", "relative");
                $this.obj.css({
                    "position": "absolute",
                    "top": "50%",
                    "left": "50%",
                    "margin-top": -$this.h / 2 + "px",
                    "margin-left": -$this.w / 2 + "px"
                });
            };

            if (isPC) {
                $(window).resize(function () {
                    $this.init();
                });
            }
            backEle.push($this);
        });

        var $backEle = $(backEle);
        $backEle.init = function (a) {
            if (a) {
                backEle[a].init();
            } else {
                $backEle.each(function (i) {
                    backEle[i].init();
                });
            }
        };

        return $backEle;
    };

    $.fn.oScale = function ($p) {
        var $ele = $(this),
            backEle = [],
            p = $p;
        $ele.each(function () {
            defaults = ({
                w: 1,
                h: 1,
                base: "width"
            });
            var $p = $.extend(defaults, p);

            var $this = $(this);
            $this.obj = $(this);
            $this.w = $p.w;
            $this.h = $p.h;
            $this.base = $p.base;
            if ($this.obj.attr("w")) {
                $this.w = parseInt($this.obj.attr("w"));
            }
            if ($this.obj.attr("h")) {
                $this.h = parseInt($this.attr("h"));
            }
            if ($this.obj.attr("base")) {
                $this.base = $this.attr("base");
            }

            $this.init = function () {
                if ($this.base == "width") {
                    if ($this.obj.width() !== 0) {
                        $this.width = $this.obj.width();
                        $this.height = Math.round(($this.width / $this.w) * $this.h);
                        $this.css("height", $this.height + "px");
                    } else {
                        return false;
                    }
                } else if ($this.base === "height") {
                    if ($this.obj.height() !== 0) {
                        $this.height = $this.obj.height();
                        $this.width = Math.round(($this.height / $this.h) * $this.w);
                        $this.css("width", $this.width + "px");
                    } else {
                        return false;
                    }
                }
            };

            if (isPC) {
                $(window).resize(function () {
                    $this.init();
                });
            }
            backEle.push($this);
        });

        var $backEle = $(backEle);
        $backEle.init = function (a) {
            if (a) {
                backEle[a].init();
            } else {
                $backEle.each(function (i) {
                    backEle[i].init();
                });
            }

        };
        return $backEle;
    };

    $.fn.oPopupFn=function(){
    var $this={};
        $this.target=null;
        $this.zz=$("<div class='o_shade'></div>");
        $this.closeFn=null;
        $this.top=0;
        $this.absolute=false;
        $this.closebtn=null;
    $this.open=function(p){
        $this.target=null;
        $this.closeFn=null;
        $this.absolute=false;
        $this.absolute=null;
        $this.closebtn=null;
        if(p.target){
            $this.target=$(p.target);
            $this.closebtn=$this.target.find(".js_popupClose");

            if($this.closebtn){
                $this.closebtn.on("click",function(){
                    $this.close();
                });
            }
            if(p.closeFn){
                $this.closeFn=p.closeFn;
            }
            if(p.absolute){
                $this.absolute=p.absolute;
            }

            $this.zz.appendTo($(".o_body")).addClass("show");
            $this.target.show().addClass("show");   
            $this.init();
        }
    };

    

    $this.close=function(){
        $this.target.addClass("hide");
            $this.zz.removeClass("show");
            setTimeout(function(){
                $this.zz.detach();
                $this.target.removeClass("hide").removeClass("show").hide();
                if($this.closeFn!==null){
                    $this.closeFn($this.target);
                }
                    
            },300);
    };

    $this.init=function(){
        var wH=$(window).height(),
            dH=$(document).height(),
            scrollH=$(window).scrollTop(),
            objH=$this.target.height();
        if(!$this.absolute){//不固定
            if(objH<=wH){//小于
                $this.top=(wH-objH)/2;
                $this.target.css('top',$this.top).removeClass("absolute");
            }else{//大于
                if(scrollH+objH+30>dH){
                    scrollH=dH-(objH+60);
                    $("html,body").animate({scrollTop:scrollH},200);
                    $this.top=scrollH+30;
                    $this.target.css('top',$this.top).addClass("absolute");
                }else{
                    $this.top=scrollH+30;
                    $this.target.css('top',$this.top).addClass("absolute");
                }
            }
        }else{//固定
            if(objH<=wH){
                $this.top=scrollH+(wH-objH)/2;
                $this.target.css('top',$this.top);
            }else{
                if(scrollH+objH+30>dH){
                    scrollH=dH-(objH+60);
                    $("html,body").animate({scrollTop:scrollH},200);
                    $this.top=scrollH+30;
                    $this.target.css('top',$this.top).addClass("absolute");
                }else{
                    $this.top=scrollH+30;
                    $this.target.css('top',$this.top);
                }
            }
        }
    };
    
    return $this;
};

$.fn.oAlert=function(p){
        defaults={"info":"没有定义信息"};
        $p=$.extend(defaults,p);
        var $body=$(".o_body"),
            $this={};

            $this.openbtn=$("<span>");
            $this.openbtn.attr("oData-popup",".js_alertbox");
            $this.autoInfo=$p.info;
            $this.newClass="";

            $this.box=$("<div class='o_popup o_alert js_alertbox'></div>");
            $this.closeBtn=$("<span class='o_popupclose js_popupClose'><span>");
            $this.contbox=$("<div class='cont'>");
            $this.tool=$("<div class='tool'></div>");
            $this.confirmBtn=$("<div class='o_bgbtn1 btn o_btn_df-sm js_popupClose'><span>确定</span></div>");

            $this.closeBtn.appendTo($this.box);
            $this.contbox.appendTo($this.box);
            $this.confirmBtn.appendTo($this.tool);
            $this.tool.appendTo($this.box);
            $body.after($this.box);
            $body.append($this.openbtn);

            $this.openbtn.oPopup();
            $this.open=function(p){

                $this.box.removeClass($this.newClass);
                p.info?$this.contbox.html(p.info):$this.contbox.html($this.autoInfo);
                if(p.addClass){
                        $this.newClass=p.addClass;
                        $this.box.addClass($this.newClass);
                    }else{
                        $this.newClass="";
                    }
                
                $this.openbtn.click();
            };

            return $this;
    };

    $.fn.oConfirm=function(p){
        defaults={"info":"没有定义信息"};
        $p=$.extend(defaults,p);
        var $body=$(".o_body"),
            $this={};

            $this.openbtn=$("<span>");
            $this.openbtn.attr("oData-popup",".js_alertbox");
            $this.autoInfo=$p.info;
            $this.callbackFn=null;
            $this.targetEle=null;
            $this.newClass="";

            $this.box=$("<div class='o_popup o_alert js_alertbox'></div>");
            $this.closeBtn=$("<span class='o_popupclose js_popupClose'><span>");
            $this.contbox=$("<div class='cont'>");
            $this.tool=$("<div class='tool'></div>");
            $this.confirmBtn=$("<div class='o_bgbtn1 btn o_btn_df-sm js_confirm'><span>确定</span></div>");
            $this.cancelBtn=$("<div class='o_linebtn1 btn o_btn_df-sm js_popupClose'><span>取消</span></div>");

            $this.closeBtn.appendTo($this.box);
            $this.contbox.appendTo($this.box);
            $this.confirmBtn.appendTo($this.tool);
            $this.cancelBtn.appendTo($this.tool);
            $this.tool.appendTo($this.box);
            $body.after($this.box);
            $body.append($this.openbtn);

            $this.openbtn.oPopup({
                confirmFn:function(){
                    $this.callbackFn($this.targetEle);
                }
            });
            $this.open=function(p){
                $this.callbackFn=null;
                $this.box.removeClass($this.newClass);
                if(p){
                    p.info?$this.contbox.html(p.info):$this.contbox.html($this.autoInfo);
                    p.ele?$this.targetEle=p.ele:$this.targetEle=null;
                    p.callbackFn?$this.callbackFn=p.callbackFn:$this.callbackFn=function(){};
                    if(p.addClass){
                        $this.newClass=p.addClass;
                        $this.box.addClass($this.newClass);
                    }else{
                        $this.newClass="";
                    }
            
                }else{
                    $this.contbox.html($this.autoInfo);
                }
                
                $this.openbtn.click();
            };

            return $this;
    };

    

})(window, document, jQuery);

$().ready(function () {

    $(".o_autoH").each(function () {
        $(this).oAutoH().init();
    });
    $(".o_main").oAutoH({
        minH: true
    }).init();
    // $(".o_autoH_inner").each(function(){
    //  $(this).oAutoH({
    //      "inner":true //内部元素 不以window为基础
    //  }).init();
    // });

    $(".o_autoW").each(function () {
        $(this).oAutoW().init();
    });

    $(".o_input").each(function () {
        $(this).oInputclear();
    });

    $(".o_textarea").each(function () {
        $(this).oTextareaclear();
    });

    if (isIe) {
        $(".o_noselect").each(function () {
            $(this).oNoSelect();
        });
    }

    $(".o_g").oClear();
    $(".o_main").oClear();
    $(".o_autoH").oClear();

});
