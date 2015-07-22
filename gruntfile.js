/*global module:false*/

/**
 * Javascript Project Boilerplate
 * Version 0.1.0
 */
module.exports = function (grunt) {
    "use strict";
    var pkg, config;

    pkg = grunt.file.readJSON('package.json');

    config = {
        sources: [
            'src/*.js'
        ],
        sass: ['sass/'],
        pkg: pkg,
        uglifyFiles: {}
    };

    // setup dynamic filenames
    config.versioned = [config.pkg.name, config.pkg.version].join('-');
    config.dist = ['dist/', '.js'].join(config.versioned);
    config.uglifyFiles[['dist/', '.min.js'].join(config.versioned)] = config.dist;

    // Project configuration.
    grunt.initConfig({
        pkg: config.pkg,
        lint: {
            files: ['gruntfile.js', 'test/*.js', 'src/*']
        },
        clean: {
            dist: ['dist/']
        },
        concat: {
            dist: {
                src: config.sources,
                dest: config.dist
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            dist: {
                files: config.uglifyFiles
            }
        },
        jasmine: {
            tests: {
                src: ['dist/', '.min.js'].join(config.versioned),
                options: {
                    specs: 'test/spec/*.spec.js',
                    template: 'test/grunt.tmpl'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: 'jshint.json'
            },
            source: config.dist
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'dist/style/',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'jshint', 'uglify', 'sass']);
};