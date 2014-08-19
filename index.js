'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var fs = require('fs');
var Comb = require('csscomb');
var _ = require('lodash');

module.exports = function () {
    var out = [];
    var options = handleOptions(getArgs.apply(null, arguments));

    log = log.bind(null, options.verbose);

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-csscomb', 'Streaming not supported!'));
            return cb();
        }

        if (invalidExtension(file)) {
            this.push(file);
            return cb();
        }

        log('Processing ' + gutil.colors.magenta(file.path));

        var comb = new Comb(getConfig(options.config, file, cb) || 'csscomb');

        try {
            var processed = comb.processString(file.contents.toString('utf8'), { filename: file.path });

            if (options.lint) {
                if (processed !== file.contents.toString('utf8')) {
                    out.push('! ' + file.path);
                }
                this.push(file);
                return cb();
            }

            file.contents = new Buffer(processed);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-csscomb', err));
        }

        this.push(file);
        return cb();
    }, function(cb) {
        if (options.lint && out.length > 0) {
            this.emit('error', new gutil.PluginError('gulp-csscomb', [
                gutil.colors.red('\nCSScomb linting failed for these files:'),
                out.join('\n')
            ].join('\n')));
        }
        cb();
    });
};

function log(verbose, string) {
    if (verbose) {
        gutil.log('gulp-csscomb', string);
    }
}

function invalidExtension(file) {
    var validExtensions = ['.css', '.sass', '.scss', '.less'];
    var fileExtension = path.extname(file.path);

    return validExtensions.indexOf(fileExtension) === -1;
}

function getConfig(config, file, cb) {
    var configFile;

    if ((typeof config === 'undefined' &&
        (fs.existsSync(configFile = (path.join(path.dirname(file.path), '.csscomb.json'))) ||
            fs.existsSync(configFile = (path.join(process.cwd(), '.csscomb.json'))))) ||
        (typeof config === 'string' && config.indexOf('.') !== -1 && fs.existsSync(configFile = (config)))) {

        try {
            config = require(configFile);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-csscomb', 'Failed to load configuration from ' + configFile + '. ' + err.message));
            return cb();
        }

        log('Using configuration file ' + gutil.colors.magenta(configFile));
    }

    return config;
}

/**
 * Parse options
 *
 * @param {Array} args — raw arguments
 *
 * @return {Object} options object with `config` and `verbose` properties
 */
function handleOptions(args) {
    var options = { config: undefined, verbose: false, lint: false };

    if (_.isString(args[0])) {
        options.config = args[0];

        if (_.isBoolean(args[1])) {
            /**
             * @NOTE Backward compatibility
             * @TODO should be removed with first major release
             */
            options.verbose = args[1];
        }

        return _.extend({}, options, args[1]);
    }

    return _.extend({}, options, args[0]);
}

/**
 * Helper to prevent leaking arguments
 *
 * @usage getArgs.apply(null, arguments)
 * @link https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
 *
 * @return {Array} Normalised arguments array
 */
function getArgs() {
    var args = new Array(arguments.length);
    for(var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
    }
    return args;
}
