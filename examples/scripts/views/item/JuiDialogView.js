define([
	'backbone',
	'hbs!tmpl/item/jui-dialog-view',
    'TweenMax',
    'jui-commons'
],
function( Backbone, tmpl ) {

    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

    	template: tmpl,

        ui: {
            content1: '.dialog-content-1',
            content2: '.dialog-content-2'
        },

        onShow: function () {
            var self = this,

                btn =  $('.toggle-example-1-state');

            btn.click(function () {
                self.ui.content1.juiDialog({
                    className: 'my-dialog',
                    titleText: 'Title set via javascript'
                });
            });

            btn.juiScalableBtn();
        }
	});

});
