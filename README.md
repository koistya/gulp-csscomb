# gulp-csscomb

> Format CSS coding style with [CSScomb](https://npmjs.org/package/csscomb).

*If you have any difficulties with the output of this plugin, please use the
[CSScomb tracker](https://github.com/csscomb/csscomb.js/issues).*

## Installation

Install via [npm](https://npmjs.org/package/gulp-csscomb):

```
npm install gulp-csscomb --save-dev
```

## Example 1

```javascript
var gulp = require('gulp');
var csscomb = require('gulp-csscomb');

gulp.task('styles', function () {
    return gulp.src('src/styles/main.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./build/css'));
});
```

## Example 2

```javascript
var gulp = require('gulp');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');

gulp.task('styles', function () {
    return gulp.src('src/styles/bootstrap.less')
        .pipe(less({strictMath: true}))
        .pipe(prefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24', // Firefox 24 is the latest ESR
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6']))
        .pipe(csscomb())
        .pipe(gulp.dest('./build/css'));
});
```

## Example 3 (linting)

```js
var gulp = require('gulp');
var csscomb = require('gulp-csscomb');

gulp.task('lint', function() {
    return gulp.src(['/css/*.css'])
        .pipe(csscomb({ lint: true }));
});
```

## Options

Usage: `csscomb([{String} config] [{Object} options])`

* [{String}] `config` path to config
* [{Object}] `options` options object
* [{String}] `options.config` path to config
* [{Boolean}] `options.lint` linting
* [{Boolean}] `options.verbose` verbose

**Deprecated** will be removed in next major release:
* [{String}] `config` optional path to `.csscomb.json`
* [{Boolean}] `verbose` optional verbose mode

If there is `.csscomb.json` file present in the same folder as the source file(s),
or in the project root folder, `gulp-csscomb` will read config settings from it
instead of default config.

You can also specify a pre-defined configuration. Ex.: `csscomb('zen')`

## License

The MIT License (MIT) © Konstantin Tarkus ([@koistya](https://twitter.com/koistya))
