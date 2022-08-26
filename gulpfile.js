const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
let browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('./src/style/**/*.sass', { sourcemaps: true })
        .pipe(sass()) // Компилияция sass в css
        .pipe(gulp.src('./src/style/**/*.css')) // Исходники css файлов
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public', { sourcemaps: '.' }))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    // Подготовка сервера
    browserSync.init({
        server: {
            baseDir: './public',
            index: 'index.html'
        }
    });
    // Задачи которые нужно отслеживать
    gulp.watch(['./src/style/**/*.sass', './src/style/*.css'], gulp.series(['sass']));
    gulp.watch('./public/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['sass', 'serve']));