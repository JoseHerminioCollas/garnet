var gulp = require('gulp')
var jshint = require('gulp-jshint')
//var mocha  = require('gulp-mocha')

var editFiles = ['src/goatstone/**/*.js', 'gulpfile.js']

gulp.task('default', function(){
    console.log('default')
})
gulp.watch(editFiles, function(){
    gulp.run('lint') // TODO this is deprecated .run
})
gulp.task('lint', function(){
    return gulp
    .src(editFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})