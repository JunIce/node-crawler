const gulp = require('gulp'),
    ts = require('gulp-typescript'),
    cache = require('gulp-cached');

    const tsProject = ts.createProject('tsconfig.json')

gulp.task('script', function() {
    return gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(cache())
        .pipe(gulp.dest('dist'))
})
gulp.task('default', gulp.series('script', function() {
    gulp.watch('src/**/*.ts', gulp.series('script'))
}))