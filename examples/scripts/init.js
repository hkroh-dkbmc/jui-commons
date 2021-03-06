require.config({

    deps: ['sjl', 'backbone.marionette', 'jquery', 'TweenMax', 'hbs', 'main' ],

    shim: {
        'gsap-scrollto-plugin': {
            deps: ['TweenMax']
        },
        'TweenMax': {
            deps: ['jquery']
        },
        'backbone.marionette': {
            deps: ['backbone', 'underscore']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'jquery-mousewheel': {
            deps: ['jquery', 'jquery-ui']
        },
        'jui-commons': {
            deps: ['jquery', 'jquery-ui']
        },
        'hbs': {
            deps: ['handlebars']
        }
    },

    paths: {
        backbone:               '../bower_components/backbone-amd/backbone',
        'backbone.babysitter':  '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.marionette':  '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr':       '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'sjl':                  '../bower_components/sjljs/sjl',

        'gsap-scrollto-plugin': '../bower_components/greensock/src/uncompressed/plugins/ScrollToPlugin',
        'jui-commons':          '../../distro/js/jui-commons',

        'jquery':               '../bower_components/jquery/jquery',
        'jquery-mousewheel':    '../bower_components/jquery-mousewheel/jquery.mousewheel',
        'jquery-ui':            '../bower_components/jquery-ui/ui/minified/jquery-ui.min',

        handlebars:     '../bower_components/handlebars/handlebars.amd',
        hbs:            '../bower_components/require-handlebars-plugin/hbs',
        text:           '../bower_components/requirejs-text/text',
        tmpl:           '../templates',
        TweenMax:       '../bower_components/greensock/src/uncompressed/TweenMax',
        underscore:     '../bower_components/underscore-amd/underscore'
    },
    hbs: { // optional
        helpers: false,           // default: true
        i18n: false,              // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: ''           // default: ''
    }
});
