/*
 * grunt-verb
 * https://github.com/jonschlinkert/grunt-verb
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var verb = require('verb');
var pkg = require('../package');

verb.runner = {
  name: pkg.name,
  url: pkg.homepage
};

module.exports = function(grunt) {
  grunt.registerMultiTask('verb', 'Grunt plugin for Verb, a markdown documentation generator with zero-configuration required.', function() {

    var options = this.options({sep: '\n'});

    this.files.forEach(function(fp) {
      var files = grunt.file.expand({nonull: true}, fp.src);

      var src = files.map(function(filepath) {
        // Warn if a source file/pattern was invalid.
        if (!grunt.file.exists(filepath)) {
          grunt.log.error('Source file "' + filepath + '" not found.');
          return '';
        }

        return grunt.file.read(filepath);
      }).join(options.sep);

      // Process source with Verb
      src = verb.process(src, options).content;

      // Write the destination file.
      grunt.file.write(fp.dest, src);

      // Print a success message.
      grunt.verbose.writeln('File "' + fp.dest + '" created.');
    });
  });


  /**
   * If there isn't a target configured
   * for 'verb', use this one.
   */

  if (!grunt.config('verb')) {
    grunt.config('verb', {
      readme: {
        options: {
          verbrc: '.verb*',
          data: ['docs/*.json']
        },
        files: [
          {expand: true, cwd: 'docs', src: ['**/*.tmpl.md'], dest: '.', ext: '.md'}
        ]
      }
    });
  }
};
