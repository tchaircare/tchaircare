// import from npm
var gulp = require('gulp'),
	minifyHTML = require('gulp-minify-html'), 
	uncss = require('gulp-uncss'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache');
	concat = require('gulp-concat'),
	concatCSS = require('gulp-concat-css');
	rename = require('gulp-rename');

	var src = 'src/';
	var dest = 'build/';

// Index - Minify
gulp.task('minify-index', function() {
	var opts = {
		conditionals: true,
		spare: true
	};

	return gulp.src(['src/main.html'])
		.pipe(minifyHTML(opts))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./'));
	});

// HTML - Minify /views
gulp.task('minify-html', function() {
	var opts = {
		conditionals: true,
		spare: true
	};

	return gulp.src(['src/views/careers.html', 'src/views/staff.html'])
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./build/views'));
	});

// CSS -> Remove Unused, minify, concat
gulp.task('styles', function(){
	return gulp.src(['src/css/bootstrap.min.css', 'src/css/custom.css'])
		.pipe(uncss({
			html: ['src/main.html', 'src/views/*.html'], ignore: [
            ".fade",
            ".fade.in",
            ".collapse",
            ".collapse.in",
            ".collapsing",
            /\.open/
       		]
		}))
		.pipe(concatCSS('all.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('build/css'));
	});

// Compress Images
gulp.task('image', function(){
	gulp.src('src/img/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('build/img'));	
	});

// Watch for changes in files
gulp.task('watch', function() {
	// watch index.html
	gulp.watch('main.html', ['minify-index']);
	// watch views/.html
	gulp.watch(src + 'views/*.html', ['minify-html']);
	// watch .css files
	gulp.watch(src + 'css/*.css', ['styles']);
	// watch image files
	gulp.watch(src + 'img/**/*', ['image']);
	});


// allows you to just type 'gulp' in terminal
gulp.task('default', ['watch', 'minify-index', 'minify-html', 'styles', 'image']); 

