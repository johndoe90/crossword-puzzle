"use strict";

angular.module("crosswordPuzzle.puzzle", ["ngRoute"])

.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/play", {
			templateUrl: "/app/puzzle/play.html",
			controller: "puzzleController"
		})
		.when("/edit", {
			templateUrl: "/app/puzzle/edit.html",
			controller: "puzzleController"
		});
}])

.controller("puzzleController", ["$scope", "puzzleService", "Puzzle", function($scope, puzzleService, Puzzle){
	console.log("INIT PUZZLE CONTROLLER");
	$scope.puzzle = new Puzzle({height: 10, width: 10});
}])

.factory("Field", [function() {
	function Field() {
		this.value = "THIS IS THE VALUE";
		
	}

	return Field;
}])

.factory("Puzzle", ["Field", function(Field) {
	function Puzzle(args) {
		this.init(args);
	}

	Puzzle.prototype.init = function(args) {
		this.height = args.height;
		this.width = args.width;
		this.initFields();
	};

	Puzzle.prototype.initFields = function() {
		this.fields = [];

		for ( var i = 0; i < this.height; i++ ) {
			var row = [];
			for ( var j = 0; j < this.width; j++ ) {
				row[j] = new Field();		
			}

			this.fields.push(row);
		}
	};


	return Puzzle;
}])

.directive("pfPuzzle", [function() {
	return {
		restrict: "AE",
		replace: true,
		templateUrl: "app/puzzle/puzzle-directive.html",
		link: function() {
			console.log("this is the link function calling");
		}
	};
}])

.directive("pfField", [function() {
	return {
		restrict: "AE", 
		replace: true,
		templateUrl: "app/puzzle/field-directive.html",
		link: function() {
			console.log("linking field dir");
		}
	};
}])

.factory("puzzleService", [function() {
	function PuzzleService() {
	}

	PuzzleService.prototype.sayHello = function() {
		console.log("HELLO");
	};

	return new PuzzleService();
}]);
