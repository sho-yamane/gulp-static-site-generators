// import
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

// settings
const imagePath = {
  src:  './img',
  dist: './dist/img'
};
const browserSyncWatchFiles = [
  './dist/css/*.css',
  './dist/js/*.js',
  './images/*',
  './**/*.html'
];
const browserSyncOptions = {
  server: {
    baseDir: './dist/',
    index: 'index.html'
  }
};

// task
gulp.task('sass', () => {
  gulp.src('./scss/*.scss')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', () => {
  const scripts = [
    // js file
    './js/app.js'
  ];
  gulp.src(scripts)
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));

  gulp.src(scripts)
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('optimizeImage', () => {
  return gulp.src(imagePath.src + '/**/*')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(imagemin())
    .pipe(gulp.dest(imagePath.dist));
});

gulp.task('pug', () => {
  return gulp.src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
  .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', () => {
  browserSync.init(
    browserSyncWatchFiles,
    browserSyncOptions
  );
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

//command
gulp.task('default', ['sass', 'scripts', 'optimizeImage', 'pug'], () => {});

//watch
gulp.task('watch', () => {
  gulp.watch('./pug/**/*.pug', ['pug']);
  gulp.watch('./js/*', ['scripts']);
  gulp.watch('./img/*', ['optimizeImage']);
  gulp.watch('./scss/*.scss', ['sass']);
});

//browser-sync + watch
gulp.task('watch-bs', ['browser-sync', 'watch', 'sass', 'scripts', 'optimizeImage', 'pug'], () => {});
