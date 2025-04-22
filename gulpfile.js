const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass')(require('sass'));

gulp.task('html', function() {
    return gulp.src('index.html')  
        .pipe(gulp.dest('dist'))  
        .pipe(browserSync.stream());  
});

gulp.task('css', function() {
    return gulp.src('style.css')  
        .pipe(cssnano())  
        .pipe(gulp.dest('dist/css'))  
        .pipe(browserSync.stream());  
});

gulp.task('js', function() {
    return gulp.src('script.js')  
        .pipe(uglify())  
        .pipe(gulp.dest('dist/js'))  
        .pipe(browserSync.stream());  
});

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')  
        .pipe(sass().on('error', sass.logError))  
        .pipe(cssnano())  
        .pipe(gulp.dest('dist/css'))  
        .pipe(browserSync.stream());  
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'  
        }
    });

    gulp.watch('*.html', gulp.series('html'));  
    gulp.watch('*.css', gulp.series('css'));  
    gulp.watch('*.js', gulp.series('js'));  
    gulp.watch('scss/**/*.scss', gulp.series('sass'));  
});

gulp.task('default', gulp.series('html', 'css', 'js', 'serve'));