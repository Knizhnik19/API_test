'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let pipeline = require('readable-stream').pipeline;
let sass = require('gulp-sass');

gulp.task('compress', function () {
    return pipeline(
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('dist')
    );
});

sass.compiler = require('node-sass');
gulp.task('sass', function () {
    return gulp.src('src/style/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});