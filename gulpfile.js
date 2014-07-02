/* jshint node:true */

'use strict';

var gulp  = require('gulp');
var gutil = require('gulp-util');
var clear = require('clear');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');

gulp.task('lint', function () {
    gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
   gulp.src('*Spec.js')
       .pipe(jasmine());
});

gulp.task('watch', function() {
    gulp.watch('*.js', ['lint', 'test'], function (event) {
        clear();
        gutil.log(gutil.colors.cyan(event.path.replace(process.cwd(), '')) + ' ' + event.type + '. (' + gutil.colors.magenta(gutil.date('HH:MM:ss')) + ')');
    });
});

gulp.task('default', ['lint', 'test', 'watch']);