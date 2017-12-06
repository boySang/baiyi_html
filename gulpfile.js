var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-minify-css'),
	notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('default',['serve'], function() {
  // 将你的默认的任务代码放在这
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['testtest'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/sass/*.scss", ['testtest']);
    gulp.watch("*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('testtest', function() {
    return gulp.src('src/sass/*.scss')
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sass())
		.pipe(cssmin())  //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});