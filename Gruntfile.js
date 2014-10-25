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

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/build/*'],
    },

    // Configuration to be run (and then tested).
    joycss: {
      index: {
        //紧凑拼图
        options: { layout: 'close' },
        files: [{
          expand: true,
          cwd: 'test/less/',
          src: ['index.css'],
          dest: 'test/build/home/'
        }]
      },

      detail: {
        //水平布局
        options: { layout: 'horizontal' },
        cwd: 'test/less/',
        src: ['detials.less'],
        dest: 'test/build/details/'
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['joycss']);

};
