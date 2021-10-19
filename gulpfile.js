const gulp = require('gulp')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')

sass.compiler = require('node-sass')

gulp.task('sass', gulp.series(function () {
  return gulp.src('css/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
}))

gulp.task('minify-css', () => {
  return gulp.src('dist/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('images', gulp.series(function() {
	return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
}))

gulp.task('copy-icons', function() {
  return gulp.src(['images/**/*'])
  	.pipe(gulp.dest('dist/images/icons'));
})

gulp.task('copy-resume', function() {
  return gulp.src(['assets/*'])
  	.pipe(gulp.dest('dist/assets/'));
})

gulp.task('html', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
})

gulp.task('watch', gulp.series( function() {
    gulp.watch(['css/**/*.scss'], gulp.parallel(['sass']))
    gulp.watch(['images/*'], gulp.parallel(['images']))
    gulp.watch(['*.html'], gulp.parallel(['html']))

}))

gulp.task('default', gulp.series( ['sass', 'minify-css', 'images', 'copy-icons', 'copy-resume', 'html'] ))