/*
 * grunt-joycss
 * https://github.com/shepherdwind/grunt-joycss
 *
 * Copyright (c) 2013 shepherdwind
 * Licensed under the MIT license.
 */

'use strict'

module.exports = function(grunt) {

  var path = require('path')
  var Joycss = require('joycss')
  Joycss.Log.debug = grunt.log.debug
  Joycss.Log.error = grunt.log.error
  Joycss.Log.success = grunt.log.ok
  var cwd = process.cwd()

  grunt.registerMultiTask('joycss', 'Auto css sprite merge', function() {

    var data = this.data

    var _cwd = cwd
    if (data.cwd) _cwd = path.join(cwd, data.cwd)

    var done = this.async()

    var options = this.options({
      force8bit: true,
      save: true,
      layout: 'auto' // auto | close | vertical | horizontal
    })

    var index = 0
    var tasks = [];

    this.files.forEach(function(files) {

      files.src.forEach(function(file){

        var f = path.resolve(_cwd, file)
        var extname = path.extname(f)
        var len = extname.length

        var dest = path.join(process.cwd(), files.dest)

        if (!files.orig.expand) {
          dest = path.normalize(dest + '/' + file)
        }

        dest = dest.slice(0, - len) + '.css'

        if (!grunt.file.exists(f)) {
          grunt.log.error('file ' + file + ' not exists')
          done(false)
        } else {
          index ++
          grunt.log.writeln('Start run joycss ' + file)
          options.destCss = dest
          tasks.push(new Joycss(f, options))
        }

      })

    })

    runTask(tasks, done);

  })

}

function runTask(tasks, done){
  var task = tasks.shift();
  if (!task) {
    done();
    return;
  }
  task.run(function(err){
    if (err) {
      grunt.log.error(err);
      return done(false);
    }
    runTask(tasks, done);
  });
}

