var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var shell = require('gulp-shell');

// the paths to our app files
var paths = {
  scripts: ['client/www/app/**/*.js'],
  html: ['client/www/app/**/*.html'],
  test: ['client/www/test/**/*.js'],
  sass: ['client/scss/**/*.scss']
};

// compile sass
gulp.task('sass', function(done) {
  gulp.src('./client/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./client/www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./client/www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// FIXME: what should be included in the install task.  Is this even necessary if compiling to native ios
/*gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});*/

gulp.task('karma', shell.task([
  'karma start'
]));

gulp.task('default', ['sass']);
