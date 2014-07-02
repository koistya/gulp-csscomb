/* jshint node: true */
/* global describe, it */

'use strict';

var gutil  = require('gulp-util');
var csscomb = require('./index');

var css = 'h1 { color: yellow; } \n h1 { font-size: 2em; }';
var cssoutput = 'h1{color:#ff0;font-size:2em}';

describe('gulp-csscomb', function () {
    it('should format CSS coding style', function (cb) {
        var stream = csscomb();

        stream.on('data', function(data) {
            expect(String(data.contents)).to.equal(cssoutput);
            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer(css)
        }));
    });
});