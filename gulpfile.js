var gulp = require('gulp');
var sass = require('gulp-sass');
var svgSprite = require('gulp-svg-sprite');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
	scss: ['_/scss/*.scss', '_/scss/**/*.scss'],
	svg: ['_/img/svg/*.svg']

};

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('scss', function() {
	gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest('_/css'))
		.pipe(reload({stream: true}));
});

config = {
};

gulp.task('svg', function() {
	gulp.src(paths.svg)
	.pipe(svgSprite({
		mode: {
			css: { // Activate the «css» mode
				bust: false,
				render: {
					scss: true // Activate CSS output (with default options)
				}
			}
		}
	}))
	.pipe(gulp.dest('_/out'));
});

gulp.task('default', function() {
});

gulp.task('watch', function() {
	gulp.watch(paths.scss, ['scss']);
	gulp.watch(paths.svg, ['svg']);
});

gulp.task('default', ['watch', 'scss', 'svg', 'browser-sync']);
