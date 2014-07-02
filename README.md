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
var gulp = require('gulp');
var csscomb = require('gulp-csscomb');

gulp.task('default', function () {
    return gulp.src('./src/styles/main.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./build/css'));
});
```

If there is `.csscomb.json` file present in the same folder with the source .css file,
`csscomb` will read configuration data from it.

## License

The MIT License (MIT) © 2014 Konstantin Tarkus ([@koistya](https://twitter.com/koistya))