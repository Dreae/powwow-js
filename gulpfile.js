var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');  // Require separate installation 
 
gulp.task('default', function() {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(ts({
            declaration: true,
            noExternalResolve: true
        }));
 
    return merge([
        tsResult.dts.pipe(gulp.dest('dist/')),
        tsResult.js.pipe(gulp.dest('dist/'))
    ]);
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.ts', ['default']);
});