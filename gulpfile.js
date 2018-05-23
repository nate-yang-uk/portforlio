var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
//Enable Gulp to spin up a server 
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './public'
    },
  })
});

gulp.task('vendorStyles',function(){
	return gulp.src([ './node_modules/bootstrap/dist/css/bootstrap.css'])
	.pipe(concatCss('vendor.css'))
    .pipe(gulp.dest('./public/css/'));
});



gulp.task('styles', function(){
return gulp.src([
      './public/css/vendor.css',
      './public/scss/main.scss'
    ])
 .pipe(concat('main.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(cssnano())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
	});

gulp.task('vendorScripts', function(){
	return gulp.src([ './node_modules/jquery/dist/jquery.js'])
	.pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('scripts', function(){
  return gulp.src([
      './public/js/vendor.js',
      './public/js/main.js'
    ])
  .pipe(concat('main.package.js'))
  .pipe(gulp.dest('./public/js/'))
  .pipe(browserSync.stream());
});

//Assure browserSync is completed before other tasks
gulp.task('default', ['browserSync', 'vendorStyles', 'styles', 'vendorScripts', 'scripts'], function(){
  gulp.watch('./public/scss/**/*.scss', ['styles']); 
   gulp.watch('./public/js/**/*.js', ['scripts']); 
   gulp.watch('./public/*.html', browserSync.reload); 
  gulp.watch('./public/js/**/*.js', browserSync.reload);

});
