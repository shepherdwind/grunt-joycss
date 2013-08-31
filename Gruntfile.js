/**
 * grunt-joycss
 * https://github.com/shepherdwind/grunt-joycss
 *
 * Copyright (c) 2013 shepherdwind
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/less/*.joy', 'test/build/*.css'],
    },

    // Configuration to be run (and then tested).
    joycss: {
      index: {
        //紧凑拼图
        options: { layout: 'close' },
        cwd: 'test/less/',
        src: ['index.css'],
        dest: 'test/build/'
      },

      detail: {
        //水平布局
        options: { layout: 'horizontal' },
        cwd: 'test/less/',
        src: ['detials.less'],
        dest: 'test/build/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'joycss']);

};
