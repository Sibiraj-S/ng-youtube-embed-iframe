'use strict'

banner = '/*!\n * @module <%= pkg.name %>\n' +
  ' * @description <%= pkg.description %>\n' +
  ' * @version v<%= pkg.version %>\n' +
  ' * @link <%= pkg.homepage %>\n' +
  ' * @licence MIT License, https://opensource.org/licenses/MIT\n' +
  ' */\n\n';

module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffeelint:
      options:
        configFile: 'coffeelint.json'
      source: ['src/ng-youtube.coffee']

    coffee:
      compileJoined:
        options:
          join: true
        files:
          'dist/ng-youtube.js': ['src/ng-youtube.coffee']

    concat:
      options:
        stripBanners: true
        banner: banner
      dist:
        files:
          'dist/ng-youtube.js': ['dist/ng-youtube.js']

    uglify:
      options:
        sourceMap: true
        output:
          comments: '/^!/'
      target:
        files:
          'dist/ng-youtube.min.js': ['dist/ng-youtube.js']

    ngAnnotate:
      options:
        singleQuotes: true
      ngYoutube:
        files:
          'dist/ng-youtube.js': ['dist/ng-youtube.js']

    connect:
      server:
        options:
          base: './'
          keepalive: true

      watch:
        files: ['src/*.coffee']
        tasks: ['default']


  # Grunt task(s).
  grunt.registerTask "default", ["coffeelint", "coffee"]
  grunt.registerTask "webserver", ["connect"]
  grunt.registerTask "develop", ["default", "watch"]
  grunt.registerTask "dist", ["default", "ngAnnotate", "concat", "uglify"]

  return
