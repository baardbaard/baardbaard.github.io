var gulp = require('gulp');
var sass = require('gulp-sass');
var svgSprite = require('gulp-svg-sprite');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
	scss: ['_/scss/*.scss', '_/scss/**/*.scss'],
	svg: '_/img/svg/*.svg',
	html: '*.html'
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
		.pipe(browserSync.stream());
});

gulp.task('svg', function() {
	gulp.src(paths.svg)
	.pipe(svgSprite({
		mode: {
			css: { 
				bust: false,
				render: {
					css: true
				},
				example: true
			}
		},
		transform: [{ 
			svgo: {
				plugins: [
					{ mergePaths: false } // SVGO doesn't like my SVG's
				]
			}
		}]
	}))
	.pipe(gulp.dest('_/out'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scss, ['scss']);
	gulp.watch(paths.svg, ['svg']);
	gulp.watch(paths.html).on('change', reload);
});

gulp.task('default', ['watch', 'scss', 'svg', 'browser-sync']);
