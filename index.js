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
                var syntax = file.path.split('.').pop();
                var output = csscomb.processString(String(buffer), syntax);
                cb(null, new Buffer(output));
            }));
            stream.push(file);
            done();
        } else {
            var syntax = file.path.split('.').pop();
            var output = csscomb.processString(String(file.contents), syntax);
            file.contents = new Buffer(output);
            stream.push(file);
            done();
        }
    };

    return stream;
};