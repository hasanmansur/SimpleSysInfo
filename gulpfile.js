var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task("js-mini", function () {
    console.log("js-mini task");
    gulp.src("*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/"));
});

gulp.task("default", ["js-mini"], function () {
    console.log("this is the default task");
    gulp.watch("*.js", function () {
        gulp.run("js-mini");
    });
});
