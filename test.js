/*!
 * gulp-csscomb | https://github.com/koistya/gulp-csscomb
 * Copyright (c) Konstantin Tarkus (@koistya). See LICENSE.txt
 */

/* global describe, it */

'use strict';

var assert = require('assert');
var gutil  = require('gulp-util');
var csscomb = require('./index');

var cssinput = 'h1 { color: yellow; } \n h1 { font-size: 2em; }';
var cssoutput = 'h1\n{\n    color: yellow;\n}\nh1\n{\n    font-size: 2em;\n}\n';

describe('gulp-csscomb', function() {
  it('should format CSS coding style', function (cb) {

    var stream = csscomb();

    stream.once('data', function(file) {

      // make sure it came out the same way it went in
      assert(file.isStream);

      // check the contents
      assert.equal(String(file.contents), cssoutput);

      cb();
    });

    stream.write(new gutil.File({
      path: 'style.css',
      contents: new Buffer(cssinput)
    }));
  });
});
