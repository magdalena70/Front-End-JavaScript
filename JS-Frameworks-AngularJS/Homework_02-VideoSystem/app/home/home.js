'use strict'

angular.module('videoSistemApp.home', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/home', {
			templateUrl: 'app/home/home.html',
			controller: 'HomeController'
		})
	}])
	.controller('HomeController', ['$scope', function HomeController($scope){
	
	}]);