var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
    
var srcPath = 'js';
var dstPath = 'dist';

gulp.task('default', function () {

    var app = gulp.src([
        srcPath + '/*.js'
    ]).pipe(concat('app.js'));
    
    app.pipe(gulp.dest(dstPath));
});