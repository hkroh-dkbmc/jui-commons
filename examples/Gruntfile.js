module.exports = function (grunt) {
    grunt.initConfig({

        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        cssmin: {
            './distro/css/examples.min.css': './distro/css/examples.css'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                './scripts/**/*.js'
            ]
        },

        requirejs: {
            distro: {
                options: {
                    baseUrl: './scripts',
                    optimize: 'none',
                    no_mangle: true,
                    out: './distro/js/examples.js',
                    name: 'init',
                    mainConfigFile: './scripts/init.js',
                    stubModules: ['text', 'hbs'],
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },
        watch: {
            compass: {
                files: [
                    './sass/**/*',
                    '../src/sass/**/*'
                ],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            },
            cssmin: {
                files: [
                    './distro/css/*',
                    '../distro/css/*'
                ],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                    './bower_components/**/*',
                    './scripts/**/*',
                    '../distro/js/*',
                    './templates/**/*'],
                tasks: ['requirejs'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'compass',
        'cssmin',
        'requirejs',
        'watch'
    ]);

    grunt.registerTask('develop', [
        'compass',
        'cssmin',
        'requirejs',
        'watch'
    ]);

};
