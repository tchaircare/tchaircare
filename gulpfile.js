// import from npm
var gulp = require('gulp'),
	uncss = require('gulp-uncss'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
	concatCSS = require('gulp-concat-css'); 


/* // Javascript -> minify, concat
gulp.task('js', function(){
	return gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build'));
	});

*/

// CSS -> Remove Unused, minify, concat
gulp.task('styles', function(){
	return gulp.src('css/*.css')
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
		.pipe(gulp.dest('build/'));
	});

// Compress Images
gulp.task('image', function(){
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));	
	});




// allows you to just type 'gulp' in terminal
gulp.task('default', ['styles', 'image']); 

