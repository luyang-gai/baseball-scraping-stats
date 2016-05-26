var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  exec = require('gulp-exec'),
  shell = require('gulp-shell'),
  run = require('gulp-run');

gulp.task('connect', function() {
  connect.server({
    port: 8010,
    livereload: true
  });
});

gulp.task('aggregateStats', function() {
  //exec('echo hello', function(err, stdout, stderr) {
  //  console.log(stdout);
  //  console.log(stderr);
  //});
  //exec('./prepareData.sh', function(err, stdout, stderr) {
  //  console.log(stdout);
  //  console.log(stderr);
  //});
  //exec('cd ..', function(err, stdout, stderr) {
  //  console.log(stdout);
  //  console.log(stderr);
  ////});
  //shell.task([
  //  'touch thisisatest.txt'
  //]);
  run('cd lib').exec()   // prints "Hello World\n".
    .pipe(run('cat prepareData.sh').exec())  // prints "Hello World\n".
    .pipe(run('cd ..').exec());    // prints "Hello World\n".
});

gulp.task('hello-world', function() {
  run('echo Hello World').exec();    // prints "Hello World\n".
    //.pipe(gulp.dest('output'))      // writes "Hello World\n" to output/echo.
    //;
})

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(['./app/**/*.js',
            'app.js'])
    .pipe(connect.reload());
});

gulp.task('scss', function() {
  gulp.src('./app/**/*.scss')
    .pipe(connect.reload());
});

gulp.task('concatAndBuildCss', function () {
  gulp.src('./app/**/*.scss')
    .pipe(concat('test.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/**/*.js'], ['js']);
  gulp.watch(['./app/**/*.scss'], ['concatAndBuildCss', 'scss']);
});

//gulp.task('serve', ['concatAndBuildCss', 'connect', 'watch']);
gulp.task('serve', ['concatAndBuildCss', 'connect', 'watch']);