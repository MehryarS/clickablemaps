const gulp          = require('gulp'),
      sass          = require('gulp-ruby-sass'),
      sourcemaps    = require('gulp-sourcemaps'),
      uglify        = require('gulp-uglify'),
      minify        = require('gulp-minifier'),
      concat        = require('gulp-concat');


//Add sources to Gulp
const scss_source   = "src/scss/*.scss";
const js_source     = "src/*.js";

//Sass compiler
gulp.task('sass', () =>
    sass(scss_source, {sourcemap: true})
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
);

//CSS and JS minifier
gulp.task('minify', () => {
    return gulp.src('./src/**/*')
    .pipe(minify({
        minify: true,
        minifyJS: {
            sourceMap: true
        },
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('./dist'));
});


gulp.task('watch', function(){
    gulp.watch([scss_source], ['sass']);
});
gulp.task('default', ['sass' , 'watch']);
