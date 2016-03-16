var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task("js-compress", function () {
    gulp.src("*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/"));
});


gulp.task("default", ["js-compress"], function () {
    console.log("this is the default task");
});
