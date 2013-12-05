/**
 * Created by edelacruz on 11/15/13.
 */
// @todo refactor to use the position offset instead of offset.
// @todo create alternate indicator creation method (list of selectors?)
$.widget('jui.juiFloatingScrollIndicators', $.jui.juiBase, {
    options: {
        'class': 'jui-floating-scroll-indicator',
        animation: {
            easing: Power3.easeOut,
            duration: 1
        },
        ui: {
            scrollableElm: {
                elm: $('body')
            },
            wrapperElm: {
                elm: null,
                attribs: {
                    'class': 'indicator-wrapper'
                },
                append: false,
                prepend: true,
                appendTo: 'this.element',
                selector: '> .indicator-wrapper',
                html: '<div></div>',
                create: true
            },
            indicatorElms: {
                elm: null,
                attribs: {
                    'class': 'indicator'
                },
                appendTo: 'wrapperElm',
                selector: '> .indicator',
                html: '<div></div>',
                create: false
            },
            inidicatorsNeededElms: {
                elm: null,
                selector: 'h2'
            }
        }
    },

    _create: function () {
        var self = this,
            ops = self.options;

        // Add class name to this element
        self.element.addClass(ops['class']);

        // Populate initial ui elements
        self._populateUiElementsFromOptions();
        self._createInidicators();
        self.getUiElement('scrollableElm').on('debouncedresize', function (e) {
            var wrapper = self.getUiElement('wrapperElm'),
                indElms = ops.ui.inidicatorsNeededElms.elm,
                inds = $('.indicator', wrapper);
            indElms.each(function (index, elm) {
                elm = $(elm);
                inds.eq(index).css('top', elm.offset().top);
            });
        });
    },

    _createInidicators: function () {
        var self = this,
            ops = self.options,
            createOps = ops.ui.inidicatorsNeededElms,
            wrapper = self.getUiElement('wrapperElm'),
            scrollableElm = self.getUiElement('scrollableElm'),
            indNeededElm,
            indElms;

        // By Selector
        // -------------------------------------------------------
        // -------------------------------------------------------
        // Get elements that need a floating scroll indicator
        createOps.elm =
            indNeededElm = $(createOps.selector, this.element);

        // If no elements need floating scroll indicators, bail
        if (indNeededElm.length === 0) {
            return;
        }

        // Add indicators
        indNeededElm.each(function (index, elm) {
            elm = $(elm);
            var nuIndElm = $('<div ' +
                'class="indicator" ' +
                'title="' + elm.text() + '"' +
                'data-index="' + index + '"></div>');
            wrapper.append(nuIndElm);
            $('.indicator', wrapper).eq(index)
                    .css('top', elm.offset().top);
            nuIndElm.juiAffix({
                offset: {
                    top: (index + 1) * nuIndElm.height(),
                    bottom: -((indNeededElm.length - index)
                        * nuIndElm.height())
                }
            });
        });

        // Get indicators
        indElms = ops.ui.indicatorElms.elm =
            $(ops.ui.indicatorElms.selector, wrapper);

        // Add click listener to indicator
        indElms.click(function (e) {
            var elm = $(this),
            toElm = indNeededElm.eq(elm.attr('data-index')),
                val = parseInt(toElm.offset().top);
            console.log(scrollableElm, val, ops.animation);
            TweenMax.to(scrollableElm, ops.animation.duration,
                {scrollTo: val});
        });
    }

});