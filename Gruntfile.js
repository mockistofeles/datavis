// Wrapper function
module.exports = function(grunt) {

    var vendorjs = [
        'resources/src/vendor/jquery/dist/jquery.js',
        'resources/src/vendor/bootstrap/dist/js/bootstrap.min.js',
        'resources/src/vendor/angular/angular.min.js',
        'resources/src/vendor/angular-ui-router/release/angular-ui-router.min.js',
        'resources/src/vendor/d3/d3.min.js',
        'resources/src/vendor/materialize/dist/js/materialize.min.js',
        'resources/src/vendor/material-preloader/js/materialPreloader.min.js'
    ];
/*
    var modulejs = [
        'resources/src/vendor/soda-js/lib/soda-js.bundle.js',
        'resources/src/vendor/soda-js/lib/soda-js.js',
        'resources/src/js/module.js'
    ];
*/
    var cssfiles = [
        '<%= yeoman.dist %>/css/output.css',
        '<%= yeoman.app %>/vendor/bootstrap/dist/css/bootstrap.min.css',
        '<%= yeoman.app %>/vendor/font-awesome/css/font-awesome.min.css',
        '<%= yeoman.app %>/vendor/materialize/dist/css/materialize.min.css',
        '<%= yeoman.app %>/vendor/material-preloader/css/materialPreloader.min.css'
    ];

    var appConfig = {
        app: 'resources/src',
        dist: 'resources/dist'
    };

    // Project configuration
    grunt.initConfig({
        // Load package.json properties onto pkg
        pkg: grunt.file.readJSON('package.json'),

        yeoman: appConfig,

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/js/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*',
                        'static/datavis/js/*'
                    ]
                }]
            },
            styles: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/css/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*',
                        'static/datavis/css/*'
                    ]
                }]
            }
        },

        // jshint: {
        //    // Define the files to hint
        //     files: ['Gruntfile.js', 'resources/src/js/**/*js']
        // },

        // qunit: {
        //    files: ['test/**/+.html']
        // },

        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                process: function(src) {
                      return src.replace(/#!/, "// ");
                }
            },
            dist: {
                // The files to concatenate
                src: ['<%= yeoman.app %>/js/**/*.js'/*, '!<%= yeoman.app %>/js/module.js'*/],
                // Location of the resulting file
                dest: '<%= yeoman.dist %>/js/<%= pkg.name %>.js'
            },
            vendor: {
                src: vendorjs,
                dest: 'static/datavis/js/vendor.js'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'static/datavis/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
/*
        browserify: {
            js: {
                src: ['<%= yeoman.dist %>/js/<%= pkg.name %>.min.js'],
                dest: 'static/datavis/js/<%= pkg.name %>.js'
            }
        },
*/
        copy: {
            dist: {
                files: [{
//                    expand: true,
//                    dot: true,
//                    cwd: '<%= yeoman.app %>',
//                    dest: '<%= yeoman.dist %>',
//                    dest: 'static/datavis/fonts',
//                    src: [
//                        '*.{ico,png,txt}',
//                        '*.html',
//                        'images/{,*/}*.{webp}',
//                        'vendor/bootstrap/fonts/{,*/}*.*'
//                    ]
//                    src: [
//                        '<%= yeoman.dist %>/js/*'
//                    ]
//                }, {
//                    expand: true,
//                    cwd: '.tmp/images',
//                    dest: '<%= yeoman.dist %>/images',
//                    src: ['generated/*']
//                }, {
                    expand: true,
                    cwd: '<%= yeoman.app %>/vendor/bootstrap/',
                    src: 'fonts/{,*/}*.*',
                    dest: 'static/datavis'
                }]
//            },
//            styles: {
//                expand: true,
//                cwd: '<%= yeoman.app %>/styles',
//                dest: '.tmp/styles/',
//                src: '{,*/}*.css'
            }
        },

        less: {
            dist: {
                options: {
                    compress: 'true'
                },
                files: {
                    '<%= yeoman.dist %>/css/output.css': '<%= yeoman.app %>/less/**/*.less'
                }
            }
        },

        cssmin: {
            concat: {
                files: {
                    '<%= yeoman.dist %>/css/<%= pkg.name %>.css': cssfiles
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/css',
                    src: ['*.css', '!*.min.css', '!output.css'],
                    dest: 'static/datavis/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            scripts: {
                files: '<%= yeoman.app %>/js/**/*.js',
                tasks: ['clean:dist','concat','uglify'],
                options: {
                    livereload: true
                }
            },
            less: {
                files: '<%= yeoman.app %>/less/**/*.less',
                tasks: ['clean:styles','less','cssmin'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load plugin and tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Custom tasks
    // This would be run by typing "grunt test" on the command line
    // grunt.registerTask('test', ['jshint', 'qunit']);

    // The default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', [
        // 'jshint',
        // 'qunit',
        'clean:dist',
        'concat',
        'uglify',
        // 'browserify',
        'copy:dist',
        'less',
        'cssmin'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        // 'wiredep',
        // 'useminPrepare',
        // 'concurrent:dist',
        // 'postcss',
        // 'ngtemplates',
        'concat',
        'uglify',
        // 'browserify',
        // 'ngAnnotate',
        'copy:dist',
        // 'cdnify',
        'less',
        'cssmin'
        // 'uglify',
        // 'filerev',
        // 'usemin',
        // 'htmlmin'
    ]);

};