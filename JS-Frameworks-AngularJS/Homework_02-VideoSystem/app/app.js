'use strict';

var app = angular.module('videoSistemApp', [
	'ngRoute',
	'videoSistemApp.home',
	'videoSistemApp.videos'
	])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);