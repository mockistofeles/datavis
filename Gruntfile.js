module.exports = function(grunt) {

    var vendorjs = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/d3/d3.min.js',
        'bower_components/materialize/dist/js/materialize.min.js',
        'bower_components/material-preloader/js/materialPreloader.min.js'
    ];

    var vendorcss = [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/materialize/dist/css/materialize.min.css',
        'bower_components/material-preloader/css/materialPreloader.min.css'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            scripts: ['<%= concat.dist.dest %>', 'static/datavis/js/<%= pkg.name %>.min.js'],
            styles: ['static/datavis/css/*.css', 'static/datavis/fonts/*'],
            img: ['static/datavis/img/*']
        },

        copy: {
            vendorjs: {
                files: [{
                    expand: true,
                    src: vendorjs,
                    dest: 'static/datavis/js/',
                    flatten: true,
                    filter: 'isFile'
                }]
            },
            vendorcss: {
                files: [{
                    expand: true,
                    src: vendorcss,
                    dest: 'static/datavis/css/',
                    flatten: true,
                    filter: 'isFile'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/',
                    src: 'fonts/{,*/}*.*',
                    dest: 'static/datavis/'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: 'resources/',
                    src: 'img/{,*/}*.*',
                    dest: 'static/datavis/'
                }]
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                process: function(src) {
                      return src.replace(/#!/, "// ");
                }
            },
            dist: {
                src: ['resources/js/**/*.js'],
                dest: 'resources/<%= pkg.name %>.js'
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

        less: {
            dist: {
                options: {
                    compress: 'true'
                },
                files: {
                    'static/datavis/css/style.css': 'resources/less/**/*.less'
                }
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'static/datavis/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'static/datavis/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            scripts: {
                files: 'resources/js/**/*.js',
                tasks: ['clean:scripts', 'copy:vendorjs', 'concat', 'uglify']
            },
            styles: {
                files: 'resources/less/**/*.less',
                tasks: ['clean:styles', 'copy:vendorcss', 'copy:fonts', 'less', 'cssmin']
            },
            img: {
                files: 'resources/img/**/*',
                tasks: ['clean:img']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify', 'less', 'cssmin', 'watch']);

};
