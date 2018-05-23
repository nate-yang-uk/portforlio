var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
//Enable Gulp to spin up a server 
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());

});
//Assure browserSync is completed before other tasks
gulp.task('default', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
   gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);

})