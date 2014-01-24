/**
 * Created by edelacruz on 11/19/13.
 */
$.widget('jui.juiAffix', $.jui.juiBase, {
    options: {
        className: 'jui-affix',
        scrollableElm: $(window),
        affixVertically: true,
        affixHorizontally: false,
        offset: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        _isPositionFixedSupported: false
    },
    _create: function () {

        var self = this,
            ops = self.options,
            elm = self.element,
            affixVertically = ops.affixVertically,
            affixHorizontally = ops.affixHorizontally,

        // @todo put the t r b l into an offset object
            original = {
                position: elm.css('position'),
                top: elm.position().top,
                right: elm.css('right'),
                bottom: elm.css('bottom'),
                left: elm.position().left
            },
            scrollableElm = ops.scrollableElm,
            affixOffset = {
                top: self.getValueFromOptions('offset.top'),
                right: self.getValueFromOptions('offset.right'),
                bottom: self.getValueFromOptions('offset.bottom'),
                left: self.getValueFromOptions('offset.left')
            };

        console.log("affix offsets", affixOffset, "original positions", original);

        // Add plugin class
        elm.addClass(ops.className);

        // On scrollable elm scroll
        scrollableElm.bind('scroll resize orientationchange load', function (e) {
            var oElm = $(this),
                scrollTop = oElm.scrollTop(),
                scrollLeft = oElm.scrollLeft(),
                bottomLimit = scrollableElm.height() - affixOffset.bottom - elm.height(),
                rightLimit = scrollableElm.width() + affixOffset.right;

            if (affixVertically) {
                if (scrollTop > original.top - affixOffset.top &&
                    elm.position().top - scrollTop < bottomLimit) {
                    elm.css({
                        position: 'fixed',
                        top: affixOffset.top,
                        bottom: 'auto'
                    });
                }
                else if (scrollTop <= original.top) {
                    elm.css('position', original.position);
                    elm.css('top', original.top);
                    elm.css('bottom', 'auto');
                }

                if (original.top - scrollTop >= bottomLimit) {
                    elm.css({
                        position: 'fixed',
                        top: 'auto',
                        bottom: affixOffset.bottom
                    });
                }
            }
//
//            if (affixHorizontally) {
//                if (scrollLeft > original.left - affixOffset.left &&
//                    elm.offset().left - scrollLeft < rightLimit) {
//                    elm.css({
//                        position: 'fixed',
//                        left: affixOffset.left,
//                        right: 'auto'
//                    });
//                }
//                else if (scrollLeft <= original.left) {
//                    elm.css('position', original.position);
//                    elm.css('left', original.left);
//                    elm.css('right', 'auto');
//                }
//
//                if (original.left - scrollLeft >= rightLimit) {
//                    elm.css({
//                        position: 'fixed',
//                        left: 'auto',
//                        right: -affixOffset.right
//                    });
//                }
//            }
        });

        scrollableElm.scroll();
    }

});