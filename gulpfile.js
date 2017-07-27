/**
 * Created by newlmy on 2017/2/28.
 */
const gulp = require('gulp')
const del = require('del')
const runSequence = require('run-sequence')
const autoprefixer = require('autoprefixer')
const $ = require('gulp-load-plugins')()
const babel = require("gulp-babel")
const jsbeautifier = require('gulp-jsbeautifier')
let prod = false



// -------------------- Clean --------------------------

gulp.task('clean', () => {
    return del(['./dist/**'])
})

// -------------------- JSON ---------------------------

gulp.task('json', () => {
    return gulp.src('./src/**/*.json')
        .pipe($.if(prod, $.jsonminify()))
        .pipe(gulp.dest('./dist'))
})

gulp.task('json:watch', () => {
    gulp.watch('./src/**/*.json', ['json'])
})

// -------------------- Assets 内外网图片资源都发布--------------------------

gulp.task('assets', () => {
    return gulp.src('./src/assets/**')
        .pipe(gulp.dest('./dist/assets'))
})
gulp.task('assets:watch', () => {
    gulp.watch('./src/assets/**', ['assets'])
})


// -------------------- WXML -----------------------------

gulp.task('templates', () => {
    return gulp.src('./src/**/*.wxml')
        .pipe($.if(prod, $.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            keepClosingSlash: true
        })))
        .pipe(gulp.dest('./dist'))
})

gulp.task('templates:watch', () => {
    gulp.watch('./src/**/*.wxml', ['templates'])
})

// -------------------- WXSS ------------------------------

gulp.task('styles', () => {
    return gulp.src(['./src/**/*.wxss','./src/**/*.less'])
        .pipe($.less())
        .pipe($.postcss([
            autoprefixer([
                'iOS >= 8',
                'Android >= 4.1'
            ])
        ]))
        .pipe($.if(prod, $.cssnano()))
        .pipe($.rename((path) => path.extname = '.wxss'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('styles:watch', () => {
    gulp.watch('./src/**/*.wxss', ['styles'])
})

// -------------------- JS --------------------------------




gulp.task('scripts', () => {
    return gulp.src(['./src/**/*.js','!./src/api/**/*.js'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe($.if(prod, $.uglify()))
        .pipe($.if(!prod, jsbeautifier({
            config: './config/jsbeautify.json'
        })))
        .pipe(gulp.dest('./dist'))
})
gulp.task('scripts:watch', () => {
    gulp.watch(['./src/**/*.js','!./src/api/**/*.js'], ['scripts'])
})

gulp.task('api',() => {
    if(prod){
        return gulp.src(['./src/api/server/*.js'])
            .pipe(babel({
                presets: ['env']
            }))
            .pipe($.uglify())
            .pipe(gulp.dest('./dist/api'))
    }else{
        return gulp.src(['./src/api/test/*.js'])
            .pipe(babel({
                presets: ['env']
            }))
            .pipe($.if(!prod, jsbeautifier({
                config: './config/jsbeautify.json'
            })))
            .pipe(gulp.dest('./dist/api'))
    }
})

gulp.task('api:watch', () => {
    gulp.watch('./src/api/**/*.js', ['api'])
})

// -------------------- 发布 --------------------------------
gulp.task('build', [
    'json',
    'assets',
    'templates',
    'styles',
    'scripts',
    'api'
])
gulp.task('watch', [
    'json:watch',
    'assets:watch',
    'templates:watch',
    'styles:watch',
    'scripts:watch',
    'api:watch'

])

gulp.task('build:prod', (callback) => {
    prod = true;
runSequence('clean', 'build','watch', callback)
})
gulp.task('build:test', (callback) => {
    prod = true;
runSequence('build:dev',callback)
})

gulp.task('build:dev', (callback) => {
    runSequence('build', 'watch', callback)
})

gulp.task('default', ['build:dev']);
