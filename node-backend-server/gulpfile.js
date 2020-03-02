"use strict";

var Promise = require('bluebird');
var gulp = require('gulp');
var exit = require('gulp-exit');
var nodemon = require('gulp-nodemon');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var istanbul = require('gulp-istanbul');
var del = require('del');
var argv = require('yargs').argv;

/**
 * Paths.
 */

const BUILD_PATH = 'build';
const APP_BUILD_PATH = BUILD_PATH + '/src';

/**
 * Globs.
 */

const STATIC_APP_GLOB = ['src/**/*.yaml', 'src/**/*.js', 'src/**/*.key'];
const SRC_FILE_GLOB = ['src/**/*.ts'];

/**
 * Typescript configuration.
 */

const APP_PROJECT = ts.createProject('tsconfig.json');

gulp.task('default', function (done) {
  runSequence('server', function() {
    done();
  });
});

/**
 * Clean app build directory.
 */

gulp.task('clean', function() {
  del.sync(APP_BUILD_PATH + '/**/*');
});

/**
 * Build application.
 */

gulp.task('build', ['clean'], function() {
  // Copy static content.
  gulp.src(STATIC_APP_GLOB)
    .pipe(gulp.dest(APP_BUILD_PATH));
  // Build source.
  return gulp.src(SRC_FILE_GLOB)
    .pipe(sourcemaps.init())
    .pipe(APP_PROJECT())
    .js.pipe(sourcemaps.write('.', {
      includeContent: false,
      mapSources: function (path) {
        // need to build sources so that we walk up the
        // path once for each path divider beyond the first
        var depth = path.split('/').length - 2;
        return '../'.repeat(depth) + path;
      }
    }))
    .pipe(gulp.dest(APP_BUILD_PATH));
});

/**
 * Start server for development purposes.
 * Build and restart if changes are detected in the source.
 */

gulp.task('server', ['build'], function() {
  process.env.NODE_ENV = argv.env || 'development';
  nodemon({
    script: 'build/src/server.js',
    watch: ['src/', 'config/'],
    ext: 'ts json yaml',
    tasks: ['build'],
    env: { 'NODE_ENV': process.env.NODE_ENV || 'development' },
    legacyWatch: true
  });
});

process.once('SIGINT', function () {
  process.exit(0);
});
