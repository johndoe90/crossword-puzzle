"use strict";

var tinyLr;
var gulp = require("gulp");
var path = require("path");
var lr = require("tiny-lr");
var jshint = require("gulp-jshint");
var karma = require("karma").server;

var SCRIPTS = ["app/**/*.js"];
var CSS = ["assets/css/*.css", "assets/css/**/*.css"];
var HTML = ["index.html", "app/**/*.html"];

function notifyLr(event) {
	tinyLr.changed({
		body: {
			files: [path.relative(__dirname, event.path)]
		}
	});
}

gulp.task("express", function() {
	var express = require("express");
	var app = express();

	app.use(require("connect-livereload")());
	app.use(express.static(__dirname));
	app.listen(3000);	
});

gulp.task("livereload", function() {
	tinyLr = require("tiny-lr")();
	tinyLr.listen(35729);
});

gulp.task("tdd", function(cb) {
	karma.start({
		configFile: __dirname + "/karma.conf.js"
	}, cb);
});

gulp.task("jshint", function() {
	console.log("LINTIT");

	gulp.src(SCRIPTS)
		.pipe(jshint({"browser": true, "devel": true, "globalstrict": true}))
		.pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("watch", function() {
	gulp.watch(HTML, notifyLr);
	gulp.watch(CSS, notifyLr);
	gulp.watch(SCRIPTS, ["jshint"]);
});

gulp.task("default", ["jshint", "express", "livereload", "watch"], function() {});
gulp.task("serve", ["default"], function(){});
