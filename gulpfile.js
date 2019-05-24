const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
var browserSync = require("browser-sync").create();
	
var paths = {
    styles: {
        src: "zadanieHtml/scss/*.scss",
        dest: "zadanieHtml/css"
    },
    stylesJS: {
        src: "zadanieJS/scss/*.scss",
        dest: "zadanieJS/css"
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

function styleJs() {
    return (
        gulp
            .src(paths.stylesJS.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.stylesJS.dest))
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
            baseDir: "./"
        }
    });
    gulp.watch(paths.styles.src, style)
    gulp.watch(paths.stylesJS.src, styleJs)
    gulp.watch("zadanieHtml/*.html", reload);
    gulp.watch("./style.css", reload); 
    gulp.watch("zadanieJS/*.html", reload); 
    gulp.watch("zadanieJS/js/*.js", reload); 
    gulp.watch("./*.html", reload); 
}

exports.default = watch;
