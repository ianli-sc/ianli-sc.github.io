var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

//less to css
gulp.task('less', function () {
    return gulp.src('css/aio.less')
        .pipe(less())
        .pipe(gulp.dest('aio'));
});

//uglify css
gulp.task('css', ['less'], function(){
    return gulp.src('aio/aio.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('aio/'));
});

// clean
gulp.task('clean', function () {
    return gulp.src('aio/*', {read: false})
        .pipe(clean());
});

//compress libs to one
gulp.task('libs', function(){
    return gulp.src('lib/*.js')
        .pipe(concat('aio-lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('aio'));
});

//all js in one!
gulp.task('js',function(){

    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('aio.js'))
        .pipe(gulp.dest('aio'));
});

// compress html
gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./'))
});


gulp.task('watch', function() {
    gulp.watch('css/**/*.less', ['less']);
});

//maybe need sequence one day...
gulp.task('default', function(){
    runSequence('css', 'clean', 'libs', 'js');
});

//bug!!! in html task
////added compress html task
//gulp.task('build', function(){
//    runSequence('clean', 'css', 'libs', 'js', 'html');
//});

////set most js in one and compress
//gulp.task('js',function(){
//    var files = [];
//
//    [
//        'search'
//    ].forEach(function(name){
//            files.push('js/' + name + '.js');
//        });
//
//    return gulp.src(files)
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'))
//        .pipe(uglify())
//        .pipe(concat('mio.js'))
//        .pipe(gulp.dest('js'));
//});