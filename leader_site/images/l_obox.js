!function (win, doc, $) {
    function ie11() {
        return !(!Object.hasOwnProperty.call(win, "ActiveXObject") || win.ActiveXObject)
    }

    function isFoxFn() {
        return navigator.userAgent.indexOf("Firefox") >= 0
    }

    function canTouch() {
        var t = {};
        return t.isSupportTouch = "ontouchend" in doc, t.isEvent = t.isSupportTouch ? "touchstart" : "click", "touchstart" == t.isEvent
    }

    function isUcFn() {
        var t = navigator.userAgent;
        return navigator.userAgent.indexOf("UCBrowser") > -1 || t.indexOf("Android") > -1 || t.indexOf("Linux") > -1
    }

    function isPcFn() {
        for (var t = navigator.userAgent, n = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), o = !0, s = 0; s < n.length; s++)if (t.indexOf(n[s]) > 0) {
            o = !1;
            break
        }
        return o
    }

    isIe = navigator.userAgent.indexOf("MSIE") >= 0 && navigator.userAgent.indexOf("Opera") < 0, isIe11 = ie11(), isIe8 = isIe && navigator.userAgent.indexOf("MSIE 8.0") > 0 && !isIe11, isIe9 = isIe && navigator.userAgent.indexOf("MSIE 9.0") > 0 && !isIe11, isPC = isPcFn(), isUC = isUcFn(), isFirefox = isFoxFn(), isTouch = canTouch(), $.fn.oClear = function () {
        $(this).contents().filter(function () {
            3 === $(this)[0].nodeType && $(this).remove()
        })
    }, $.fn.oSelect = function (t) {
        var n, o = {
            go: !0, showLenght: 5, cont: $(this).parent(), openfn: function () {
            }, closefn: function () {
            }
        }, s = $.extend(o, t), i = $(this), e = i.attr("autotext"), a = s.cont, r = $("<div>").addClass("o_Dropdown"), l = $("<i>").addClass("i_down"), c = $("<span>").addClass("name").html(e), h = $("<div>").addClass("list"), p = $("<ul>"), d = i.find("option"), u = i.find("optgroup"), f = $("<li>"), m = $("<h2>"), g = $("<span>"), x = s.showLenght, b = s.openfn, v = s.closefn;
        s.go;
        return r.css("cursor", "pointer"), a.css({position: "relative", "z-index": "0"}), d.each(function (t) {
            if (t > 0 && $(this).attr("selected")) {
                var n = $(this).html();
                return c.html(n), !1
            }
        }), p.appendTo(h), r.append(l).append(c).append(h), i.before(r).css("display", "none"), i.appendTo(r), i.bar = p.oScrollBar(), r.addClass("lose"), i.init = function () {
            i.lose(), p.find("li").last().css("border", "none"), p.find("li").on("click", function (t) {
                $(this).addClass("cur").siblings().removeClass("cur"), $i = p.find("li").index(this), d = i.find("option"), d.attr("selected", !1).eq($i + 1).attr("selected", !0), $val = $(this).find("span").html(), h.css("display", "none"), a.css({"z-index": "0","height": "auto"}).removeClass("o_DropdownBox"), r.css({"background": "#fff","border-color": "#ccc" }),c.html($val), i.change(), t.stopPropagation()
            }), isPC || r.on("change", "select", function (t) {
                var n = $(this).find("option:selected").html();
                c.html(n)
            }), i.resetting(), r.removeClass("lose")
        }, i.lose = function () {
            r.addClass("lose"), r.attr("style", ""), d = i.find("option"), u = i.find("optgroup"), p.html(""), c.html(e), u.length > 0 ? u.each(function () {
                var t = $(this).attr("label"), o = m.clone();
                o.html(t), p.append(o), $(this).find("option").each(function () {
                    var t = $(this).html(), o = f.clone(), s = g.clone();
                    $(this).attr("selected") && (t = $(this).html(), c.html(t), n = d.index(this), o.addClass("cur")), s.html(t), o.append(s), p.append(o)
                })
            }) : d.each(function (t) {
                if (t > 0) {
                    var o = $(this).html(), s = f.clone(), i = g.clone();
                    $(this).attr("selected") && (o = $(this).html(), c.html(o), n = d.index(this), s.addClass("cur")), i.html(o), s.append(i), p.append(s)
                }
            }), c.off(), r.css({"cursor": "pointer"}), i.css({display: "none"})
        }, i.resetting = function () {
            isPC ? (c.on("click", function () {
                if (('' + h.attr('style')).indexOf('height')<0) {
                    h.css({"display": "inline-block", "width": r.width() - 30}), a.css({
                        "z-index": "1",
                        "height": p.height() + 80,
                        "max-height": "280px"
                    }).addClass("o_DropdownBox"), r.css({
                        "background": "#e60012",
                        "border-color": "#e60012"
                    }), d.length <= x ? h.css("height", p.height()) : h.css("height", "200px"), b(r), i.bar.init()
                } else {
                    h.css({"display": "inline-block", "width": r.width() - 30}), a.css({
                        "z-index": "1",
                        "height": p.height() + 80,
                        "max-height": "280px"
                    }).addClass("o_DropdownBox"), r.css({
                        "background": "#e60012",
                        "border-color": "#e60012"
                    }), d.length <= x ? h.css("height", p.height()) : h.css("height", "200px"), b(r), i.bar[0].resetScroll()
                }
            }), r.hover(function () {
            }, function () {
                h.css("display", "none"), a.css({
                    "z-index": "0",
                    "height": "auto"
                }).removeClass("o_DropdownBox"), r.css({"background": "#fff", "border-color": "#ccc"}), v(r)
            }), i.css({display: "none"})) : (c.off(), i.css({display: "block"}))
        }, i
    }, $.fn.oMenu = function (t) {
        var n, o, s, i, e, a = {
            menu: "",
            mainbox: ".o_main",
            linkage: !0,
            btnbox: $(this),
            zztop: 0,
            openfn: null,
            closefn: null,
            menuwidth: null,
            zzclass: "o_m_zz"
        }, r = $.extend(a, t), l = $(this), c = $(r.mainbox), h = $("<div>").addClass(r.zzclass), p = r.linkage, d = $(r.btnbox), u = $(r.menu), f = r.menuwidth ? r.menuwidth : u.width();
        return l.on("click", function () {
            h.attr("style", "margin-top:" + r.zztop + "px"), o = Math.abs(parseFloat(c.css("left"))), s = Math.abs(parseFloat(c.css("right"))), i = parseFloat(u.css("left")), e = parseFloat(u.css("right")), p ? o > 0 || s > 0 ? ("left" == n ? (c.oCss3({
                transform: "translate3d(" + Math.abs(i) + "px,0px,0px)",
                "transition-duration": "0s"
            }, !1), c.css({left: "0px"}), setTimeout(function () {
                c.oCss3({transform: "translate3d(0px,0px,0px)", "transition-duration": "0.3s"}, !1)
            }, 10), l.removezz(), r.closefn && r.closefn(l)) : "right" == n && (c.oCss3({
                transform: "translate3d(" + -Math.abs(e) + "px,0px,0px)",
                "transition-duration": "0s"
            }, !1), c.css({right: "0px"}), setTimeout(function () {
                c.oCss3({transform: "translate3d(0px,0px,0px)", "transition-duration": "0.3s"}, !1)
            }, 10), l.removezz(), r.closefn && r.closefn(l)), l.removeClass("cur")) : (0 > e ? (c.oCss3({
                transform: "translate3d(" + -Math.abs(e) + "px,0px,0px)",
                "transition-duration": "0.3s"
            }, !1), u.css({height: $(window).height()}), setTimeout(function () {
                c.oCss3({
                    transform: "translate3d(0px,0px,0px)",
                    "transition-duration": "0.0s"
                }, !1), c.css({right: Math.abs(e) + "px", position: "relative"}), n = "right"
            }, 500), c.append(h), r.openfn && r.openfn(l)) : 0 > i && (c.oCss3({
                transform: "translate3d(" + Math.abs(i) + "px,0px,0px)",
                "transition-duration": "0.3s"
            }, !1), u.css({height: $(window).height()}), setTimeout(function () {
                c.oCss3({
                    transform: "translate3d(0px,0px,0px)",
                    "transition-duration": "0.0s"
                }, !1), c.css({left: Math.abs(i) + "px", position: "relative"}), n = "left"
            }, 500), c.append(h), r.openfn && r.openfn(l)), l.addClass("cur")) : 0 === i || 0 === e ? ("left" == n ? (u.oCss3({
                transform: "translate3d(100%,0px,0px)",
                "transition-duration": "0s"
            }, !1), u.css({left: "-" + f + "px"}), setTimeout(function () {
                u.oCss3({transform: "translate3d(0px,0px,0px)", "transition-duration": "0.3s"}, !1)
            }, 10), d && d.stop().animate({marginLeft: 0}, 300), l.removezz(), r.closefn && r.closefn(l)) : "right" == n && (u.oCss3({
                transform: "translate3d(-100%,0px,0px)",
                "transition-duration": "0s"
            }, !1), u.css({right: "-" + f + "px"}), setTimeout(function () {
                u.oCss3({transform: "translate3d(0px,0px,0px)", "transition-duration": "0.3s"}, !1)
            }, 10), d && d.stop().animate({marginRight: 0}, 300), l.removezz(), r.closefn && r.closefn(l)), l.removeClass("cur")) : (0 > e ? (u.oCss3({
                transform: "translate3d(-100%,0px,0px)",
                "transition-duration": "0.3s",
                height: $(window).height() + "px"
            }, !1), setTimeout(function () {
                u.oCss3({
                    transform: "translate3d(0px,0px,0px)",
                    "transition-duration": "0s",
                    height: $(window).height() + "px"
                }, !1), u.css({right: "0px"}), n = "right"
            }, 300), d && d.stop().animate({marginRight: f}, 300), c.append(h), r.openfn && r.openfn(l)) : 0 > i && (u.oCss3({
                transform: "translate3d(100%,0px,0px)",
                "transition-duration": "0.3s",
                height: $(window).height() + "px"
            }, !1), setTimeout(function () {
                u.oCss3({
                    transform: "translate3d(0px,0px,0px)",
                    "transition-duration": "0s",
                    height: $(window).height() + "px"
                }, !1), u.css({left: "0px"}), n = "left"
            }, 300), d && d.stop().animate({marginLeft: f}, 300), c.append(h), r.openfn && r.openfn(l)), l.addClass("cur"))
        }), l.init = function () {
            p ? c.attr("style", "") : (d && d.attr("style", ""), u.attr("style", "")), l.removeClass("cur").removezz()
        }, $(window).resize(function () {
            l.init()
        }), l.removezz = function () {
            h.oCss3({opacity: 0, "transition-duration": "0.5s"}, !1), setTimeout(function () {
                h.detach()
            }, 500)
        }, h.click(function () {
            l.click()
        }), l.allback = function () {
            p ? (c.animate({right: "0px"}, 300), h.detach(), l.removeClass("cur")) : ("left" == n ? (u.stop().animate({left: "-" + f}, 300), d.stop().animate({marginLeft: "0px"}, 300), h.detach()) : "right" == n && (u.stop().animate({right: "-" + f}, 300), d.stop().animate({marginRight: "0px"}, 300), h.detach()), l.removeClass("cur"))
        }, l.menuback = function () {
            p ? (c.animate({right: "0px"}, 300), h.remove(), l.removeClass("cur")) : ("left" == n ? (u.stop().animate({opacity: "0.5"}, 300, function () {
                u.css({left: "-" + f, opacity: "1"})
            }), h.detach()) : "right" == n && (u.stop().animate({opacity: "0.5"}, 300, function () {
                u.css({right: "-" + f, opacity: "1"})
            }), h.detach()), l.removeClass("cur"))
        }, l
    }, $.fn.oAutoH = function (t) {
        var n, o = {
            targetObj: window, inner: !1, callback: function () {
            }, resize: !0, minH: !1
        }, s = $.extend(o, t), i = $(this), e = $(s.targetObj), a = i.parent(), r = i.siblings(".o_fixH"), l = r, c = i.find(".o_H100");
        return s.inner && (e = a), i.init = function () {
            a.oClear(), n = e.height(), l.length > 0 && l.each(function () {
                "none" !== $(this).css("display") && (n -= $(this).height())
            }), s.minH ? i.css({"min-height": n + "px"}) : i.css({
                "min-height": n + "px",
                height: n + "px"
            }), c.each(function () {
                $(this).css("height", n + "px")
            }), s.callback()
        }, $(window).resize(function () {
            s.resize && i.init()
        }), i
    }, $.fn.oAutoW = function (t) {
        var n, o = {
            obj1: $(this).prev(), obj2: $(this).next(), targetObj: $(this).parent(), callback: function () {
            }, resize: !0
        }, s = $.extend(o, t), i = $(this), e = (s.obj1 ? $(s.obj1) : 0, s.obj2 ? $(s.obj2) : 0, $(s.targetObj)), a = i.parent(), r = i.siblings(".o_fixW"), l = r;
        return i.init = function () {
            a.oClear(), n = Math.floor(e.width() - 1), l.each(function () {
                "none" !== $(this).css("display") && (n -= $(this).width()), n = Math.floor(n), i.css({width: n + "px"})
            }), s.callback()
        }, $(window).resize(function () {
            s.resize && i.init()
        }), i
    }, $.fn.oPicture = function (t) {
        var n, o = {
            sm: 544,
            md: 700,
            lg: 992,
            xl: 1200
        }, s = $.extend(o, t), i = $(this), e = s.sm, a = s.md, r = s.lg, l = s.xl, c = i.attr("xs"), h = i.attr("sm"), p = i.attr("md"), d = i.attr("lg"), u = i.attr("xl"), f = i.attr("df"), m = i.attr("ie8");
        return i.init = function () {
            return n = $(window).width(), isIe8 && void 0 !== m ? (i.attr("src", m), !1) : void(e > n ? void 0 === c ? i.attr("src", f) : i.attr("src", c) : n >= e && a > n ? void 0 === h ? i.attr("src", f) : i.attr("src", h) : n >= a && r > n ? void 0 === p ? i.attr("src", f) : i.attr("src", p) : n >= r && l > n ? void 0 === d ? i.attr("src", f) : i.attr("src", d) : n >= l && (void 0 === u ? i.attr("src", f) : i.attr("src", u)))
        }, $(window).resize(function () {
            i.init()
        }), i
    }, $.fn.oInputclear = function () {
        var t = $(this).attr("autotext");
        $(this).val(t), $(this).focus(function () {
            $(this).val() == t && $(this).attr("value", "")
        }), $(this).blur(function () {
            "" === $(this).val() && $(this).val(t)
        })
    }, $.fn.oTextareaclear = function () {
        var t = $(this).attr("autotext");
        $(this).html(t), $(this).focus(function () {
            $(this).html() === t && $(this).html("")
        }), $(this).blur(function () {
            "" === $(this).html() && $(this).html(t)
        })
    }, $.fn.oSlider = function (t) {
        function n(t) {
            return Math.floor(t) === t
        }

        defaults = {
            showBoxClass: "showbox",
            autoWidth: !1,
            loop: !1,
            directionVertical: !1,
            scrollbar: !1,
            windowResize: !0,
            pager: null,
            touch: !0,
            speed: !1,
            pagerShow: !1,
            touchClear: !1,
            nextFn: null,
            prevFn: null,
            moveOne: !1,
            moveTouch: !0,
            playFn: null,
            btnHobj: null
        }, $p = $.extend(defaults, t), $(this).oCss3({transform: "translateZ(0)"}), $(this).oClear(), $(this).find("ul").oClear(), $(this).find("." + $p.showBoxClass).oClear();
        var o, s, i, e, a, r, l, c, h, p = $(this), d = p.find("." + $p.showBoxClass), u = $(this).height(), f = d.find("ul"), m = f.find("li"), g = m.length, x = $p.moveOne, b = $p.moveTouch, v = null, w = $("<div>"), C = $p.directionVertical, T = "left", M = $p.loop, y = $p.scrollbar, Y = $p.autoWidth, X = p.find($p.pager), _ = $p.pagerShow, j = !0, z = $("<li></li>"), I = $p.windowResize, k = $p.touch, F = $p.speed, H = null, B = !0, A = $p.playFn, E = $p.nextFn, S = $p.prevFn, P = !1, O = 1, q = !1, D = !1, L = $p.btnHobj;
        if (C && p.css("height", u + "px"), m.css("display", "inline-block"), C ? (T = "top", f.css({
                "font-size": "0",
                width: "100%",
                display: "block"
            })) : f.css({
                "font-size": "0",
                "white-space": "nowrap",
                width: "100%",
                display: "block"
            }), d.css({
                overflow: "hidden",
                position: "relative"
            }), p.showAmt = 0, p.i = 0, p.prevBtn = $("<span class='btn_prev'></span>"), p.nextBtn = $("<span class='btn_next'></span>"), p.clickI = null, f.appendTo(w), w.appendTo(d), m.on("click", function () {
                p.clickI = m.index(this)
            }), M) {
            var U = f.clone(), R = U.find("li"), W = R.clone();
            R.on("click", function () {
                p.clickI = R.index(this)
            }), W.on("click", function () {
                p.clickI = W.index(this)
            })
        }
        if (p.prepend(p.prevBtn), p.prepend(p.nextBtn), p.oNoSelect(), p.init = function () {
                if (p.width() > 0) {
                    C && (u = d.height(), p.css("height", u + "px")), w.attr("style", ""), f.css("margin-" + T, "0"), p.prevBtn.css({
                        display: "inline-block",
                        position: "absolute",
                        "z-index": 1
                    }), p.nextBtn.css({
                        display: "inline-block",
                        position: "absolute",
                        "z-index": 1
                    }), a = p.width() - p.prevBtn.width() - p.nextBtn.width(), r = C ? p.height() - p.prevBtn.height() - p.nextBtn.height() : d.height();
                    for (var t = 0; t < m.length; t++)if (!m.eq(t).hasClass("cur")) {
                        o = m.eq(t);
                        break
                    }
                    if (C ? p.showAmt = Math.round(d.height() / (o.height() + parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom"))) - .4) : p.showAmt = Math.round(d.width() / (o.width() + parseInt(o.css("padding-left")) + parseInt(o.css("padding-right"))) - .4), $showPage = Math.ceil(g / p.showAmt), p.i = 0, w.css({
                            position: "relative",
                            left: "0px",
                            top: "0px"
                        }), n(F) && g > p.showAmt && isPC && p.hover(function () {
                            p.stop()
                        }, function () {
                            p.play(F)
                        }), g <= p.showAmt)return a = p.width(), d.css("width", ""), p.prevBtn.hide(), p.nextBtn.hide(), clearInterval(l), k && null !== H && (H.touchClear(), k = !1, H = null), X.empty(), !1;
                    if (k = !0, j = x || b ? !1 : g % p.showAmt !== 0, m.attr("style", ""), Y && (C ? (d.css({height: r + "px"}), a = d.width(), f.find("li").css("height", Math.ceil(r / p.showAmt) + "px"), p.showHeightFn()) : (d.css({width: a + "px"}), p.prevBtn.css({
                            position: "relative",
                            "float": "left"
                        }), p.nextBtn.css({
                            position: "relative",
                            "float": "right"
                        }), r = d.height(), p.showWidthFn())), C ? null === L ? (p.prevBtn.css({width: d.width() + "px"}), p.nextBtn.css({width: d.width() + "px"})) : (p.prevBtn.css({width: p.find(L).eq(0).width() + "px"}), p.nextBtn.css({width: p.find(L).eq(0).width() + "px"})) : null === L ? (p.prevBtn.css({
                            height: r + "px",
                            "line-height": r + "px"
                        }), p.nextBtn.css({
                            height: r + "px",
                            "line-height": r + "px"
                        })) : (p.prevBtn.css({
                            height: p.find(L).eq(0).height() + "px",
                            "line-height": p.find(L).eq(0).height() + "px"
                        }), p.nextBtn.css({
                            height: p.find(L).eq(0).height() + "px",
                            "line-height": p.find(L).eq(0).height() + "px"
                        })), c = b || x ? C ? Math.ceil(o.height() + parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom"))) : Math.ceil(o.width() + parseInt(o.css("padding-left")) + parseInt(o.css("padding-right"))) : C ? d.height() : d.width(), x || b ? p.showAmt > 1 && !M ? (e = Math.ceil(g - p.showAmt + 1), i = g) : (e = g, i = g) : (e = Math.ceil(g / p.showAmt), i = e), x && (v = o.width()), M && !j ? (f.find("li").length == g && (p.removeLi(), p.addLi()), h = C ? -g * (o.height() + parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom"))) + "px" : -g * (o.width() + parseInt(o.css("padding-left")) + parseInt(o.css("padding-right"))) + "px", f.css("margin-" + T, h)) : (f.find("li").length > g && p.removeLi(), f.css("margin-" + T, "0px")), X) {
                        X.empty();
                        for (var t = 0; i > t; t++)if (_) {
                            var s = z.clone(), y = m.eq(t).html();
                            s.html(y), p.find(X).append(s)
                        } else p.find(X).append(z.clone());
                        p.find(X).find("li").eq(0).addClass("cur")
                    }
                    p.find(X).find("li").on("click", function () {
                        var t = p.find(X).find("li").index($(this));
                        t > e - 1 && (t = e - 1), p["goto"](t)
                    }), n(F) && !q && p.play(F), k && null === H && (H = C ? d.oTouch({
                        touchStart: function (t) {
                            n(F) && q && p.stop(), D = !0
                        }, touchMoveV: function (t) {
                            e > 1 && (isIe8 || isIe9 || isUC ? null === v ? w.css("top", -p.i * c + (t.moveY - t.startY) + "px") : p.showAmt + p.i >= g ? w.css("top", -p.i * v + (t.moveY - t.startY) + "px") : w.css("top", -p.i * v + (t.moveY - t.startY) + "px") : null === v ? w.oCss3({
                                transform: "translate3d(0px," + -(p.i * c + (t.startY - t.moveY)) + "px,0px)",
                                "transition-duration": "0s"
                            }) : p.showAmt + p.i >= g ? w.oCss3({
                                transform: "translate3d(0px," + -(p.i * v + (t.startY - t.moveY)) + "px,0px)",
                                "transition-duration": "0s"
                            }) : w.oCss3({
                                transform: "translate3d(0px," + -(p.i * v + (t.startY - t.moveY)) + "px,0px)",
                                "transition-duration": "0s"
                            }))
                        }, touchUp: function (t) {
                            e > 1 && (t.startY - t.endY > 20 && B ? (O = Math.abs(Math.ceil((t.startY - t.endY) / c)), p.next()) : isIe8 || isIe9 || isUC ? null === v ? w.stop().animate({top: -p.i * c + "px"}, 300) : w.stop().animate({top: -p.i * v + "px"}, 300) : null === v ? w.oCss3({
                                transform: "translate3d(0px," + -(p.i * c) + "px,0px)",
                                "transition-duration": "0.3s"
                            }) : w.oCss3({
                                transform: "translate3d(0px," + -(p.i * v) + "px,0px)",
                                "transition-duration": "0.3s"
                            }))
                        }, touchDown: function (t) {
                            e > 1 && (t.startY - t.endY < -20 && B ? (O = Math.abs(Math.ceil((t.endY - t.startY) / c)), p.prev()) : isIe8 || isIe9 || isUC ? null === v ? w.stop().animate({top: -p.i * c + "px"}, 300) : w.stop().animate({top: -p.i * v + "px"}, 300) : null === v ? w.oCss3({
                                transform: "translate3d(0px," + -(p.i * c) + "px,0px)",
                                "transition-duration": "0.3s"
                            }) : w.oCss3({
                                transform: "translate3d(0px," + -(p.i * v) + "px,0px)",
                                "transition-duration": "0.3s"
                            }))
                        }, touchEnd: function () {
                            isPC || n(F) && !q && p.play(F)
                        }
                    }) : d.oTouch({
                        touchStart: function () {
                            n(F) && q && p.stop(), D = !0
                        }, touchMoveH: function (t) {
                            e > 1 && (isIe8 || isIe9 || isUC ? null === v ? w.css("left", -p.i * c + (t.moveX - t.startX) + "px") : p.showAmt + p.i >= g ? w.css("left", -p.i * v + (t.moveX - t.startX) + "px") : w.css("left", -p.i * v + (t.moveX - t.startX) + "px") : null === v ? w.oCss3({
                                transform: "translate3d(" + -(p.i * c + (t.startX - t.moveX)) + "px,0px,0px)",
                                "transition-duration": "0s"
                            }) : p.showAmt + p.i >= g ? w.oCss3({
                                transform: "translate3d(" + -(p.i * v + (t.startX - t.moveX)) + "px,0px,0px)",
                                "transition-duration": "0s"
                            }) : w.oCss3({
                                transform: "translate3d(" + -(p.i * v + (t.startX - t.moveX)) + "px,0px,0px)",
                                "transition-duration": "0s"
                            }))
                        }, touchLeft: function (t) {
                            e > 1 && (t.startX - t.endX > 50 && B ? (O = Math.abs(Math.ceil((t.startX - t.endX) / c)), p.next()) : isIe8 || isIe9 || isUC ? null === v ? w.stop().animate({left: -p.i * c + "px"}, 300) : w.stop().animate({left: -p.i * v + "px"}, 300) : null === v ? w.oCss3({
                                transform: "translate3d(" + -(p.i * c) + "px,0px,0px)",
                                "transition-duration": "0.3s"
                            }) : w.oCss3({
                                transform: "translate3d(" + -(p.i * v) + "px,0px,0px)",
                                "transition-duration": "0.3s"
                            }))
                        }, touchRight: function (t) {
                            e > 1 && (t.startX - t.endX < -50 && B ? (O = Math.abs(Math.ceil((t.endX - t.startX) / c)), p.prev()) : isIe8 || isIe9 || isUC ? null === v ? w.stop().animate({left: -p.i * c + "px"}, 300) : w.stop().animate({left: -p.i * v + "px"}, 300) : null === v ? w.oCss3({
                                transform: "translate3d(" + -(p.i * c) + "px,0px,0px)",
                                "transition-duration": "0.3s"
                            }) : w.oCss3({
                                transform: "translate3d(" + -(p.i * v) + "px,0px,0px)",
                                "transition-duration": "0.3s"
                            }))
                        }, touchEnd: function () {
                            isPC || n(F) && !q && p.play(F)
                        }
                    })), $p.touchClear && d.oTouch({clearE: !0}), p.pagerlist()
                }
            }, p.play = function (t) {
                setTimeout(function () {
                    clearInterval(l), l = setInterval(function () {
                        p.next()
                    }, t), q = !0
                }, 500)
            }, p.showWidthFn = function () {
                a % o.width() !== 0 && (a = Math.ceil(o.width()) * p.showAmt, d.css({width: a + "px"}), Y && (p.prevBtn.css("width", Math.floor((p.width() - a) / 2) + "px"), p.nextBtn.css("width", Math.floor((p.width() - a) / 2) + "px")))
            }, p.showHeightFn = function () {
                r % o.height() !== 0 && (r = Math.ceil(o.height()) * p.showAmt, d.css({height: r + "px"}), Y && (p.prevBtn.css("height", Math.floor((u - r) / 2) + "px"), p.nextBtn.css("height", Math.floor((u - r) / 2) + "px"), d.css({top: Math.floor((u - r) / 2) + "px"})))
            }, p.stop = function () {
                clearInterval(l), q = !1
            }, p.change = function () {
                m = d.find("li"), g = m.length, f = d.find("ul"), M && (U = f.clone(), R = U.find("li"), W = R.clone()), p.init()
            }, p["goto"] = function (t) {
                B = !1, M && !j ? (s = null === v ? -t * c + "px" : -t * v + "px", p.i = t, isIe8 || isIe9 || isUC ? C ? w.stop().animate({top: s}, 300, function () {
                    t >= e ? w.css({top: -p.i * c}) : -1 >= t && w.css({top: -p.i * c})
                }) : w.stop().animate({left: s}, 300, function () {
                    t >= e ? w.css({left: -p.i * c}) : -1 >= t && w.css({left: -p.i * c})
                }) : C ? w.oCss3({
                    transform: "translate3d(0px," + s + ",0px)",
                    "transition-duration": "0.3s"
                }) : w.oCss3({
                    transform: "translate3d(" + s + ",0px,0px)",
                    "transition-duration": "0.3s"
                }), t >= e ? (p.i = t - e, setTimeout(function () {
                    isIe8 || isIe9 || isUC || (C ? w.oCss3({
                        transform: "translate3d(0px," + -p.i * c + "px,0px)",
                        "transition-duration": "0s"
                    }) : w.oCss3({
                        transform: "translate3d(" + -p.i * c + "px,0px,0px)",
                        "transition-duration": "0s"
                    })), !n(F) || isPC || q || p.play(F)
                }, 200)) : -1 >= t ? (p.i = e + t, setTimeout(function () {
                    isIe8 || isIe9 || isUC || (C ? w.oCss3({
                        transform: "translate3d(0px," + -p.i * c + "px,0px)",
                        "transition-duration": "0s"
                    }) : w.oCss3({
                        transform: "translate3d(" + -p.i * c + "px,0px,0px)",
                        "transition-duration": "0s"
                    })), !n(F) || isPC || q || p.play(F)
                }, 200)) : setTimeout(function () {
                    !n(F) || isPC || q || p.play(F)
                }, 200), setTimeout(function () {
                    B = !0
                }, 300)) : (null === v ? s = t * c + "px" : (s = t * v + "px", p.showAmt + t > g && (s = (g - p.showAmt) / v + "px")), p.i = t, isIe8 || isIe9 || isUC ? C ? w.stop().animate({top: "-" + s}, 300, function () {
                }) : w.stop().animate({left: "-" + s}, 300, function () {
                }) : C ? w.oCss3({
                    transform: "translate3d(0px,-" + s + ",0px)",
                    "transition-duration": "0.3s"
                }) : w.oCss3({
                    transform: "translate3d(-" + s + ",0px,0px)",
                    "transition-duration": "0.3s"
                }), setTimeout(function () {
                    B = !0, !n(F) || isPC || q || p.play(F)
                }, 300)), p.prevOrNextFn(), null !== A && A({i: p.i, next: p.nextBtn, prev: p.prevBtn}), p.pagerlist()
            }, p.prevOrNextFn = function () {
                null !== E && $next ? E(p.i) : null !== S && $prev && S(p.i)
            }, p.pagerlist = function () {
                if (p.showAmt > 1)if (b || x)if (M) {
                    X.find("li").removeClass("cur").removeClass("firstcur");
                    for (var t = 0; t < p.showAmt; t++)p.i + t >= g ? X.find("li").eq(p.i - g + t).addClass("cur") : X.find("li").eq(p.i + t).addClass("cur");
                    X.find("li").eq(p.i).addClass("firstcur")
                } else {
                    X.find("li").removeClass("cur").removeClass("firstcur");
                    for (var t = 0; t < p.showAmt; t++)p.i > g - p.showAmt ? X.find("li").eq(g - p.showAmt + t).addClass("cur") : X.find("li").eq(p.i + t).addClass("cur");
                    X.find("li").eq(p.i).addClass("firstcur")
                } else X.find("li").eq(p.i).addClass("cur").siblings().removeClass("cur"); else X.find("li").eq(p.i).addClass("cur").siblings().removeClass("cur");
                M && (R.removeClass("cur").eq(p.i).addClass("cur"), W.removeClass("cur").eq(p.i).addClass("cur")), m.removeClass("cur").eq(p.i).addClass("cur"), O = 1
            }, y) {
            var N = $("<div class='scroll'></div>"), V = $("<span></span>");
            N.append(V)
        }
        return p.addLi = function () {
            P === !1 && (R.appendTo(f), W.appendTo(f), P = !0)
        }, p.removeLi = function () {
            P === !0 && (R.remove(), W.remove(), P = !1)
        }, p.prevBtn.click(function () {
            p.prev()
        }), p.prev = function () {
            $next = !1, $prev = !0, B && (x ? p.i-- : (O > p.showAmt ? p.showAmt : O, p.i -= O), M && !j ? p["goto"](p.i) : p.i < 0 ? (M && !j || (D ? (x ? p.i++ : p.i = 0, $prev = !1, D = !1) : p.i = e - 1), p["goto"](p.i)) : p["goto"](p.i))
        }, p.nextBtn.click(function () {
            p.next()
        }), p.next = function () {
            $next = !0, $prev = !1, B && (x ? p.i++ : (O > p.showAmt ? p.showAmt : O, p.i += O), M && !j ? (p["goto"](p.i), null !== E && E(p.i)) : p.i > e - 1 ? (M && !j || (D ? (x ? p.i-- : p.i = e - 1, $next = !1, D = !1) : p.i = 0), p["goto"](p.i)) : p["goto"](p.i))
        }, I && $(window).resize(function () {
            p.init()
        }), p
    }, $.fn.oHrel = function (p) {
        var ele = $(this), backEle = [];
        ele.each(function () {
            var defaults = {resize: !0, obj: null}, $p = $.extend(defaults, p), $this = {};
            $this.obj = $(this), null !== $this.obj.attr("obj") && ($this.target = $($this.obj.attr("obj"))), null !== $p.obj && ($this.target = eval($p.obj)), $this.h = 0, $this.init = function () {
                $this.h = $this.target.height(), $this.obj.css("height", $this.h + "px")
            }, $p.resize && $(window).resize(function () {
                $this.init()
            }), backEle.push($this)
        });
        var $backEle = $(backEle);
        return $backEle.init = function (t) {
            t ? backEle[t].init() : $backEle.each(function (t) {
                backEle[t].init()
            })
        }, $backEle
    }, $.fn.oCss3 = function (t, n) {
        var o = $(this), s = "", i = ["-webkit-", "-o-", "-moz-"];
        n === !1 && (s = o.attr("style"));
        for (var e in t) {
            s += ";" + e + ":" + t[e];
            for (var a = 0; a < i.length; a++)s += ";" + i[a] + e + ":" + t[e]
        }
        o.attr("style", s)
    }, $.fn.oRotate = function (t) {
        var n = $(this);
        if (isIe8) {
            var o = Math.cos(t), s = -Math.sin(t), i = Math.sin(t), e = Math.cos(t), a = n.width(), r = n.height(), l = (-a / 2 * Math.cos(t) + r / 2 * Math.sin(t) + a / 2, -a / 2 * Math.sin(t) - r / 2 * Math.cos(t) + r / 2, n.attr("style"));
            l += ";filter:progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ",M12=" + s + ",M21=" + i + ",M22=" + e + ",SizingMethod='auto expand');", n.attr("style", l)
        } else n.oCss3({transform: "rotate(" + t + "deg)"}, !1)
    }, $.fn.oPopup = function (t) {
        defaults = {
            confirm: ".js_confirm",
            confirmFn: null,
            zz: "<div class='o_shade'></div>",
            closeFn: null,
            absolute: !1
        }, $p = $.extend(defaults, t);
        var n = $(this);
        return n.obj = $(this), n.target = null, null !== $(this).attr("oData-popup") && (n.target = $($(this).attr("oData-popup"))), n.zz = $($p.zz), n.confirm = n.target.find($p.confirm), n.closebtn = n.target.find(".js_popupClose"), n.confirmFn = $p.confirmFn, n.closeFn = $p.closeFn, n.absolute = $p.absolute, n.top = 0, n.absolute && n.target.addClass("absolute"), n.on("click", function () {
            n.open()
        }), n.open = function () {
            n.zz.appendTo($(".o_body")).addClass("show"), n.target.show().addClass("show"), n.confirm.length > 0 && (n.confirm.off(), n.confirm.on("click", function () {
                n.closebtn.click(), n.confirmFn && n.confirmFn({selfEle: n.obj, targetEle: n.target, self: n})
            })), n.init()
        }, n.closebtn.on("click", function () {
            n.close()
        }), n.close = function () {
            n.target.addClass("hide"), n.zz.removeClass("show"), setTimeout(function () {
                n.zz.detach(), n.target.removeClass("hide").removeClass("show").hide(), null !== n.closeFn && n.closeFn(n.target)
            }, 300)
        }, n.init = function () {
            var t = $(window).height(), o = $(document).height(), s = $(window).scrollTop(), i = n.target.height();
            n.absolute ? t >= i ? (n.top = s + (t - i) / 2, n.target.css("top", n.top)) : s + i + 30 > o ? (s = o - (i + 60), $("html,body").animate({scrollTop: s}, 200), n.top = s + 30, n.target.css("top", n.top).addClass("absolute")) : (n.top = s + 30, n.target.css("top", n.top)) : t >= i ? (n.top = (t - i) / 2, n.target.css("top", n.top).removeClass("absolute")) : s + i + 30 > o ? (s = o - (i + 60), $("html,body").animate({scrollTop: s}, 200), n.top = s + 30, n.target.css("top", n.top).addClass("absolute")) : (n.top = s + 30, n.target.css("top", n.top).addClass("absolute"))
        }, isPC && $(window).resize(function () {
            n.init()
        }), n
    }, $.fn.oNoSelect = function () {
        isIe ? isPC && ($(this).on("selectstart", function () {
            return !1
        }), $(this).on("drag", function () {
            return !1
        })) : $(this).oCss3({"user-select": "none"}, !1)
    }, $.fn.oCutImg = function (t) {
        defaults = {imgurl: [], showimg: "", min: 50, windowResize: !0}, $p = $.extend(defaults, t);
        var n, o, s, i, e, a, r, l, c, h, p, d = $(this), u = $p.imgurl, f = $p.min, m = $($p.showimg), g = $("<div class='o_cutimgbox'>"), x = $("<div class='bgbox'>"), b = $("<div class='imgbox'>"), v = $("<div class='cutbox'>"), w = $("<div class='box'>"), C = $("<div class='controlbox'>"), T = $("<div class='control'>"), M = $("<div class='resize'>"), y = $("<img>"), Y = d.height(), X = d.width(), _ = i, j = 0;
        y.attr("src", u[0]);
        var z = y.clone(!0);
        return d.changeImg = function (t) {
            j = 0, u = t, y.attr("src", u[0]), z.attr("src", u[0])
        }, d.rotate = function () {
            j++, j > 3 && (j = 0), y.attr("src", u[j]), z.attr("src", u[j])
        }, d.reset = function () {
            y.appendTo(b), b.appendTo(x), z.appendTo(w), w.appendTo(v), M.appendTo(T), T.appendTo(C), g.append(x).append(v).append(C), d.append(g), b.attr("style", ""), z.attr("style", ""), b.attr("style", ""), y.attr("style", ""), n = z.height(), s = y.width(), o = y.height(), y.height() > d.height() && (o = d.height(), b.height(o), y.height(o), z.height(o), s = y.width()), c = s >= o ? "width" : "height", isIe && (y.attr("style", ""), b.attr("style", ""), "height" == c ? y.height() > Y && (y.height(Y), b.css({
                height: y.height(),
                width: "auto"
            })) : "width" == c && y.width() > X && (y.width(X), b.css({
                width: y.width(),
                height: "auto"
            })), s = y.width(), o = y.height()), i = s - o > 0 ? o : s, i = i < T.width() ? i : T.width(), _ = i, e = -Math.round((s - i) / 2), a = -Math.round((o - i) / 2), z.css({
                width: s,
                height: o,
                left: e,
                top: a
            }), isIe8 ? (b.css({width: s, height: o}), v.css({
                width: s,
                height: o,
                "margin-left": -Math.floor(s / 2),
                "margin-top": -Math.floor(o / 2)
            }), C.css({
                width: s,
                height: o,
                "margin-left": -Math.floor(s / 2),
                "margin-top": -Math.floor(o / 2)
            })) : (b.css({width: s, height: o}), v.css({
                width: s,
                height: o,
                "margin-left": -Math.round(s / 2),
                "margin-top": -Math.floor(o / 2)
            }), C.css({
                width: s,
                height: o,
                "margin-left": -Math.round(s / 2),
                "margin-top": -Math.floor(o / 2)
            })), r = Math.round((s - i) / 2), l = Math.round((o - i) / 2), T.css({
                width: i,
                height: i,
                left: r,
                top: l
            }), w.css({
                width: i,
                height: i,
                left: r,
                top: l
            }), "width" == c ? h = o / i : "height" == c && (h = s / i), m.each(function () {
                var t = $(this).parent().width() / i;
                $(this).parent().css({
                    position: "relative",
                    overflow: "hidden",
                    "-webkit-transform": "translateZ(0)",
                    "-webkit-backface-visiblity": "hidden"
                }), "width" == c ? $(this).attr("src", u[j]).css({
                    position: "absolute",
                    height: $(this).parent().width() * h,
                    width: "auto",
                    left: -r * t,
                    top: -l * t
                }) : "height" == c && $(this).attr("src", u[j]).css({
                    position: "absolute",
                    width: $(this).parent().width() * h,
                    height: "auto",
                    left: -r * t,
                    top: -l * t
                })
            })
        }, T.oTouch({
            touchStart: function () {
            }, touchMove: function (t) {
                r + (t.moveX - t.startX) >= 0 && r + (t.moveX - t.startX) <= s - i ? (w.css({left: r + (t.moveX - t.startX)}), T.css({left: r + (t.moveX - t.startX)}), z.css({left: e - (t.moveX - t.startX)})) : r + (t.moveX - t.startX) < 0 ? (z.css({left: 0}), w.css({left: 0}), T.css({left: 0})) : r + (t.moveX - t.startX) > s - i && (z.css({left: i - s}), w.css({left: s - i}), T.css({left: s - i})), l + (t.moveY - t.startY) >= 0 && l + (t.moveY - t.startY) <= o - i ? (z.css({top: a - (t.moveY - t.startY)}), w.css({top: l + (t.moveY - t.startY)}), T.css({top: l + (t.moveY - t.startY)})) : l + (t.moveY - t.startY) < 0 ? (z.css({top: 0}), w.css({top: 0}), T.css({top: 0})) : l + (t.moveY - t.startY) > o - i && (z.css({top: i - o}), w.css({top: o - i}), T.css({top: o - i})), m.each(function () {
                    $(this).css({
                        left: z.position().left * ($(this).width() / z.width()),
                        top: z.position().top * ($(this).width() / z.width())
                    })
                })
            }, touchEnd: function (t) {
                r = T.position().left, l = T.position().top, e = z.position().left, a = z.position().top
            }, clearE: !0
        }), M.oTouch({
            touchStart: function (t) {
            }, touchMove: function (t) {
                var n = Math.abs(t.moveX - t.startX) > Math.abs(t.moveY - t.startY) ? t.moveX - t.startX : t.moveY - t.startY;
                s >= i + n + r && o >= i + n + l && i + n >= f ? (T.css({width: i + n, height: i + n}), w.css({
                    width: i + n,
                    height: i + n
                })) : i + n + r > s && o >= i + n + l ? (T.css({width: s - r, height: s - r}), w.css({
                    width: s - r,
                    height: s - r
                })) : i + n + l > o && s >= i + n + r ? (T.css({width: o - l, height: o - l}), w.css({
                    width: o - l,
                    height: o - l
                })) : f > i + n && (T.css({width: f, height: f}), w.css({
                    width: f,
                    height: f
                })), "width" == c ? h = s / T.width() : "height" == c && (h = o / T.height()), m.each(function () {
                    var t = $(this).parent().width() / T.width();
                    "width" == c ? $(this).css({
                        width: $(this).parent().width() * h,
                        height: "auto",
                        left: z.position().left * t,
                        top: z.position().top * t
                    }) : "height" == c && $(this).css({
                        height: $(this).parent().width() * h,
                        width: "auto",
                        left: z.position().left * t,
                        top: z.position().top * t
                    })
                })
            }, touchEnd: function () {
                i = T.width()
            }, clearE: !0
        }), d.init = function () {
            y.load(function () {
                d.reset()
            })
        }, $p.windowResize && $(window).resize(function () {
            d.reset()
        }), d.cut = function () {
            var t = n / y.height();
            return p = {
                url: u[j] + "",
                x: Math.floor(T.position().left * t),
                y: Math.floor(T.position().top * t),
                width: Math.floor(T.height() * t)
            }
        }, d
    }, $.fn.oTouch = function (t) {
        function n(t) {
            var n = t.originalEvent.targetTouches[0];
            a = n.pageX, r = n.pageY, u({self: d, startX: a, startY: r}), T = !1
        }

        function o(t) {
            M && (t.stopPropagation(), t.preventDefault());
            var n = t.originalEvent.targetTouches[0];
            h = n.pageX, p = n.pageY, null !== f && (f({
                self: d,
                startX: a,
                startY: r,
                moveX: h,
                moveY: p
            }), T = !0), null !== m && Math.abs(h - a) > Math.abs(p - r) && Math.abs(h - a) > 1 && (m({
                self: d,
                startX: a,
                startY: r,
                moveX: h,
                moveY: p
            }), t.stopPropagation(), t.preventDefault(), T = !0), null !== g && Math.abs(h - a) < Math.abs(p - r) && Math.abs(p - r) > 1 && (g({
                self: d,
                startX: a,
                startY: r,
                moveX: h,
                moveY: p
            }), t.stopPropagation(), t.preventDefault(), T = !0)
        }

        function s(t) {
            var n = t.originalEvent.changedTouches[0];
            l = n.pageX, c = n.pageY, T && (T = !1, -1 > a - l && b({
                self: d,
                startX: a,
                endX: l,
                startY: r,
                endY: c
            }), a - l > 1 && x({self: d, startX: a, endX: l, startY: r, endY: c}), r - c > 1 && v({
                self: d,
                startX: a,
                endX: l,
                startY: r,
                endY: c
            }), -1 > r - c && w({self: d, startX: a, endX: l, startY: r, endY: c}), C({
                self: d,
                startX: a,
                endX: l,
                startY: r,
                endY: c
            }))
        }

        function i(t) {
            h = t.pageX, p = t.pageY, (h - a > 10 || -10 > h - a) && d.on("click", function () {
                return !1
            }), null !== f && (f({
                self: d,
                startX: a,
                startY: r,
                moveX: h,
                moveY: p
            }), t.stopPropagation(), t.preventDefault(), T = !0), null !== m && Math.abs(h - a) > Math.abs(p - r) && Math.abs(h - a) > 10 && (m({
                self: d,
                startX: a,
                startY: r,
                moveX: h,
                moveY: p
            }), t.stopPropagation(), t.preventDefault(), T = !0), null !== g && Math.abs(h - a) < Math.abs(p - r) && Math.abs(p - r) > 10 && (g({
                self: d,
                startX: a,
                startY: r,
                moveX: h,
                moveY: p
            }), t.stopPropagation(), t.preventDefault(), T = !0)
        }

        function e(t) {
            $("body,html").off("mousemove"), $("body,html").off("mouseup"), l = t.pageX, c = t.pageY, -1 > a - l && b({
                self: d,
                startX: a,
                endX: l,
                startY: r,
                endY: c
            }), a - l > 1 && x({self: d, startX: a, endX: l, startY: r, endY: c}), r - c > 1 && v({
                self: d,
                startX: a,
                endX: l,
                startY: r,
                endY: c
            }), -1 > r - c && w({self: d, startX: a, endX: l, startY: r, endY: c}), C({
                self: d,
                startX: a,
                endX: l,
                startY: r,
                endY: c
            }), setTimeout(function () {
                d.off("click")
            }, 10)
        }

        defaults = {
            clearE: !1, touchStart: function () {
            }, touchMove: null, touchMoveH: null, touchMoveV: null, touchLeft: function () {
            }, touchRight: function () {
            }, touchUp: function () {
            }, touchDown: function () {
            }, touchEnd: function () {
            }
        }, t = $.extend(defaults, t);
        var a, r, l, c, h, p, d = $(this), u = t.touchStart, f = t.touchMove, m = t.touchMoveH, g = t.touchMoveV, x = t.touchLeft, b = t.touchRight, v = t.touchUp, w = t.touchDown, C = t.touchEnd, T = !0, M = t.clearE;
        return d.length && (isPC ? d.on("mousedown", function (t) {
            return a = t.pageX, r = t.pageY, u({
                self: d,
                startX: a,
                startY: r
            }), $("body,html").bind("mousemove", function (t) {
                return i(t), !1
            }), $("body,html").bind("mouseup", function (t) {
                return e(t), !1
            }), !1
        }) : (d.on("touchstart", function (t) {
            n(t)
        }), d.on("touchmove", function (t) {
            o(t)
        }), d.on("touchend", function (t) {
            s(t)
        }))), d.touchClear = function () {
            isPC ? d.off("mousedown") : (d[0].removeEventListener("touchstart", n, !1), d[0].removeEventListener("touchmove", o, !1), d[0].removeEventListener("touchend", s, !1))
        }, d
    }, $.fn.oToggle = function (t, n) {
        var o = $(this);
        return o.on("click", function () {
            return "0" === o.attr("auto") || void 0 === o.attr("auto") ? (t(o), o.attr("auto", "1")) : "1" == o.attr("auto") && (n(o), o.attr("auto", "0")), !1
        }), o
    }, $.fn.oToggleAll = function (t) {
        defaults = {
            fn1: function () {
            }, fn2: function () {
            }, target: "", door: function () {
                return !0
            }
        }, $p = $.extend(defaults, t);
        var n = $(this), o = $p.target, s = $p.fn1, i = $p.fn2, e = $p.door;
        n.on("click", o, function () {
            if (e()) {
                var t = $(this).attr("auto");
                "0" === t || void 0 === t ? (s($(this)), $(this).attr("auto", "1")) : "1" === t && (i($(this)), $(this).attr("auto", "0"))
            }
        })
    }, $.fn.oScrollGoto = function (t) {
        defaults = {
            spped: 1e3,
            count: 0,
            beforefn: null,
            afterfn: null,
            door: null,
            doorclass: null
        }, t = $.extend(defaults, t);
        var n, o = $(this), s = $("." + o.attr("target")), i = t.speed, e = t.count, a = t.afterfn, r = t.beforefn, l = t.timeout, c = $("." + t.door), h = t.doorclass;
        return o.on("click", function () {
            n = s.offset().top + e, null !== r ? null !== h && (c.hasClass(h) ? (r(), setTimeout(function () {
                o["goto"]()
            }, l)) : (r(), o["goto"]())) : o["goto"]()
        }), o["goto"] = function () {
            $("html,body").animate({scrollTop: n}, i), setTimeout(function () {
                null !== a && a()
            }, l)
        }, o
    }, $.fn.oScrollFn = function (t) {
        defaults = {
            upFn: function () {
            }, downFn: function () {
            }
        }, t = $.extend(defaults, t);
        var n = $(this), o = t.upFn, s = t.downFn, i = "onmousewheel" in doc ? "mousewheel" : "DOMMouseScroll";
        n.scrollfun = function (t) {
            ev = t.originalEvent, d = parseInt(ev.wheelDelta || -ev.detail), d > 0 ? o() : s(), t.stopPropagation(), t.preventDefault()
        }, $.event.add(n[0], i, n.scrollfun)
    }, $.fn.oScrollBar = function (t) {
        var n = $(this), o = [];
        n.each(function () {
            var n = {step: 50, surplus: 7, vShowBar: !0, vPScroll: !0};
            t = $.extend(n, t);
            var s = $(this);
            s.obj = $(this), s.parent = s.obj.parent(), s.win = $("<div class='o_scrollWin'>"), s.body = $("<div class='o_scrollbody'>"), s.barbox = $("<div class='o_barbox'>"), s.line = $("<span>"), s.step = t.step, s.bar = $("<div class='o_bar'>"), s.winH = null, s.bodyH = null, s.barH = null, s.barboxH = null, s.cha = 0, s.sScale = 1, s.sTop = 0, s.sTop_next = null, s.barT = null, s.bar.appendTo(s.barbox), s.line.appendTo(s.barbox), s.barbox.appendTo(s.win), s.obj.appendTo(s.body), s.body.appendTo(s.win), s.win.appendTo(s.parent), s.init = function () {
                s.sTop = 0, s.bar.css("top", s.sTop + "px"), s.body.css("margin-top", s.sTop), s.win.css("padding-right", s.barbox.width() + "px"), s.winH = s.win.height(), s.bodyH = s.body.height(), s.barboxH = s.barbox.height(), s.sScale = s.barboxH / s.bodyH, s.cha = s.bodyH - s.winH, s.barH = s.barbox.height() / Math.max(s.bodyH / s.winH, 1), s.bar.css("height", s.barH + "px"), s.cha <= 0 ? (s.barbox.hide(), s.win.css("padding-right", "0px"), s.off()) : (s.barbox.show(), isPC ? (
                s.resetScroll = function() {
                    s.sTop = 0, s.bar.css("top", s.sTop + "px"), s.body.css("margin-top", s.sTop), s.win.css("padding-right", s.barbox.width() + "px"), s.winH = s.win.height(), s.bodyH = s.body.height(), s.barboxH = s.barbox.height(), s.sScale = s.barboxH / s.bodyH, s.cha = s.bodyH - s.winH, s.barH = s.barbox.height() / Math.max(s.bodyH / s.winH, 1), s.bar.css("height", s.barH + "px")
                }, 
                s.scrollDown = function () {
                    s.bodyH > s.winH && (s.sTop_next = s.sTop - s.step, -s.sTop_next + s.winH > s.bodyH && (s.sTop_next = s.winH - s.bodyH), s.sTop = s.sTop_next, s.bar.css("top", -s.sTop_next * s.sScale + "px"), s.body.css("margin-top", s.sTop_next))
                },
                 s.scrollUp = function () {
                    s.bodyH > s.winH && (s.sTop_next = s.sTop + s.step, s.sTop_next > 0 && (s.sTop_next = 0), s.sTop = s.sTop_next, s.bar.css("top", -s.sTop_next * s.sScale + "px"), s.body.css("margin-top", s.sTop_next))
                }, s.win.oScrollFn({
                    upFn: function () {
                        s.scrollUp()
                    }, downFn: function () {
                        s.scrollDown()
                    }
                })) : s.body.oTouch({
                    touchMove: function (t) {
                        s.sTop_next = s.sTop + (t.moveY - t.startY), s.sTop_next > 0 ? s.sTop_next = 0 : -s.sTop_next + s.winH > s.bodyH && (s.sTop_next = s.winH - s.bodyH), s.sTop = s.sTop_next, s.bar.css("top", -s.sTop_next * s.sScale + "px"), s.body.css("margin-top", s.sTop_next)
                    }, clearE: !0
                }))
            }, s.bar.oTouch({
                touchStart: function () {
                }, touchMove: function (t) {
                    moveH = t.moveY - t.startY, s.sTop_next = s.sTop - moveH / s.sScale, s.sTop_next > 0 ? s.sTop_next = 0 : -s.sTop_next + s.winH > s.bodyH && (s.sTop_next = s.winH - s.bodyH), s.body.css("margin-top", s.sTop_next), s.bar.css("top", -s.sTop_next * s.sScale + "px")
                }, touchEnd: function () {
                    s.sTop = s.sTop_next
                }, clearE: !0
            }), o.push(s)
        });
        var s = $(o);
        return s.init = function (t) {
            t ? o[t].init() : s.each(function (t) {
                o[t].init()
            })
        }, s
    }, $.fn.oHoverMove = function (t) {
        function n(t) {
            a = t.pageX, r = t.pageY, x && (p = a, d = r), m({self: u, startX: i, startY: e, moveX: a, moveY: r})
        }

        function o(t) {
            l = t.pageX, c = t.pageY, x && clearInterval(h), g({self: u, startX: i, startY: e, leaveX: l, leaveY: c})
        }

        function s() {
            return p !== a || d !== r ? !1 : void x({self: u, startX: i, startY: e, moveX: a, moveY: r})
        }

        if (isPC) {
            defaults = {
                clearE: !1, mouseStart: function () {
                }, mouseMove: function () {
                }, mouseLeave: function () {
                }, mouseStopFn: null, stopTime: 1e3
            }, t = $.extend(defaults, t);
            var i, e, a, r, l, c, h, p, d, u = $(this), f = t.mouseStart, m = t.mouseMove, g = t.mouseLeave, x = t.mouseStopFn, b = t.stopTime;
            return u.on("mouseenter", function (t) {
                i = t.pageX, e = t.pageY, x && (h = setInterval(function () {
                    s()
                }, b)), f({self: u, startX: i, startY: e}), u.bind("mousemove", function (t) {
                    return n(t), !1
                }), u.bind("mouseleave", function (t) {
                    o(t), u.off("mousemove"), u.off("mouseleave")
                })
            }), u
        }
    }, $.fn.oBgCover = function () {
        var t = $(this), n = [];
        t.each(function () {
            var t = $(this);
            t.obj = $(this), t.parent = t.obj.parent(), t.parent.css({
                position: "relative",
                overflow: "hidden"
            }), t.pw = 0, t.ph = 0, t.w1 = 0, t.h1 = 0, t.init = function () {
                t.obj.css({
                    width: "auto",
                    height: "auto"
                }), t.pw = t.parent.width(), t.ph = t.parent.height(), t.w1 = t.obj.width(), t.h1 = t.obj.height(), 0 === t.obj.w1 ? t.obj.load(function () {
                    return t.pw = t.parent.width(), t.ph = t.parent.height(), t.w1 = t.obj.width(), t.h1 = t.obj.height(), t.pw / t.w1 > t.ph / t.h1 ? (t.css({
                        width: t.pw + "px",
                        height: "auto",
                        position: "absolute"
                    }), t.css({
                        "margin-left": -t.obj.width() / 2 + "px",
                        left: "50%",
                        top: "50%",
                        "margin-top": -t.obj.height() / 2 + "px"
                    })) : (t.css({
                        height: t.ph + "px",
                        width: "auto",
                        position: "absolute"
                    }), t.css({
                        "margin-left": -t.obj.width() / 2 + "px",
                        left: "50%",
                        top: "50%",
                        "margin-top": -t.obj.height() / 2 + "px"
                    })), !1
                }) : t.pw / t.w1 > t.ph / t.h1 ? (t.css({
                    width: t.pw + "px",
                    height: "auto",
                    position: "absolute"
                }), t.css({
                    "margin-left": -t.obj.width() / 2 + "px",
                    left: "50%",
                    top: "50%",
                    "margin-top": -t.obj.height() / 2 + "px"
                })) : (t.css({
                    height: t.ph + "px",
                    width: "auto",
                    position: "absolute"
                }), t.css({
                    "margin-left": -t.obj.width() / 2 + "px",
                    left: "50%",
                    top: "50%",
                    "margin-top": -t.obj.height() / 2 + "px"
                }))
            }, isPC && $(window).resize(function () {
                t.init()
            }), n.push(t)
        });
        var o = $(n);
        return o.init = function (t) {
            t ? n[t].init() : o.each(function (t) {
                n[t].init()
            })
        }, o
    }, $.fn.oBoxCenter = function () {
        var t = $(this), n = [];
        t.each(function () {
            var t = $(this);
            t.obj = $(this), t.parent = t.obj.parent(), t.w = 0, t.h = 0, t.init = function () {
                t.w = t.obj.width(), t.h = t.obj.height(), t.parent.css("position", "relative"), t.obj.css({
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    "margin-top": -t.h / 2 + "px",
                    "margin-left": -t.w / 2 + "px"
                })
            }, isPC && $(window).resize(function () {
                t.init()
            }), n.push(t)
        });
        var o = $(n);
        return o.init = function (t) {
            t ? n[t].init() : o.each(function (t) {
                n[t].init()
            })
        }, o
    }, $.fn.oScale = function (t) {
        var n = $(this), o = [], s = t;
        n.each(function () {
            defaults = {w: 1, h: 1, base: "width"};
            var t = $.extend(defaults, s), n = $(this);
            n.obj = $(this), n.w = t.w, n.h = t.h, n.base = t.base, n.obj.attr("w") && (n.w = parseInt(n.obj.attr("w"))), n.obj.attr("h") && (n.h = parseInt(n.attr("h"))), n.obj.attr("base") && (n.base = n.attr("base")), n.init = function () {
                if ("width" == n.base) {
                    if (0 === n.obj.width())return !1;
                    n.width = n.obj.width(), n.height = Math.round(n.width / n.w * n.h), n.css("height", n.height + "px")
                } else if ("height" === n.base) {
                    if (0 === n.obj.height())return !1;
                    n.height = n.obj.height(), n.width = Math.round(n.height / n.h * n.w), n.css("width", n.width + "px")
                }
            }, isPC && $(window).resize(function () {
                n.init()
            }), o.push(n)
        });
        var i = $(o);
        return i.init = function (t) {
            t ? o[t].init() : i.each(function (t) {
                o[t].init()
            })
        }, i
    }
}(window, document, jQuery), $().ready(function () {
    $(".o_autoH").each(function () {
        $(this).oAutoH().init()
    }), $(".o_main").oAutoH({minH: !0}).init(), $(".o_autoW").each(function () {
        $(this).oAutoW().init()
    }), $(".o_input").each(function () {
        $(this).oInputclear()
    }), $(".o_textarea").each(function () {
        $(this).oTextareaclear()
    }), isIe && $(".o_noselect").each(function () {
        $(this).oNoSelect()
    }), $(".o_g").oClear(), $(".o_main").oClear(), $(".o_autoH").oClear()
}), $.fn.oPopupFn = function () {
    var t = {};
    return t.target = null, t.zz = $("<div class='o_shade'></div>"), t.closeFn = null, t.top = 0, t.absolute = !1, t.closebtn = null, t.open = function (n) {
        t.target = null, t.closeFn = null, t.absolute = !1, t.absolute = null, t.closebtn = null, n.target && (t.target = $(n.target), t.closebtn = t.target.find(".js_popupClose"), t.closebtn && t.closebtn.on("click", function () {
            t.close()
        }), n.closeFn && (t.closeFn = n.closeFn), n.absolute && (t.absolute = n.absolute), t.zz.appendTo($(".o_body")).addClass("show"), t.target.show().addClass("show"), t.init())
    }, t.close = function () {
        t.target.addClass("hide"), t.zz.removeClass("show"), setTimeout(function () {
            t.zz.detach(), t.target.removeClass("hide").removeClass("show").hide(), null !== t.closeFn && t.closeFn(t.target)
        }, 300)
    }, t.init = function () {
        var n = $(window).height(), o = $(document).height(), s = $(window).scrollTop(), i = t.target.height();
        t.absolute ? n >= i ? (t.top = s + (n - i) / 2, t.target.css("top", t.top)) : s + i + 30 > o ? (s = o - (i + 60), $("html,body").animate({scrollTop: s}, 200), t.top = s + 30, t.target.css("top", t.top).addClass("absolute")) : (t.top = s + 30, t.target.css("top", t.top)) : n >= i ? (t.top = (n - i) / 2, t.target.css("top", t.top).removeClass("absolute")) : s + i + 30 > o ? (s = o - (i + 60), $("html,body").animate({scrollTop: s}, 200), t.top = s + 30, t.target.css("top", t.top).addClass("absolute")) : (t.top = s + 30, t.target.css("top", t.top).addClass("absolute"))
    }, t
}, $.fn.oAlert = function (t) {
    defaults = {info: "没有定义信息"}, $p = $.extend(defaults, t);
    var n = $(".o_body"), o = {};
    return o.openbtn = $("<span>"), o.openbtn.attr("oData-popup", ".js_alertbox"), o.autoInfo = $p.info, o.newClass = "", o.box = $("<div class='o_popup o_alert js_alertbox'></div>"), o.closeBtn = $("<span class='o_popupclose js_popupClose'><span>"), o.contbox = $("<div class='cont'>"), o.tool = $("<div class='tool'></div>"), o.confirmBtn = $("<div class='o_bgbtn1 btn o_btn_df-sm js_popupClose'><span>确定</span></div>"), o.closeBtn.appendTo(o.box), o.contbox.appendTo(o.box), o.confirmBtn.appendTo(o.tool), o.tool.appendTo(o.box), n.after(o.box), n.append(o.openbtn), o.openbtn.oPopup(), o.open = function (t) {
        o.box.removeClass(o.newClass), t.info ? o.contbox.html(t.info) : o.contbox.html(o.autoInfo), t.addClass ? (o.newClass = t.addClass, o.box.addClass(o.newClass)) : o.newClass = "", o.openbtn.click()
    }, o
}, $.fn.oConfirm = function (t) {
    defaults = {info: "没有定义信息"}, $p = $.extend(defaults, t);
    var n = $(".o_body"), o = {};
    return o.openbtn = $("<span>"), o.openbtn.attr("oData-popup", ".js_alertbox"), o.autoInfo = $p.info, o.callbackFn = null, o.targetEle = null, o.newClass = "", o.box = $("<div class='o_popup o_alert js_alertbox'></div>"), o.closeBtn = $("<span class='o_popupclose js_popupClose'><span>"), o.contbox = $("<div class='cont'>"), o.tool = $("<div class='tool'></div>"), o.confirmBtn = $("<div class='o_bgbtn1 btn o_btn_df-sm js_confirm'><span>确定</span></div>"), o.cancelBtn = $("<div class='o_linebtn1 btn o_btn_df-sm js_popupClose'><span>取消</span></div>"), o.closeBtn.appendTo(o.box), o.contbox.appendTo(o.box), o.confirmBtn.appendTo(o.tool), o.cancelBtn.appendTo(o.tool), o.tool.appendTo(o.box), n.after(o.box), n.append(o.openbtn), o.openbtn.oPopup({
        confirmFn: function () {
            o.callbackFn(o.targetEle)
        }
    }), o.open = function (t) {
        o.callbackFn = null, o.box.removeClass(o.newClass), t ? (t.info ? o.contbox.html(t.info) : o.contbox.html(o.autoInfo), t.ele ? o.targetEle = t.ele : o.targetEle = null, t.callbackFn ? o.callbackFn = t.callbackFn : o.callbackFn = function () {
        }, t.addClass ? (o.newClass = t.addClass, o.box.addClass(o.newClass)) : o.newClass = "") : o.contbox.html(o.autoInfo), o.openbtn.click()
    }, o
};