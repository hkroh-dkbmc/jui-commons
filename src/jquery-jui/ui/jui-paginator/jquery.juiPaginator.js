/**
 * Created with JetBrains WebStorm.
 * User: ElyDeLaCruz
 * Date: 9/1/13
 * Time: 12:49 AM
 * @description Base paginator class for pagination classes.  This plugin is meant to be extended not
 * used on it's own!
 * @triggers 'paginator:gotoPageNum', {pointer: Number}
 */

$.widget('jui.paginator', $.jui.juiBase, {
    options: {
        items: {
            elm: null,
            selector: '> .items > .item',
            firstInRange: 0,
            lastInRange: 0,
            perPage: 0
        },
        pages: {
            prev: 0,
            pointer: 0,
            next: 0,
            last: 0,
            length: 0,
            direction: 1
        },
        eventsPrefix: 'jui.paginator',
        onGotoPageNum: null,
        debug_output: '',
        debug: true
    },

    /**
     * Goes to page 1 which fires jquery-jui-paginator:gotoPageNum event.
     * @type Function
     */
    _create: function () {
        this._gotoPageNum(this.options.pages.pointer);
    },

    _nextPage: function () {
        var ops = this.options;

        // Set direction to next
        ops.pages.pointer_direction = 1;

        if (ops.pages.pointer < ops.pages.length - 1) {
            ops.pages.pointer += 1;
        }
        else {
            ops.pages.pointer = 0;
        }

        // Goto Page src number
        this._gotoPageNum(ops.pages.pointer);
    },

    _prevPage: function () {
        var ops = this.options;
        if (ops.pages.pointer > 0) {
            ops.pages.pointer -= 1;
        }
        else {
            ops.pages.pointer = ops.pages.length - 1;
        }

        // Set direction to previous
        ops.pages.pointer_direction = -1;

        // Goto Page src number
        this._gotoPageNum(ops.pages.pointer);
    },

    _gotoPageNum: function (num) {
        var ops = this.options;
        // Set prev and next
        ops.pages.prev = num - 1;

        ops.pages.next = num + 1;

        // Set pointer
        ops.pages.pointer = num;

        // Trigger
        this.element.trigger(ops.eventsPrefix + ':gotoPageNum', {pointer: num});

        // If callback is set
        if (ops.onGotoPageNum !== null && typeof ops.onGotoPageNum === 'function') {
            ops.onGotoPageNum.call(this, {pointer: num});
        }
    },

    _calculateNumberOfPages: function () {
        var ops = this.options,
            items = this.getItems(),
            itemsPerPage;

        // If items per page is a function
        itemsPerPage = typeof ops.items.perPage === 'function' ?
            itemsPerPage = ops.items.perPage.apply(this) : ops.items.PerPage;

        // Pages length
        ops.pages.length = Math.ceil(items.length / itemsPerPage);
        ops.pages.length = ops.pages.length !== NaN ? ops.pages.length : 0;
    },

    getItems: function () {
        return this._getElementFromOptions('items');
    },

    getItemsContainer: function () {
        return this._getElementFromOptions('itemsContainer');
    },

    getPointer: function () {
        return this.options.pages.pointer;
    }

});