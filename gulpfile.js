const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
var browserSync = require("browser-sync").create();
	
var paths = {
    styles: {
        src: "src/scss/*.scss",
        dest: "src/css"
    }

};

function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
}
exports.style = style;

function reload(done) {
    browserSync.reload();
    done();
}
	
function watch(){
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(paths.styles.src, style)
    gulp.watch("src/css/*.css", reload);
    gulp.watch("src/*.html", reload); 
}

exports.default = watch;
