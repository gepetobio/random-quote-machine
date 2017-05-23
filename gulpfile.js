var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sourcemaps = require('gulp-sourcemaps');
var sassLint = require('gulp-sass-lint');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var $  = require('gulp-load-plugins')();

//TODO: replace paths according to your project
var paths = {
  sassSrc: 'src/scss',
  cssDist: 'css',
  imgSrc: 'src/images',
  imgDist: 'images',
  jsSrc: 'src/js',
  jsDist: 'js',
  templateFiles: '*' //any php or html file directory you want to watch
};

gulp.task('sass', function() {
  return gulp.src(paths.sassSrc + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed',
      includePaths: paths.sassSrc
    }).on('error', $.sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "http://dev.url.co.uk/" //change this with your local (vhost?) dev url
  });
});

gulp.task('js-lint', function () {
  return gulp.src([paths.jsSrc + '/**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sass-lint', function() {
  return gulp.src(paths.sassSrc + '/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('lint', ['js-lint', 'sass-lint']);

gulp.task('uglify-js', ['js-lint'], function(cb) {
  pump([
      gulp.src(paths.jsSrc + '/**/*.js'),
      uglify(),
      gulp.dest(paths.jsDist)
    ],
    cb
  );
});

gulp.task('img', function() {
  gulp.src(paths.imgSrc + '/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.imgDist));
});

gulp.task('build', ['sass', 'uglify-js', 'img', 'js-lint', 'sass-lint'], function () {
  console.log('building the project');
});

gulp.task('watch', function() {
  gulp.watch(paths.sassSrc + '/**/*.scss', ['sass-lint','sass']);
  gulp.watch(paths.jsSrc + '/**/*.js', ['uglify-js']);
  gulp.watch(paths.imgSrc + '/**/*', ['img']);
  gulp.watch(paths.templateFiles + '/*');
});

gulp.task('backend', function() {
  gulp.watch(paths.jsSrc + '/**/*.js', ['uglify-js']);
  gulp.watch(paths.templateFiles + '/*');
});

gulp.task('dev', ['watch'], function() {
  console.log('use livereload without browser-sync');
});

gulp.task('default', ['watch', 'browser-sync']);
