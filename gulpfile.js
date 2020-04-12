const gulp = require('gulp')
const sass = require('gulp-sass')

sass.compiler = require('node-sass')

gulp.task('sass', gulp.series(function () {
  return gulp.src('css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
}))

gulp.task('watch', gulp.series( function() {
    gulp.watch(['css/**/*.scss'], gulp.parallel(['sass']))
}));

gulp.task('default', gulp.series( ['sass', 'watch'] ))