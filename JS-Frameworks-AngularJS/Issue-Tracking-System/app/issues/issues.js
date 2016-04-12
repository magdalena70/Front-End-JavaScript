'use strict'

angular.module('issueTrackingSystemApp.issues', [])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/issues/:id', {
			//templateUrl: 'app/projects/projects.html',
			//controller: 'IssuesController'
		});
	}])
	.controller('IssuesController', [function(){}]);