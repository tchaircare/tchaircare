// import from npm
var gulp = require('gulp'),
	minifyHTML = require('gulp-minify-html'), 
	uncss = require('gulp-uncss'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
	concatCSS = require('gulp-concat-css');

// HTML - Minify
gulp.task('minify-html', function() {
	var opts = {
		conditionals: true,
		spare: true
	};

	return gulp.src(['./index.html','views/careers.html', 'views/staff.html'])
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('./build/'));
	})

// CSS -> Remove Unused, minify, concat
gulp.task('styles', function(){
	return gulp.src(['css/bootstrap.min.css', 'css/custom.css'])
		.pipe(uncss({
			html: ['index.html', 'views/*.html'], ignore: [
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
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));	
	});




// allows you to just type 'gulp' in terminal
gulp.task('default', ['minify-html', 'styles', 'image']); 

