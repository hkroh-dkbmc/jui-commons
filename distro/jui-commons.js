/*! jui-commons 2014-08-06 */
$.widget("jui.juiBase", {
    options: {
        disableOnTouchDevice: !0,
        isTouchDevice: !1,
        isLessThanIE9: !1,
        defaultTimelineClass: "TimelineLite",
        timeline: null,
        ui: {}
    },
    _create: function() {
        var a = this.options;
        $("html").hasClass("touch") && a.disableOnTouchDevice && (a.isTouchDevice = !0), 
        $("html").hasClass("lt-ie9") && (a.isLessThanIE9 = !0);
    },
    _namespace: function(a, b, c) {
        var d, e = a.split("."), f = sjl.isset(b) ? b : this.options;
        for (d = 0; d < e.length; d += 1) "undefined" == typeof f[e[d]] && (f[e[d]] = {}), 
        d === e.length - 1 && "undefined" != typeof c && (f[e[d]] = c), f = f[e[d]];
        return f;
    },
    _populateUiElementsFromOptions: function(a) {
        var b = this, c = sjl.isset(a) ? a : this.options;
        sjl.isset(c.ui) || (c.ui = {}), c = c.ui;
        for (var d in c) if (c.hasOwnProperty(d) && ("string" == typeof c[d] && (c[d] = c[d] = $(c[d], b.element)), 
        $.isPlainObject(c[d]))) {
            if (sjl.isset(c[d].elm) && c[d].elm.length > 0) return;
            c[d].elm = b._getElementFromOptions(c[d]);
        }
    },
    _getElementFromOptions: function(a) {
        var b = this, c = b.options, d = a;
        return "string" == typeof d && (d = b._namespace(d, c)), "function" == typeof d && (d = d()), 
        sjl.empty(d) ? null : d instanceof $ && d.length > 0 ? d : sjl.isset(d.elm) && d.elm instanceof $ && d.length > 0 ? d.elm : (sjl.isset(d.selector) && sjl.empty(d.elm) && "string" == typeof d.selector && (d.elm = "string" == typeof d.appendTo && d.appendTo.length > 0 && -1 === d.appendTo.indexOf("this") ? $(d.selector, b.getUiElement(d.appendTo)) : $(d.selector, b.element)), 
        !sjl.empty(d.html) && d.create && "string" == typeof d.html && (d.elm = this._createElementFromOptions(d), 
        sjl.isset(d.appendTo) && "string" == typeof d.appendTo && b._appendElementFromOptions(d)), 
        sjl.empty(d.elm) ? null : d.elm);
    },
    _appendElementFromOptions: function(a) {
        var b = this.element.parent();
        "body" === a.appendTo ? a.elm = $("body").eq(0).append(a.elm).find(a.selector) : "this.element" === a.appendTo ? a.elm = this.element.append(a.elm).find(a.selector) : "after this.element" === a.appendTo ? (this.element.after(a.elm), 
        a.elm = b.find(this.element.get(0).nodeName + " ~ " + a.selector)) : "before this.element" === a.appendTo ? (this.element.before(a.elm), 
        a.elm = b.find(a.selector + " ~ " + this.element.get(0).nodeName)) : "prepend to this.element" === a.appendTo ? (this.element.prepend(a.elm), 
        a.elm = this.element.children().first()) : a.elm = this.getUiElement(a.appendTo).append(a.elm).find(a.selector);
    },
    _createElementFromOptions: function(a) {
        var b = null;
        return sjl.isset(a) && "string" == typeof a && (a = this._namespace(a)), 
        sjl.empty(a) ? null : (a.html && (b = $(a.html), sjl.isset(a.attribs) && $.isPlainObject(a.attribs) && b.attr(a.attribs)), 
        b);
    },
    _removeCreatedElements: function() {
        var a = this, b = a.options;
        for (var c in b.ui) b.ui[c].elm instanceof $ && b.ui[c].create && b.ui[c].elm.remove();
    },
    _setOption: function(a, b) {
        this._namespace(a, this.options, b);
    },
    _setOptions: function(a) {
        var b = this;
        if (sjl.isset(a)) return $.each(a, function(a, c) {
            b._callSetterForKey(a, c);
        }), b;
    },
    _callSetterForKey: function(a, b) {
        var c = "set" + sjl.camelCase(a, !0), d = this;
        sjl.isset(d[c]) ? d[c](b) : d._setOption(a, b);
    },
    _initAnimationTimeline: function(a, b, c) {
        var d, e, f, g, h, i, j, k = this;
        if (a = sjl.isset(a) ? a : this.getAnimationTimeline(), c = c || k.options, 
        b = b || null, d = c, sjl.isset(d.defaultAnimations) && d.defaultAnimations instanceof Array && (j = d.defaultAnimations), 
        sjl.isset(d.animations) && d.animations instanceof Array && sjl.isset(j) && (j = sjl.isset(b) ? $.extend(!0, j, d.animations) : d.animations), 
        sjl.isset(b) && sjl.isset(j)) b = $.extend(!0, j, b); else {
            if (!sjl.isset(j)) return;
            b = j;
        }
        for (e = 0; e < b.length; e += 1) f = b[e], g = k.getUiElement(f.elmAlias), 
        h = f.duration, i = f.props, sjl.isset(f.preInit) && "function" == typeof f.preInit && f.preInit.apply(this), 
        a[f.type](g, h, i), sjl.isset(f.postInit) && "function" == typeof f.postInit && f.postInit.apply(this);
    },
    _removeDisabledElements: function(a) {
        ops = sjl.isset(a) ? a : this.options, sjl.isset(ops.ui) || (ops.ui = {}), 
        ops = ops.ui, Object.keys(ops).forEach(function(a) {
            $.isPlainObject(ops[a]) && !ops.enabled && sjl.isset(ops[a].elm) && ops[a].elm.length > 0 && ops[a].elm.remove();
        });
    },
    getUiElement: function(a) {
        var b = this.options, c = null;
        return sjl.isset(b.ui[a]) && (c = b.ui[a].elm, c instanceof $ && c.length > 0) ? c : this._getElementFromOptions("ui." + a);
    },
    setCssOnUiElement: function(a, b) {
        var c = this.getUiElement(a);
        c && c.css(b);
    },
    getAnimationTimeline: function() {
        var a = this.options.timeline;
        return sjl.empty(a) && (a = this.options.timeline = new window[this.options.defaultTimelineClass]()), 
        a;
    },
    getValueFromOptions: function(a, b, c) {
        return this.getValueFromHash(a, this.options, b, c);
    },
    getValueFromHash: function(a, b, c, d) {
        c = c || null, d = d || !1;
        var e = null;
        return "string" == typeof a && $.isPlainObject(b) && (e = this._namespace(a, b), 
        "function" == typeof e && sjl.empty(d) && (e = c ? e.apply(this, c) : e.apply(this))), 
        e;
    },
    setValueOnHash: function(a, b, c) {
        this._namespace(a, c, b);
    },
    getTimelineClassName: function() {
        var a = this.options;
        return sjl.isset(a.timelineClassName) ? a.timelineClassName : a.defaultTimelineClassName;
    }
}), $.widget("jui.splitText", {
    options: {
        states: {
            unsplit: "unsplit",
            split: "split"
        },
        state: null,
        eventsPrefix: "split-text"
    },
    _splitStrToSpans: function(a) {
        for (var b, c = 0, d = ""; c < a.length; ) b = /\s/.test(a[c]) ? "&nbsp;" : a[c], 
        d += "<span>" + b + "</span>", c += 1;
        return d;
    },
    _create: function() {
        var a = this, b = a.options;
        b.state = b.state || b.states.unsplit, b.originalText = a.element.text().replace(/\s{3,}/gim, "  "), 
        a.toggleSplitText(), a.element.trigger(b.eventsPrefix + ":complete");
    },
    toggleSplitText: function(a) {
        var b = this, c = b.options;
        a = a || c.state, a === c.states.unsplit ? (c.state = c.states.split, b.element.html(b._splitStrToSpans(c.originalText))) : (c.state = c.states.unsplit, 
        b.element.text(c.originalText)), this.element.trigger(c.eventsPrefix + ":toggle", {
            states: c.states,
            state: c.state
        });
    },
    getOriginalText: function() {
        return this.options.originalText;
    }
}), $.widget("jui.juiAbstractPaginator", $.jui.juiBase, {
    options: {
        pages: {
            prev: 0,
            pointer: 0,
            next: 0,
            last: 0,
            length: 0,
            direction: 1
        },
        onGotoPageNum: null
    },
    _create: function() {
        var a = this;
        a._gotoPageNum(a.options.pages.pointer);
    },
    _nextPage: function() {
        var a = this, b = a.options;
        return b.pages.pointer_direction = 1, b.pages.pointer < b.pages.length - 1 ? b.pages.pointer += 1 : b.pages.pointer = 0, 
        a._gotoPageNum(b.pages.pointer), a.element.trigger(a.widgetName + ":nextPage", {
            pointer: b.pages.pointer
        }), a;
    },
    _prevPage: function() {
        var a = this, b = a.options;
        return b.pages.pointer > 0 ? b.pages.pointer -= 1 : b.pages.pointer = b.pages.length - 1, 
        b.pages.pointer_direction = -1, a._gotoPageNum(b.pages.pointer), a.element.trigger(a.widgetName + ":prevPage", {
            pointer: b.pages.pointer
        }), a;
    },
    _gotoPageNum: function(a) {
        var b = this, c = b.options;
        return c.pages.prev = a - 1, c.pages.next = a + 1, a > c.pages.length - 1 && (a = c.pages.length - 1), 
        0 > a && (a = 0), c.pages.pointer = a, b.getValueFromOptions("onGotoPageNum"), 
        b.element.trigger(b.widgetName + ":gotoPageNum", {
            pointer: a
        }), b;
    },
    getPointer: function() {
        return this.options.pages.pointer;
    }
}), $.widget("jui.juiAffix", $.jui.juiBase, {
    options: {
        className: "jui-affix",
        scrollableElm: $(window),
        affixVertically: !0,
        affixHorizontally: !1,
        offset: {
            top: null,
            right: null,
            bottom: null,
            left: null
        },
        realtime: !1,
        _isPositionFixedSupported: !1
    },
    _create: function() {
        var a, b = this, c = b.options, d = b.element, e = c.affixVertically, f = (c.affixHorizontally, 
        {
            position: d.css("position"),
            top: d.offset().top,
            right: d.css("right"),
            bottom: d.css("bottom"),
            left: d.offset().left
        }), g = c.scrollableElm;
        c.realtime || (a = b._getUserDefinedOffset()), d.addClass(c.className), 
        g.bind("scroll resize orientationchange load", function() {
            var h = $(this), i = h.scrollTop(), j = (h.scrollLeft(), sjl.isset(a.bottom) ? a.bottom : 0), k = sjl.isset(a.right) ? a.right : 0, l = g.height() - j - d.outerHeight();
            g.width() - k, c.realtime && (a = b._getUserDefinedOffset()), e && (sjl.isset(a.top) && (i > f.top + a.top && d.offset().top + d.outerHeight() - i + a.top < l ? d.css({
                position: "fixed",
                top: a.top,
                bottom: "auto"
            }) : i <= f.top && (d.css("position", f.position), d.css("top", f.top), 
            d.css("bottom", "auto"))), sjl.isset(a.bottom) && (f.top - l <= i ? d.css({
                position: f.position,
                top: f.top,
                bottom: f.bottom
            }) : d.css({
                position: "fixed",
                top: "auto",
                bottom: a.bottom
            })));
        }), g.scroll();
    },
    _getUserDefinedOffset: function() {
        var a = this, b = a.options, c = a.getValueFromOptions("offset");
        return $.each([ "top", "right", "bottom", "left" ], function(d, e) {
            sjl.isset(c[e]) || (b.offset[e] = a.element.attr("data-offset-" + c[e]) || null);
        }), c;
    }
}), $.widget("jui.juiBasicPaginator", $.jui.juiAbstractPaginator, {
    options: {
        template: null,
        className: "jui-basic-paginator",
        ui: {
            firstBtn: {
                elm: null,
                selector: "> .first-btn.btn",
                attribs: {
                    "class": "first-btn btn",
                    href: "#"
                },
                appendTo: "this.element",
                enabled: !0,
                html: "<a>&#124;&lt; First</a>",
                create: !0
            },
            prevBtn: {
                elm: null,
                selector: "> .prev-btn.btn",
                attribs: {
                    "class": "prev-btn btn",
                    href: "#"
                },
                appendTo: "this.element",
                enabled: !0,
                html: "<a>&lt;&lt; Prev</a>",
                create: !0
            },
            nextBtn: {
                elm: null,
                selector: "> .next-btn.btn",
                attribs: {
                    "class": "next-btn btn",
                    href: "#"
                },
                appendTo: "this.element",
                enabled: !0,
                html: "<a>Next &gt;&gt;</a>",
                create: !0
            },
            lastBtn: {
                elm: null,
                selector: "> .last-btn.btn",
                attribs: {
                    "class": "last-btn btn",
                    href: "#"
                },
                appendTo: "this.element",
                enabled: !0,
                html: "<a>Last &gt;&#124;</a>",
                create: !0
            },
            itemsContainer: {
                selector: "> .items"
            },
            items: {
                elm: null,
                selector: "> .items > .item",
                firstInRange: 0,
                lastInRange: 0,
                perPage: 0
            }
        },
        skipPagesCalculation: !1
    },
    _create: function() {
        var a = this, b = a.options;
        "string" == typeof b.className && b.className.length > 0 && a.element.addClass(b.className), 
        "string" == typeof b.template && b.template.length > 0 && a.element.append(b.template), 
        a._populateUiElementsFromOptions(b), a._addEventListeners(), sjl.empty(b.skipPagesCalculation) && a._calculateNumberOfPages(b), 
        a._super();
    },
    _addEventListeners: function() {
        var a = this, b = a.getFirstBtnElm(), c = a.getNextBtnElm(), d = a.getPrevBtnElm(), e = a.getLastBtnElm();
        sjl.isset(b) && b.length > 0 && b.on("click", function(b) {
            b.preventDefault(), a.firstPage();
        }), sjl.isset(d) && d.length > 0 && d.on("click", function(b) {
            b.preventDefault(), a.prevPage();
        }), sjl.isset(c) && c.length > 0 && c.on("click", function(b) {
            b.preventDefault(), a.nextPage();
        }), sjl.isset(e) && e.length > 0 && e.on("click", function(b) {
            b.preventDefault(), a.lastPage();
        });
    },
    _calculateNumberOfPages: function(a) {
        var b, c = a || this.options, d = this.getItemsElm();
        b = this.getValueFromHash("ui.items.perPage", c), c.pages.length = Math.ceil(d.length / b), 
        c.pages.length = 0/0 !== c.pages.length ? c.pages.length : 0, this.element.trigger(this.widgetName + ":numbersCalculated", {
            pointer: c.pages.pointer
        });
    },
    firstPage: function() {
        this._gotoPageNum(0), this.element.trigger(this.widgetName + ":firstPage");
    },
    prevPage: function() {
        this._prevPage(), this.element.trigger(this.widgetName + ":prevPage", this.options.pages);
    },
    nextPage: function() {
        this._nextPage(), this.element.trigger(this.widgetName + ":nextPage", this.options.pages);
    },
    lastPage: function() {
        this._gotoPageNum(this.options.pages.length - 1), this.element.trigger(this.widgetName + ":lastPage");
    },
    getFirstBtnElm: function() {
        return this.getUiElement("firstBtn");
    },
    getPrevBtnElm: function() {
        return this.getUiElement("prevBtn");
    },
    getNextBtnElm: function() {
        return this.getUiElement("nextBtn");
    },
    getLastBtnElm: function() {
        return this.getUiElement("lastBtn");
    },
    getItemsElm: function() {
        return this.getUiElement("items");
    }
}), function() {
    function a() {
        return sjl.argsToArray(arguments).filter(function(a) {
            return sjl.isset(a);
        });
    }
    $.widget("jui.juiDialog", $.jui.juiBase, {
        options: {
            className: "",
            animation: {
                duration: .3
            },
            status: null,
            statuses: {
                OPENED: 1,
                CLOSED: 0
            },
            ui: {
                pageOverlay: {
                    elm: null,
                    attribs: {
                        "class": "jui-page-overlay"
                    },
                    appendTo: "body",
                    selector: ".jui-page-overlay",
                    html: "<div></div>",
                    create: !0
                },
                wrapperElm: {
                    elm: null,
                    attribs: {
                        "class": "jui-dialog"
                    },
                    appendTo: "body",
                    selector: ".jui-dialog",
                    html: "<div></div>",
                    create: !0
                },
                headerElm: {
                    elm: null,
                    selector: "> header",
                    html: "<header></header>",
                    appendTo: "wrapperElm",
                    create: !0
                },
                titleElm: {
                    elm: null,
                    attribs: {
                        "class": "title"
                    },
                    text: "",
                    selector: "> .title",
                    html: "<div></div>",
                    appendTo: "headerElm",
                    create: !0
                },
                closeButtonElm: {
                    elm: null,
                    attribs: {
                        "class": "close button"
                    },
                    selector: "> .close.button",
                    html: "<div>X</div>",
                    appendTo: "headerElm",
                    create: !0
                },
                contentElm: {
                    elm: null,
                    attribs: {
                        "class": "content"
                    },
                    selector: "> .content",
                    html: "<section></section>",
                    appendTo: "wrapperElm",
                    create: !0
                },
                footerElm: {
                    elm: null,
                    selector: "> footer",
                    html: "<footer></footer>",
                    appendTo: "wrapperElm",
                    create: !0
                }
            }
        },
        _instances: [],
        _create: function() {
            var a = this, b = a.options;
            $("html").hasClass("touch") && b.disableOnTouchDevice && (b.isTouchDevice = !0), 
            a._instances.push(this), a._destroyAllInstances();
        },
        _init: function() {
            var a = this, b = a.options;
            b.timeline = new TimelineLite({
                paused: !0
            }), a._populateUiElementsFromOptions(), a._setClassNameFromOptions(), a._setTitleText(), 
            a._setContentFromThisElement(), a._addEventListeners(), a.open();
        },
        _setClassNameFromOptions: function() {
            var a = this, b = a.options, c = a.getValueFromHash("className", b), d = a.getValueFromHash("ui.wrapperElm.attribs", b)["class"];
            sjl.empty(c) || (sjl.empty(d) || "string" != typeof d ? b.ui.wrapperElm.attribs["class"] = c : b.ui.wrapperElm.attribs["class"] += " " + c), 
            a.getUiElement("wrapperElm").attr("class", b.ui.wrapperElm.attribs["class"]);
        },
        _setContentFromThisElement: function() {
            this._clearContentElmContent().html(this.element.text());
        },
        _clearContentElmContent: function() {
            return this.getUiElement("contentElm").html("");
        },
        _addEventListeners: function() {
            var a = this, b = (a.options, a.getUiElement("wrapperElm"), a.getUiElement("pageOverlay")), c = a.getUiElement("closeButtonElm");
            b.bind("click", function(b) {
                b.preventDefault(), a.close();
            }), c.bind("click", function(b) {
                b.preventDefault(), a.close();
            });
        },
        _destroy: function() {
            this._removeCreatedElements();
        },
        _destroyAllInstances: function() {
            for (var a = 0; a < this._instances.length; a += 1) this._instances[a].destroy();
        },
        _setTitleText: function(b, c) {
            c = c || "text";
            var d = this, e = d.options, f = a(b, e.titleText, e.ui.titleElm.text, d.element.attr("title"))[0];
            d.getUiElement("titleElm")[c](f);
        },
        setClassName: function(a) {
            this._namespace("titleText", a), this._setClassNameFromOptions();
        },
        setTitleText: function(a, b) {
            return this._setTitleText(a, b), this;
        },
        close: function() {
            var a = this, b = a.options;
            a.getUiElement("pageOverlay").css({
                display: "none"
            }), a.getUiElement("wrapperElm").css({
                display: "none"
            }), b.status = b.statuses.CLOSED;
        },
        open: function() {
            var a = this, b = a.options;
            a.getUiElement("pageOverlay").css({
                display: "block"
            }), a.getUiElement("wrapperElm").css({
                display: "block"
            }), b.status = b.statuses.OPENED;
        },
        destroy: function() {
            this._destroy(), this._super();
        },
        playAnimation: function() {
            var a = this, b = a.options;
            b.timeline.play();
        },
        reverseAnimation: function() {
            var a = this, b = a.options;
            b.timeline.reverse();
        }
    });
}(), $.widget("jui.juiFloatingScrollIndicators", $.jui.juiBase, {
    options: {
        className: "jui-floating-scroll-indicator",
        animation: {
            easing: Power3.easeOut,
            duration: 1
        },
        ui: {
            scrollableElm: "html, body",
            wrapperElm: {
                elm: null,
                attribs: {
                    "class": "indicator-wrapper"
                },
                appendTo: "prepend to this.element",
                selector: "> .indicator-wrapper",
                html: "<div></div>",
                create: !0
            },
            indicatorElms: {
                elm: null,
                attribs: {
                    "class": "indicator"
                },
                appendTo: "wrapperElm",
                selector: "> .indicator",
                html: "<div></div>",
                create: !1
            },
            inidicatorsNeededElms: {
                elm: null,
                selector: "h2"
            }
        }
    },
    _create: function() {
        var a = this, b = a.options;
        a.element.addClass(b.className), a._populateUiElementsFromOptions(), a._createInidicators(), 
        $(window).on("resize", function() {
            var b = a.getUiElement("inidicatorsNeededElms"), c = a.getUiElement("indicatorElms");
            b.each(function(a, b) {
                c.eq(a).css("top", $(b).offset().top);
            });
        });
    },
    _addEventListeners: function() {},
    _createInidicators: function() {
        var a, b, c = this, d = c.options, e = d.ui.inidicatorsNeededElms, f = c.getUiElement("wrapperElm"), g = c.getUiElement("scrollableElm");
        e.elm = a = $(e.selector, this.element), 0 !== a.length && (a.each(function(b, c) {
            c = $(c);
            var d = $('<div class="indicator" title="' + c.text() + '"' + 'data-index="' + b + '"></div>');
            f.append(d), $(".indicator", f).eq(b).css("top", c.offset().top), d.juiAffix({
                scrollableElm: g,
                offset: {
                    top: (b + 1) * d.height(),
                    bottom: (a.length - b) * d.height()
                }
            });
        }), b = d.ui.indicatorElms.elm = $(d.ui.indicatorElms.selector, f), b.click(function() {
            var b = $(this), c = a.eq(b.attr("data-index")), e = parseInt(c.position().top + b.height());
            TweenMax.to(g, d.animation.duration, {
                scrollTo: e
            });
        }));
    }
}), $.widget("jui.juiMouse", {
    options: {
        mouseX: null,
        mouseY: null,
        relMouseX: null,
        relMouseY: null
    },
    mouseX: function() {
        return this.options.mouseX;
    },
    mouseY: function() {
        return this.options.mouseY;
    },
    relMouseX: function() {
        return this.options.relMouseX;
    },
    relMouseY: function() {
        return this.options.relMouseY;
    },
    hitTest: function(a) {
        var b = this, c = b.getBoundingBox(a), d = b.options;
        return d.mouseX >= c.left && d.mouseX <= c.right && d.mouseY >= c.top && d.mouseY <= c.bottom;
    },
    getRelativeMouse: function(a) {
        var b = this, c = b.getBoundingBox(a), d = b.options;
        return {
            mouseX: d.mouseX - c.left,
            mouseY: d.mouseY - c.top
        };
    },
    getBoundingBox: function(a) {
        var b = a.offset();
        return b = b ? b : {
            top: 0,
            left: 0
        }, {
            top: b.top,
            right: b.left + a.outerWidth(),
            bottom: b.top + a.outerHeight(),
            left: b.left
        };
    },
    _create: function() {},
    _init: function() {
        var a = this, b = a.options;
        a.element.mousemove(function(c) {
            var d = a.getRelativeMouse(a.element);
            b.mouseX = c.clientX, b.mouseY = c.clientY, b.relMouseX = d.mouseX, b.relMouseY = d.mouseY;
        });
    }
}), $.widget("jui.juiPaginatorWithTextField", $.jui.juiBasicPaginator, {
    options: {
        template: '<a href="#" class="first-btn btn">&#124;&lt; First</a><a href="#" class="prev-btn btn">&lt; Prev</a><input type="text" size="4" class="text-field btn" /><a href="#" class="next-btn btn">Next &gt;</a><a href="#" class="last-btn btn">Last &gt;&#124;</a>',
        className: "jui-paginator-with-text-field jui-basic-paginator",
        ui: {
            items: {
                elm: null,
                selector: "> .items > .item",
                perPage: 12,
                create: !1
            },
            textField: {
                elm: null,
                selector: "> .text-field",
                enabled: !0,
                create: !1
            },
            firstBtn: {
                create: !1
            },
            prevBtn: {
                create: !1
            },
            nextBtn: {
                create: !1
            },
            lastBtn: {
                create: !1
            }
        }
    },
    _create: function() {
        var a = this;
        a.options, a.element.addClass(a.options.className), a._super();
    },
    _addEventListeners: function() {
        var a = this, b = a.options, c = a.getUiElement("textField");
        a.element.on("juiPaginatorWithTextField:gotoPageNum", function(a, b) {
            parseInt(c.val(), 10) !== parseInt(b.pointer, 10) + 1 && c.val(b.pointer + 1);
        }), a.getTextFieldElm().bind("keyup", function(c) {
            var d = ($(this), {});
            if (13 == c.keyCode) {
                var e = $(this), f = e.val();
                /\d+/.test(f) ? (f - 1 > b.pages.length ? a._gotoPageNum(b.pages.length) : 0 > f - 1 && a._gotoPageNum(0), 
                a._gotoPageNum(f - 1)) : d.messages = [ "Only numbers are allowed in the paginator textfield." ], 
                "function" == typeof b.ui.textField.callback && (d.items = b.ui.items, d.pages = b.pages, 
                b.ui.textField.callback(d));
            }
        }), a._super();
    },
    getTextFieldElm: function() {
        return this.getUiElement("textField");
    }
}), $.widget("jui.juiScalableBtn", $.jui.juiBase, {
    options: {
        duration: null,
        defaultDurationsVal: .116,
        onHoverOptions: {
            duration: null,
            props: {
                scale: 1.16,
                ease: Linear.easeNone
            }
        },
        onMousedownOptions: {
            duration: null,
            props: {
                scale: .9,
                ease: Linear.easeNone
            }
        },
        onMouseupOptions: {
            duration: null,
            props: {
                scale: 1.16,
                ease: Linear.easeNone
            }
        },
        onMouseoutOptions: {
            duration: null,
            props: {
                scale: 1,
                ease: Linear.easeNone
            }
        }
    },
    _create: function() {},
    _init: function() {
        sjl.isset(this.options._eventListenersHaveBeenAdded) || (this._addEventListeners(), 
        this.options._eventListenersHaveBeenAdded = !0);
    },
    _addEventListeners: function() {
        var a = this, b = a.options, c = a.element, d = a._getOverridingDuration() || b.defaultDurationsVal, e = b.onHoverOptions, f = b.onMousedownOptions, g = b.onMouseupOptions, h = b.onMouseoutOptions;
        c.bind("mouseover", function() {
            TweenLite.to(c, e.duration || d, e.props);
        }).bind("mousedown", function() {
            TweenLite.to(c, f.duration || d, f.props);
        }).bind("mouseup", function() {
            TweenLite.to(c, g.duration || d, g.props);
        }).bind("mouseout", function() {
            TweenLite.to(c, h.duration || d, h.props);
        });
    },
    _getOverridingDuration: function() {
        var a = this.options, b = null;
        return b = sjl.isset(a.duration) ? a.defaultDurationsVal : a.duration;
    },
    _removeEventListeners: function() {
        this.element.unbind();
    },
    _destroy: function() {
        this._removeEventListeners();
    }
}), $.widget("jui.juiScrollPane", $.jui.juiBase, {
    options: {
        scrollSpeed: function() {
            var a = 0;
            return a = 2 * (this.getUiElement("contentHolder").height() / 3 / 3), sjl.classOfIs(a, "Number") ? a : 0;
        },
        keyPressHash: {
            "37": -1,
            "38": -1,
            "39": 1,
            "40": 1
        },
        mimickBrowser: !1,
        ui: {
            contentHolder: {
                elm: null,
                selector: ">.content",
                html: "<div></div>",
                attribs: {
                    "class": "content"
                }
            },
            vertScrollbar: {
                elm: null,
                selector: "> .vertical.scrollbar",
                html: "<div></div>",
                appendTo: "this.element",
                attribs: {
                    "class": "vertical scrollbar"
                },
                create: !0
            },
            vertHandle: {
                elm: null,
                selector: "> .handle",
                html: "<div></div>",
                appendTo: "vertScrollbar",
                attribs: {
                    "class": "handle"
                },
                create: !0
            },
            horizScrollbar: {
                elm: null,
                selector: "> .horizontal.scrollbar",
                html: "<div></div>",
                appendTo: "this.element",
                attribs: {
                    "class": "horizontal scrollbar"
                },
                create: !0
            },
            horizHandle: {
                elm: null,
                selector: "> .handle",
                html: "<div></div>",
                appendTo: "horizScrollbar",
                attribs: {
                    "class": "handle"
                },
                create: !0
            }
        },
        pluginClassName: "jui-scroll-pane",
        scrollbarOriented: {
            VERTICALLY: "vertical",
            HORIZONTALLY: "horizontal"
        },
        autoHide: !1,
        originalOverflow: null,
        debug: !1
    },
    _create: function() {
        this._populateUiElementsFromOptions();
        var a = this.options, b = this.getUiElement("contentHolder"), c = this;
        "hidden" !== b.css("overflow") && (a.originalOverflow = b.css("overflow"), 
        b.css("overflow", "hidden")), c.element.addClass(a.pluginClassName), c.initScrollbars(), 
        b.bind("mousewheel", function(a, d, e, f) {
            var g, h, i = c.getValueFromOptions("mimickBrowser");
            i || (a.preventDefault(), a.stopPropagation()), d = sjl.isset(d) ? d : sjl.isset(e) ? e : f, 
            g = c.getValueFromOptions("scrollSpeed"), h = 1 > d ? g : -g, 0 !== e && 0 === f ? (c.scrollHorizontally(b.scrollLeft() + h), 
            i && 0 !== b.scrollLeft() && b.scrollLeft() !== b.get(0).scrollWidth && (a.preventDefault(), 
            a.stopPropagation())) : 0 === e && 0 !== f && (c.scrollVertically(b.scrollTop() + h), 
            i && 0 !== b.scrollTop() && b.scrollTop() !== b.get(0).scrollHeight - 1 && (a.preventDefault(), 
            a.stopPropagation()));
        }), a.mousePos = $(window).juiMouse(), $(window).bind("keydown", function(d) {
            var e, f = d.keyCode + "";
            if (a.keyPressHash.hasOwnProperty(f) && a.mousePos.juiMouse("hitTest", b)) switch (b.focus(), 
            d.preventDefault(), e = c.getValueFromOptions("scrollSpeed") * a.keyPressHash[f], 
            f) {
              case "37":
                c.scrollHorizontally(e + b.scrollLeft());
                break;

              case "38":
                c.scrollVertically(e + b.scrollTop());
                break;

              case "39":
                c.scrollHorizontally(e + b.scrollLeft());
                break;

              case "40":
                c.scrollVertically(e + b.scrollTop());
            }
        });
    },
    _scrollByOrientation: function(a, b) {
        var c, d = (this.options, this.getUiElement("contentHolder")), e = b, f = this.getScrollDirVars(e), g = f.scrollAmountTotal, h = this.getScrollbarHandleByOrientation(e), i = this.getScrollbarByOrientation(e), j = f.cssCalcDir, k = "outer" + sjl.ucaseFirst(f.scrollbarDimProp);
        d[f.scrollbarDimProp]() >= g || (g >= a && a >= 0 ? (d["scroll" + sjl.ucaseFirst(j)](a), 
        c = a / g, h.css(j, i[k]() * c)) : a > g ? h.css(j, i[k]() - h[k]()) : 0 > a && h.css(j, 0), 
        this.scrollContentHolder(e), this.constrainHandle(e));
    },
    scrollContentHolder: function(a) {
        var b = this.getScrollbarHandleByOrientation(a), c = this.getScrollbarByOrientation(a), d = this.getUiElement("contentHolder"), e = this.getScrollDirVars(a), f = e.scrollAmountTotal, g = e.cssCalcDir, h = e.scrollbarDimProp, i = b.position()[g] / c[h](), j = i * f, k = "scroll" + sjl.ucaseFirst(g);
        j >= 0 && f >= j ? d[k](i * f) : 0 > j ? d[k](0) : j > f && d[k](f);
    },
    constrainHandle: function(a) {
        var b = this.getScrollbarHandleByOrientation(a), c = this.getScrollbarByOrientation(a), d = this.getScrollDirVars(a), e = d.scrollbarDimProp, f = d.cssCalcDir;
        b.position()[f] < 0 ? b.css(f, 0) : b.position()[f] + b[e]() > c[e]() && b.css(f, c[e]() - b[e]());
    },
    initScrollbars: function() {
        var a = this, b = a.options, c = a.getUiElement("contentHolder"), d = c.get(0).scrollWidth, e = c.get(0).scrollHeight;
        e > c.height() ? a.initScrollbar(b.scrollbarOriented.VERTICALLY) : a.getUiElement("vertScrollbar").css("display", "none"), 
        d > c.width() ? a.initScrollbar(b.scrollbarOriented.HORIZONTALLY) : a.getUiElement("horizScrollbar").css("display", "none");
    },
    initScrollbar: function(a) {
        var b = this, c = b.getScrollbarByOrientation(a), d = b.getScrollbarHandleByOrientation(a), e = b.getUiElement("contentHolder"), f = b, g = f.getScrollDirVars(a), h = g.dragAxis, i = g.cssCalcDir, j = g.scrollbarDimProp;
        f.initScrollbarHandle(a), d = d.draggable({
            containment: "parent",
            cursor: "s-resize",
            axis: h,
            drag: function(a, b) {
                var d = b.position[i] / c[j]();
                e["scroll" + sjl.ucaseFirst(i)](d * g.scrollAmountTotal);
            }
        }), c.bind("click", function(b) {
            b.stopPropagation(), d.css(i, b["offset" + h.toUpperCase()] - d[j]() / 2), 
            f.constrainHandle(a), f.scrollContentHolder(a);
        }), b.saveDraggableHandleForLater(d, a);
    },
    initScrollbarHandle: function(a) {
        var b = this.getUiElement("contentHolder"), c = this.getScrollbarByOrientation(a), d = this.getScrollbarHandleByOrientation(a), e = this.getScrollDirVars(a), f = e.scrollbarDimProp, g = b[f](), h = b.get(0)["scroll" + sjl.ucaseFirst(f)], i = c[f]();
        d[f](g * i / h);
    },
    getScrollDirVars: function(a) {
        var b, c = this, d = (c.options, this.getUiElement("contentHolder"));
        return b = a === c.options.scrollbarOriented.VERTICALLY ? {
            dragAxis: "y",
            cssCalcDir: "top",
            scrollbarDimProp: "height",
            scrollAmountTotal: d.get(0).scrollHeight
        } : {
            dragAxis: "x",
            cssCalcDir: "left",
            scrollbarDimProp: "width",
            scrollAmountTotal: d.get(0).scrollWidth
        };
    },
    getScrollbarByOrientation: function(a) {
        var b = this.options;
        return a === b.scrollbarOriented.VERTICALLY ? this.getUiElement("vertScrollbar") : this.getUiElement("horizScrollbar");
    },
    getScrollbarHandleByOrientation: function(a) {
        var b = this.options;
        return a === b.scrollbarOriented.VERTICALLY ? this.getUiElement("vertHandle") : this.getUiElement("horizHandle");
    },
    scrollVertically: function(a) {
        this._scrollByOrientation(a, this.options.scrollbarOriented.VERTICALLY);
    },
    scrollHorizontally: function(a) {
        this._scrollByOrientation(a, this.options.scrollbarOriented.HORIZONTALLY);
    },
    saveDraggableHandleForLater: function(a, b) {
        var c = this, d = c.options;
        b === d.scrollbarOriented.VERTICALLY ? d.draggableVertHandle = a : d.draggableHorizHandle = a;
    },
    refresh: function() {
        var a = this, b = a.options, c = b.draggableVertHandle, d = b.draggableHorizHandle;
        !sjl.empty(c) && c instanceof $ && c.draggable("destroy"), !sjl.empty(d) && d instanceof $ && d.draggable("destroy"), 
        a.initScrollbars();
    },
    _destroy: function() {
        var a = this, b = a.options;
        a.element.attr("overflow", b.originalOverflow), $(window).unbind("keydown"), 
        a._removeCreatedElements(), a.element.removeClass(b.pluginClassName), a.getUiElement("contentHolder").unbind("mousewheel").scrollLeft(0).scrollTop(0), 
        this._super();
    }
}), $.widget("jui.juiScrollableDropDown", $.jui.juiBase, {
    options: {
        className: "jui-scrollable-drop-down",
        ui: {
            contentElm: {
                elm: null,
                selector: "> .content"
            }
        },
        defaultAnimations: [ {
            type: "from",
            duration: .3,
            elmAlias: "contentElm",
            props: {
                css: {
                    height: 0,
                    autoAlpha: 0
                }
            }
        }, {
            type: "to",
            duration: .3,
            elmAlias: "scrollbar",
            props: {
                css: {
                    autoAlpha: 1
                },
                delay: -.1
            }
        } ],
        expandOn: "click",
        expandOnClassNamePrefix: "expands-on",
        expandClassName: "expanded",
        collapseOn: "click",
        collapseOnClassNamePrefix: "collapses-on",
        collapseClassName: "collapsed",
        states: {
            COLLAPSED: "collapsed",
            EXPANDED: "expanded"
        },
        state: null
    },
    _create: function() {
        var a, b = this, c = b.options;
        if (b._super(), b.element.addClass(c.className).addClass(b._getExpandOnClassName()).addClass(b._getCollapseOnClassName()).addClass("collapsed"), 
        b._populateUiElementsFromOptions(), a = b.getUiElement("contentElm"), c.isLessThanIE9 && a.css("display", "block"), 
        b._namespace("ui.contentElm.originalCss", c, {
            display: a.css("display"),
            visibility: a.css("visibility")
        }), !c.isTouchDevice && !c.isLessThanIE9) try {
            a.css("visibility", "hidden"), b.timeline = new TimelineLite({
                onReverseComplete: b.executeTimelineCompleteFunc,
                onComplete: b.executeTimelineCompleteFunc
            });
        } catch (d) {
            throw new Error('Could not create a new "' + c.defaultTimelineClass + '"' + "when trying to create a timeline object.");
        }
    },
    _init: function() {
        var a = this.options;
        this._addEventListeners(), a.state = a.state || a.states.COLLAPSED, this.ensureAnimationFunctionality(), 
        a.isTouchDevice || (a.state === a.states.COLLAPSED ? this.reverseAnimation() : a.playAnimation());
    },
    _getExpandOnClassName: function() {
        var a = this.options;
        return a.expandOnClassNamePrefix + a.expandOn;
    },
    _getExpandOnEventStringName: function() {
        return this.options.expandOn;
    },
    _getCollapseOnClassName: function() {
        var a = this.options;
        return a.collapseOnClassNamePrefix + a.collapseOn;
    },
    _getCollapseOnEventStringName: function() {
        return this.options.collapseOn;
    },
    _addEventListeners: function() {
        var a = this, b = a.options.states, c = a.options, d = a._getCollapseOnEventStringName(), e = a._getExpandOnEventStringName();
        e === d ? a.element.on(e, function(d) {
            a.options.state === b.COLLAPSED ? (a.ensureAnimationFunctionality(), a.options.state = b.EXPANDED, 
            a.element.removeClass(c.collapseClassName), a.element.addClass(c.expandClassName), 
            a.element.trigger("expand", d), a.playAnimation()) : (a.ensureAnimationFunctionality(), 
            a.options.state = b.COLLAPSED, a.element.removeClass(c.expandClassName), 
            a.element.addClass(c.collapseClassName), a.element.trigger("collapse", d), 
            a.reverseAnimation());
        }) : a.element.on(e, function(d) {
            a.ensureAnimationFunctionality(), a.options.state = b.EXPANDED, a.element.removeClass(c.collapseClassName), 
            a.element.addClass(c.expandClassName), a.element.trigger("expand", d), a.playAnimation();
        }).on(d, function(d) {
            a.ensureAnimationFunctionality(), a.options.state = b.COLLAPSED, a.element.removeClass(c.expandClassName), 
            a.element.addClass(c.collapseClassName), a.element.trigger("collapse", d), 
            a.reverseAnimation();
        }), c.mousePos = $(window).juiMouse(), $(window).on("click", function(d) {
            $.contains(a.element.get(0), d.target) === !1 && 1 === c.timeline.progress() && a.options.state === b.EXPANDED && (a.ensureAnimationFunctionality(), 
            a.options.state = b.COLLAPSED, a.element.removeClass(c.expandClassName), 
            a.element.addClass(c.collapseClassName), a.element.trigger("collapse", d), 
            a.reverseAnimation());
        });
    },
    _removeEventListeners: function() {
        this.element.off(this._getCollapseOnEventStringName()).off(this._getExpandOnEventStringName());
    },
    _initScrollbar: function() {
        var a = this.options, b = this._namespace("ui.scrollbar");
        !sjl.empty(b.elm) && b.elm.length > 0 || (a.juiScrollPaneElm = this.element.juiScrollPane({
            ui: {
                contentHolder: {
                    elm: this.getUiElement("contentElm"),
                    selector: a.ui.contentElm.selector + ""
                }
            }
        }), b.elm = $(".scrollbar", this.element));
    },
    initAnimationTimeline: function() {
        this._initAnimationTimeline();
    },
    _initTimeline: function() {
        sjl.empty(this.options.timeline) && this.initAnimationTimeline();
    },
    executeTimelineCompleteFunc: function() {
        var a = this, b = a.options, c = a.getUiElement("contentElm");
        b.state === b.states.COLLAPSED ? c.css("display", "none") : b.state === b.states.EXPANDED && c.css("display", b.ui.contentElm.originalCss.display);
    },
    ensureAnimationFunctionality: function() {
        this._initScrollbar(), this.options.isLessThanIE9 || this._initTimeline();
    },
    playAnimation: function() {
        var a = this, b = a.options;
        if (!b.disableOnTouchDevice || !b.isTouchDevice) return b.isLessThanIE9 ? (a.executeTimelineCompleteFunc(), 
        void 0) : (b.timeline.play(), void 0);
    },
    reverseAnimation: function() {
        var a = this, b = a.options;
        if (!b.disableOnTouchDevice || !b.isTouchDevice) return b.isLessThanIE9 ? (a.executeTimelineCompleteFunc(), 
        void 0) : (b.timeline.reverse(), void 0);
    },
    destroy: function() {
        this._removeCreatedElements(), this._removeEventListeners(), this._super();
    },
    refresh: function() {
        this._removeEventListeners(), this._addEventListeners(), this.options.juiScrollPaneElm.refresh();
    },
    getState: function() {
        return this.options.state;
    }
}), $.widget("jui.juiSelectPicker", $.jui.juiBase, {
    options: {
        className: "jui-select-picker",
        animation: {
            duration: .3
        },
        labelText: "",
        selectedLabelPrefix: "",
        selectedLabelSuffix: "",
        useSelectedLabelPrefixAndSuffix: !1,
        skipFirstOptionItem: !1,
        selectedValue: null,
        valueAttribName: "value",
        labelAttribName: null,
        ui: {
            wrapperElm: {
                elm: null,
                attribs: {
                    "class": "jui-select-picker"
                },
                appendTo: "after this.element",
                selector: ".jui-select-picker",
                html: "<div></div>",
                create: !0,
                timeline: new TimelineLite(),
                suggestedExpandHeight: null
            },
            buttonElm: {
                elm: null,
                attribs: {
                    "class": "button"
                },
                selector: "> .button",
                html: "<div></div>",
                appendTo: "wrapperElm",
                create: !0
            },
            buttonArrowElm: {
                elm: null,
                attribs: {
                    "class": "arrow"
                },
                selector: "> .arrow",
                html: "<div></div>",
                appendTo: "buttonElm",
                create: !0
            },
            labelElm: {
                elm: null,
                attribs: {
                    "class": "label"
                },
                text: "",
                selector: "> .label",
                html: "<span></span>",
                appendTo: "buttonElm",
                create: !0
            },
            selectedItemLabelElm: {
                elm: null,
                attribs: {
                    "class": "selected-item-label selected"
                },
                prefixText: "You've chosen \"",
                suffixText: '"',
                selector: "> .selected-item-label",
                html: "<span></span>",
                appendTo: "buttonElm",
                create: !0
            },
            bodyElm: {
                elm: null,
                attribs: {
                    "class": "body"
                },
                selector: "> .body",
                html: "<div></div>",
                appendTo: "wrapperElm",
                create: !0
            },
            optionsElm: {
                elm: null,
                attribs: {
                    "class": "options"
                },
                selector: ".options",
                html: "<div></div>",
                appendTo: "bodyElm",
                create: !0,
                optionSelectedClassName: "selected",
                suggestedExpandHeight: null
            }
        }
    },
    _create: function() {
        this._super();
    },
    _init: function() {
        var a = this, b = this.options, c = a.getValueFromHash("className", b), d = a.getValueFromHash("ui.wrapperElm.attribs", b)["class"];
        b.disableOnTouchDevice && b.isTouchDevice || (sjl.empty(c) || (sjl.empty(d) || "string" != typeof d ? b.ui.wrapperElm.attribs["class"] = c : b.ui.wrapperElm.attribs["class"] += " " + c), 
        this.options.timeline = new TimelineLite({
            paused: !0
        }), this.element.attr("hidden", "hidden").css("display", "none"), this._populateUiElementsFromOptions(), 
        this.setLabelText(), this._drawSelectOptions(), this._initScrollableDropDown(), 
        this._addEventListeners());
    },
    _drawSelectOptions: function() {
        var a = this, b = a.getUiElement("optionsElm"), c = a.element.find("option"), d = $("<ul></ul>"), e = a.options;
        c.each(function(b, f) {
            if (f = $(f), 0 !== b || !e.skipFirstOptionItem) {
                var g = a.getValueFromOptionElm(f), h = a.getLabelFromOptionElm(f), i = f.attr("class"), j = "";
                sjl.isset(e.selectedValue) && e.selectedValue === g && (sjl.empty(j) ? j = e.ui.optionsElm.optionSelectedClassName : (j.length > 0 && (j += " "), 
                j += e.ui.optionsElm.optionSelectedClassName), j = ' class="' + j + '"'), 
                i = sjl.empty(i) ? "" : 'class="' + i + '" ', g = ' data-value="' + g + '" ';
                var k = $("<li" + j + "><a " + i + 'href="javascript: void(0);"' + g + ">" + h + "</a></li>");
                0 !== b || sjl.empty(e.ui.buttonElm.text) ? 1 === b && sjl.empty(e.ui.buttonElm.text) && k.addClass("first") : k.addClass("first"), 
                b === c.length - 1 && k.addClass("last"), d.append(k);
            }
        }), b.append(d), c = $("li", b), e.ui.optionsElm.suggestedExpandHeight = c.eq(0).height() * c.length;
    },
    _addEventListeners: function() {
        var a = this, b = this.options, c = a.getUiElement("wrapperElm");
        c.on("mouseup", "a[data-value]", function() {
            var b = c.juiScrollableDropDown("getState").indexOf("collapsed") > -1 ? !0 : !1;
            b ? a.playAnimation() : a.reverseAnimation();
        }), c.on("click", "a[data-value]", function(c) {
            var d = $(c.currentTarget);
            a.clearSelected(), a.setSelected(d), b.timeline.reverse();
        });
    },
    _removeCreatedOptions: function() {
        this.getUiElement("optionsElm").find("ul").remove();
    },
    _initScrollableDropDown: function() {
        var a, b, c, d, e, f, g = this, h = g.options, i = g.getUiElement("wrapperElm"), j = g.getUiElement("optionsElm"), k = h.animation.duration;
        if (d = {
            state: "collapsed",
            ui: {
                contentElm: {
                    elm: this.getUiElement("optionsElm"),
                    attribs: h.ui.optionsElm.attribs,
                    selector: h.ui.optionsElm.selector + ""
                }
            }
        }, sjl.isset(h.expandOn) && (d.expandOn = h.expandOn), sjl.isset(h.collapseOn) && (d.collapseOn = h.collapseOn), 
        c = i.juiScrollableDropDown(d), !h.isLessThanIE9) for (b = c.juiScrollableDropDown("getAnimationTimeline"), 
        b.seek(0), b.clear(), b.pause(), a = $(".vertical.scrollbar", i), f = [ TweenLite.to(i, k, {
            height: g.getSuggestedWrapperExpandHeight()
        }), TweenLite.to(j, k, {
            height: g.getSuggestedContentExpandHeight(),
            autoAlpha: 1,
            delay: -.3
        }), TweenLite.to(a, k, {
            opacity: 1,
            delay: -.2
        }) ], e = 0; e < f.length; e += 1) b.add(f[e]);
    },
    destroy: function() {
        this.element.removeAttr("hidden"), this._removeCreatedOptions(), this._super();
    },
    refreshOptions: function() {
        this.options.selectedValue = this.getSelectedOwnOptionElmValue(), this._removeCreatedOptions(), 
        this._drawSelectOptions(), this.setLabelText(), this.refreshScrollbar();
    },
    refreshScrollbar: function() {
        this.getUiElement("wrapperElm").juiScrollPane("refresh");
    },
    getSuggestedWrapperExpandHeight: function() {
        var a, b = this, c = b.options, d = b.getUiElement("wrapperElm"), e = null, f = b.getMaxHeightFromElm(d);
        return c.ui.optionsElm.suggestedExpandHeight && (a = b.getWrapperElmPaddingBottom(), 
        e = b.getSuggestedContentExpandHeight() + (-1 >= a ? 0 : a) + b.getUiElement("buttonElm").height()), 
        e = sjl.isset(e) ? e > f ? f : e : f;
    },
    getSuggestedContentExpandHeight: function() {
        var a = this, b = a.getUiElement("optionsElm"), c = a.getMaxHeightFromElm(b), d = a.options.ui.optionsElm.suggestedExpandHeight;
        return d = sjl.isset(d) ? d > c ? c : d : c;
    },
    getWrapperElmPaddingBottom: function() {
        var a = this, b = a.getUiElement("buttonElm"), c = a.getUiElement("wrapperElm"), d = a.getUiElement("optionsElm"), e = a.getMaxHeightFromElm(d), f = a.getMaxHeightFromElm(c), g = f - b.height() - (d.height() || e || 0);
        return g;
    },
    getMaxHeightFromElm: function(a) {
        var b = a.css("max-height");
        return sjl.classOfIs(b, "String") ? parseInt(b) : b;
    },
    setSelectedItemLabelText: function(a, b, c) {
        var d, e, f = this.options, g = f.ui.selectedItemLabelElm, h = this.getUiElement("selectedItemLabelElm").eq(0);
        a = a || "", b = b || "text", c = sjl.isset(c) ? c : f.useSelectedLabelPrefixAndSuffix, 
        c && (d = f.selectedLabelPrefix || g.prefixText || "", e = f.selectedLabelSuffix || g.suffixText || "", 
        a = d + a + e), TweenMax.to(h, .16, {
            autoAlpha: 0,
            onCompleteParams: [ a, b, h ],
            onComplete: function() {
                var a = arguments, b = a[0], c = a[1], d = a[2];
                d[c](b), TweenMax.to(d, .16, {
                    autoAlpha: 1
                });
            }
        });
    },
    setLabelText: function(a, b) {
        b = b || "text", a = a || (sjl.empty(this.options.ui.buttonElm.text) ? sjl.empty(this.options.labelText) ? this.element.find("option").eq(0).text() : this.options.labelText : this.options.ui.buttonElm.text), 
        this.getUiElement("labelElm").eq(0)[b](a);
    },
    setSelected: function(a) {
        0 !== a.length && (a.parent().addClass(this.options.ui.optionsElm.optionSelectedClassName), 
        this.options.selectedValue = a.attr("data-value"), this.element.val(a.attr("data-value")).trigger("change"), 
        this.setSelectedItemLabelText(this.options.selectedValue));
    },
    clearSelected: function() {
        this.getUiElement("optionsElm").find("> ul > li").removeClass(this.options.ui.optionsElm.optionSelectedClassName), 
        this.options.selectedValue = null;
    },
    playAnimation: function() {
        var a = this, b = a.options;
        b.disableOnTouchDevice && b.isTouchDevice || b.isLessThanIE9 || b.timeline.play();
    },
    reverseAnimation: function() {
        var a = this, b = a.options;
        b.disableOnTouchDevice && b.isTouchDevice || b.isLessThanIE9 || b.timeline.reverse();
    },
    getOwnOptionElmByValue: function(a) {
        this.getUiElement("optionsElm").find('[data-value="' + a + '"]');
    },
    getSelectedOwnOptionElmValue: function() {
        return this.getUiElement("optionsElm").find("." + this.options.ui.optionsElm.optionSelectedClassName).find("a").attr("data-value");
    },
    getValueFromOptionElm: function(a) {
        var b, c = this.options;
        return sjl.empty(a) ? null : (sjl.isset(c.valueAttribName) && (b = a.attr(c.valueAttribName)), 
        sjl.isset(b) ? b : a.text());
    },
    getLabelFromOptionElm: function(a) {
        var b, c = this.options;
        return sjl.empty(a) ? null : (sjl.isset(c.labelAttribName) && (b = a.attr(c.labelAttribName)), 
        sjl.isset(b) ? b : a.text());
    }
});