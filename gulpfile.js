var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('cssnano');
var less = require('gulp-less');
var rename = require('gulp-rename');
var gulpStylelint = require('gulp-stylelint');
var cssnext = require("gulp-cssnext")

gulp.task('css-lint',function(){
    return gulp.src('src/er.css')
        .pipe(gulpStylelint({
            reporters: [
              {formatter: 'string', console: true}
            ]
          }))
})

gulp.task('css-next',function(){
    return gulp.src('src/next.css')
        .pipe(cssnext({
            compress: true
        }))
        .pipe(gulp.dest('dist/'))
})
gulp.task('styles', function () {
    return gulp.src('src/*')
        .pipe(less())
        .pipe(postcss([autoprefixer]))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('dist/'))
})
gulp.task('rename', ['styles'], function () {
    return gulp.src('dist/test.css')
        .pipe(postcss([cssnano]))
        .pipe(rename('test.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('dist/'))
})
gulp.task('default', ['styles', 'rename'])
var watcher = gulp.watch('src/*.css', ['default'])
watcher.on('change', function (event) { 
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); 
});