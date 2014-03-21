/**
 * Verb <https://github.com/assemble/verb>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Custom mixins
module.exports = function(options, params) {
  options = options || {};
  options.customProp = options.customProp || '';

  exports.customMixin = function(src, opts) {
    return src + ' worked!';
  };

  exports.customProp = function() {
    return options.customProp;
  };

  exports.concat = function(a, b) {
    return a + b;
  };

  exports.lowercase = function(src) {
    return src.toLowerCase();
  };

  return exports;
};