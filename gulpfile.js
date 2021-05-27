const gulp = require('gulp');
const saa = require('gulp-sass');
const cssname = require('gulp-cssnano');

gulp.task('css', function(){
    console.log('#minifying css...');
    gulp.src= ('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
})
