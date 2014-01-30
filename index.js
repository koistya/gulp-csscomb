/* jshint node:true */

'use strict';

var CssComb       = require('csscomb'),
    csscomb       = new CssComb(),
    gutil         = require('gulp-util'),
    transform     = require('stream').Transform,
    bufferstreams = require('bufferstreams'),

    PLAGIN_NAME   = 'gulp-csscomb';

module.exports = function () {

    var stream = new transform({ objectMode: true });

    stream._transform = function(file, unused, done) {
        // Pass through if null
        if (file.isNull()) {
            stream.push(file);
            done();
            return;
        }

        if (file.isStream()) {
            file.contents = file.contents.pipe(new bufferstreams(function (err, buffer, cb) {
                if (err) {
                    cb(gutil.PluginError(PLAGIN_NAME, err));
                }
                var output = csscomb.processString(String(buffer));
                cb(null, new Buffer(output));
            }));
            stream.push(file);
            done();
        } else {
            var css = String(file.contents);
            gutil.log(css);
            var output = csscomb.processString(css);
            file.contents = new Buffer(output);
            stream.push(file);
            done();
        }
    };

    return stream;
};