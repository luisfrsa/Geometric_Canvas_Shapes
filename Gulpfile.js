var gulp = require('../node_modules/gulp');
var concat = require('../node_modules/gulp-concat');
var rename = require('../node_modules/gulp-rename');
var sass = require('../node_modules/gulp-sass');

var filesJS = ([
    "./js/core.js",
    "./js/inputs_controllers.js",
    "./js/third_party.js",
]);

var filesSCSS = ([
    "./scss/core.scss",
    "./scss/inputs.scss",
]);

gulp.task('dist', function () {
    gulp.src(filesJS)
            .pipe(concat('./*.js'))
            .pipe(rename('js.js'))
            .pipe(gulp.dest('./dist'));
});
gulp.task('sass', function () {
    return gulp.src(filesSCSS)
            .pipe(concat('./*.scss'))
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(rename('css.css'))
            .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch(filesJS, ['dist']);
    gulp.watch(filesSCSS, ['sass']);
});

gulp.task('default', ['dist', 'sass', 'watch']);
