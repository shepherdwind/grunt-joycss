/*
 * grunt-joycss
 * https://github.com/shepherdwind/grunt-joycss
 *
 * Copyright (c) 2013 shepherdwind
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var Joycss = require('joycss');
  Joycss.Log.debug = grunt.log.debug;
  Joycss.Log.error = grunt.log.error;
  Joycss.Log.success = grunt.log.ok;
  var cwd = process.cwd();

  grunt.registerMultiTask('joycss', 'Auto css sprite merge', function() {

    var done = this.async();

    var _config = grunt.option('config');

    if (_config) {
      Joycss.configUser(done);
      return;
    }

    var upload = grunt.option('upload');
    var nochange = grunt.option('nochange');

    var options = this.options({
      alpha: false,
      layout: 'auto', // auto | close | vertical | horizontal
      nochange: false,
      upload: false
    });

    var config = {global: {}};

    config.global.layout = options.layout;

    if (options.alpha) {
      config.global.force8bit = false;
    }

    if (options.upload || upload) {
      config.global.uploadImgs = true;
    }

    if (options.nochange || nochange) {
      config.global.nochange = true;
    }

    var index = 0;

    this.files.forEach(function(files) {

      files.src.forEach(function(file){

        var f = path.resolve(cwd, file);

        if (!grunt.file.exists(f)) {
          grunt.log.error('file ' + file + ' not exists');
          done(false);
        } else {
          index ++;
          grunt.log.writeln('Start run joycss ' + file);
          Joycss.Mult.add([f, config]);
        }

      });

    });

    Joycss.Mult.run();

    Joycss.Event.on('mult:end', function(){
      done();
    });

  });

};
