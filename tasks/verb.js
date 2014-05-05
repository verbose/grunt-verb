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
var _ = require('lodash');
var pkg = require('../package');

verb.runner = {
  name: pkg.name,
  url: pkg.homepage
};

module.exports = function(grunt) {
  grunt.registerMultiTask('verb', 'Grunt plugin for Verb, a markdown documentation generator with zero-configuration required.', function() {

    var options = this.options({
      sep: '\n',
      ext: '.md',
      data: ['docs/*.{json,yml}'],
      prefixBase: true,
      cwd: process.cwd(),
      destBase: process.cwd(),
      docs: 'docs'
    });

    verb.options = _.extend(verb.options || {}, options);

    this.files.forEach(function(fp) {
      var src = grunt.file.expand(fp.src).map(function(filepath) {

        // Warn if a source file/pattern was invalid.
        if (!grunt.file.exists(filepath)) {
          grunt.log.error('Source file "' + filepath + '" not found.');
          return '';
        }

        verb.options.src = filepath;
        verb.verbose.inform('reading', verb.options.src);

        return grunt.file.read(verb.options.src);
      }).join(options.sep);

      // Process source templates with Verb
      var page = verb.process(src);

      // Pass the dest to verb options
      verb.options.dest = verb.cwd(options.destBase, fp.dest);

      // Extend the context
      var context = _.extend({}, verb.options, options, {
        data: options.data
      }, page.context);

      // Write the destination file.
      grunt.file.write(context.dest, page.content);

      // Print a success message.
      verb.verbose.inform('writing', context.dest);
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
        files: [
          {src: ['.verbrc.md'], dest: 'README.md'},
          {expand: true, cwd: 'docs', src: ['**/*.tmpl.md'], dest: '.', ext: '.md'},
        ]
      }
    });
  }
};
