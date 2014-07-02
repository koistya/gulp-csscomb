/* jshint node:true */

'use strict';

var Comb = require('csscomb');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var transform = require('stream').Transform;
var bufferstreams = require('bufferstreams');

var PLAGIN_NAME   = 'gulp-csscomb';

module.exports = function () {
    var stream = new transform({ objectMode: true });

    stream._transform = function(file, unused, done) {
        // Pass through if null
        if (file.isNull()) {
            stream.push(file);
            done();
            return;
        }

        var configFile;
        var config = file.path && fs.existsSync(configFile = (path.dirname(file.path) + '/.csscomb.json')) ?
            require(configFile) : 'csscomb';
        var comb = new Comb(config);

        if (file.isStream()) {
            file.contents = file.contents.pipe(new bufferstreams(function (err, buffer, cb) {
                if (err) {
                    cb(gutil.PluginError(PLAGIN_NAME, err));
                }
                var syntax = file.path.split('.').pop();
                var output = comb.processString(String(buffer), syntax);
                cb(null, new Buffer(output));
            }));
            stream.push(file);
            done();
        } else {
            var syntax = file.path.split('.').pop();
            var output = comb.processString(String(file.contents), syntax);
            file.contents = new Buffer(output);
            stream.push(file);
            done();
        }
    };

    return stream;
};