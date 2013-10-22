require.config({

    

    /* starting point for application */
    deps: ['es5-shim','es5-sham','phpjs','backbone.marionette','jquery','main'],

    shim: {
        jquery: {
            exports: 'jquery'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: 'jquery-ui'
        },
        'jquery-mousewheel': {
            deps: ['jquery', 'jquery-ui']
        },
        'jui-commons': {
            deps: ['jquery', 'jquery-ui']
        },
        'juiBase': {
            deps: ['jquery', 'jquery-ui']
        },
        'juiScrollPane': {
            deps: ['juiBase']
        },
        'juiScrollableDropDown': {
            deps: ['juiBase']
        },
        'juiSelectPicker': {
            deps: ['juiBase']
        }
    },

    paths: {
        'es5-shim':             '../bower_components/es5-shim/es5-shim',
        'es5-sham':             '../bower_components/es5-shim/es5-sham',
        'phpjs':                '../bower_components/phpjs/phpjs-shim',
        'TweenMax':             '../bower_components/gsap/src/minified/TweenMax.min',
        'jui-commons':          '../../distro/jui-commons.min',
        'juiBase':              '../../src/js/jquery.juiBase',
        'juiScrollPane':        '../../src/js/ui/jquery.juiScrollPane',
        'juiSelectPicker':      '../../src/js/ui/jquery.juiSelectPicker',
        'juiScrollableDropDown':'../../src/js/ui/jquery.juiScrollableDropDown',

        'jquery':       '../bower_components/jquery/jquery',
        'jquery-ui':    '../bower_components/jquery-ui/ui/minified/jquery-ui.min',
        'jquery-mousewheel':    '../bower_components/jquery-mousewheel/jquery.mousewheel',

        backbone:   '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',

        'backbone.marionette':  '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr':       '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter':  '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        bootstrap: 'vendor/bootstrap',

        text: '../bower_components/requirejs-text/text',
        tmpl: "../templates",

        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2:          '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs:            '../bower_components/require-handlebars-plugin/hbs'

    },

    hbs: {
        disableI18n: true
    }
});