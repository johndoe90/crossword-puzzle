"use strict";

angular
	.module("crosswordPuzzle", ["crosswordPuzzle.puzzle", "ngRoute"])
	.config(["$routeProvider", function($routeProvider) {
		$routeProvider.otherwise({redirectTo: "/edit"});
	}]);
