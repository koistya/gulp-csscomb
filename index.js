/*!
 * gulp-csscomb | https://github.com/koistya/gulp-csscomb
 *
 * Copyright (c) Konstantin Tarkus (@koistya). See LICENSE.txt
 */

'use strict';

var Comb = require('csscomb');
var fs = require('fs');
var gutil = require('gulp-util');
var path = require('path');
var through = require('through2');
var PluginError = gutil.PluginError;

// Constants
var PLUGIN_NAME = 'gulp-csscomb';

// Plugin level function (dealing with files)
function Plugin(config, log) {

    // Create a stream through which each file will pass
    var stream = through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            // Do nothing
        } else if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        } else if (file.isBuffer() &&
            ['.css', '.scss', '.less'].indexOf(path.extname(file.path)) !== -1) {

            var configFile;

            log && gutil.log(PLUGIN_NAME, 'Processing ' + gutil.colors.magenta(file.path));

            if ((typeof config === 'undefined' &&
                (fs.existsSync(configFile = (path.join(path.dirname(file.path), '.csscomb.json'))) ||
                    fs.existsSync(configFile = (path.join(process.cwd(), '.csscomb.json'))))) ||
                (typeof config === 'string' && config.indexOf('.') !== -1 && fs.existsSync(configFile = (config)))) {

                // Load configuration from the file
                try {
                    config = require(configFile);
                } catch (err) {
                    this.emit('error', new PluginError(PLUGIN_NAME,
                        'Failed to load configuration from ' + configFile + '. ' + err.message));
                    return cb();
                }

                log && gutil.log(PLUGIN_NAME, 'Using configuration file ' + gutil.colors.magenta(configFile));
            }

            var comb = new Comb(config || 'csscomb');
            var syntax = file.path.split('.').pop();
            
            try {
                var output = comb.processString(file.contents.toString('utf8'), syntax, file.path);
                file.contents = new Buffer(output);
            } catch (err) {
                this.emit('error', new PluginError(PLUGIN_NAME, err));
            }
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);
        // tell the stream engine that we are done with this file
        return cb();
    });

    // Return the file stream
    return stream;
}

// Export the plugin main function
module.exports = Plugin;