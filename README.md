# gulp-csscomb

> Format CSS with [CSScomb](https://npmjs.org/package/csscomb).

*If you have any difficulties with the output of this plugin, please use the
[CSScomb tracker](https://github.com/csscomb/csscomb.js/issues).*

## Installation

Install via [npm](https://npmjs.org/package/gulp-csscomb):

```
npm install gulp-csscomb --save-dev
```

## Example

```javascript
var gulp    = require('gulp'),
    csscomb = require('gulp-csscomb');

gulp.task('default', function() {
    return gulp.src('./main.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./out'));
});
```

## License

The MIT License (MIT) © 2014 Konstantin Tarkus ([@koistya](https://twitter.com/koistya))