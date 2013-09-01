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

    var _config = grunt.option('config')

    if (_config) {
      Joycss.configUser(done)
      return
    }

    var upload = grunt.option('upload')
    var nochange = grunt.option('nochange')

    var options = this.options({
      alpha: false,
      layout: 'auto', // auto | close | vertical | horizontal
      nochange: false,
      upload: false
    })

    var config = {global: {}}

    config.global.layout = options.layout

    if (options.alpha) {
      config.global.force8bit = false
    }

    if (options.upload || upload) {
      config.global.uploadImgs = true
    }

    if (options.nochange || nochange) {
      config.global.nochange = true
    }

    var index = 0

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
          var ext = path.extname(file)
          Joycss.Mult.add([f, config, null, dest])
        }

      })

    })

    Joycss.Mult.run()

    Joycss.Event.on('mult:end', function(){
      done()
    })

  })

}
