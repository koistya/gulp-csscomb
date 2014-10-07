/*!
 * gulp-csscomb | https://github.com/koistya/gulp-csscomb
 * Copyright (c) Konstantin Tarkus (@koistya). See LICENSE.txt
 */

/* global it */

'use strict';

var assert = require('assert');
var gutil  = require('gulp-util');
var csscomb = require('./index');

var cssinput = 'h1 { color: yellow; } \n h1 { font-size: 2em; }';
var cssoutput = 'h1{color:#ff0;font-size:2em}';

it('should format CSS coding style', function (cb) {

  var stream = csscomb();

  stream.on('data', function(data) {
    assert.equal(String(data.contents), cssoutput);
  });

  stream.on('end', cb);

  stream.write(new gutil.File({contents: new Buffer(cssinput)}));
});
