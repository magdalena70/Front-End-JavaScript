'use strict'

angular.module('issueTrackingSystemApp.issues', [])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/projects/:id/add-issue', {
			templateUrl: 'app/issues/add-issue.html',
			controller: 'IssuesController'
		});
		
		$routeProvider.when('/issues/:id/edit', {
			templateUrl: 'app/issues/edit-issue.html',
			controller: 'IssuesController'
		});
	}])
	.controller('IssuesController', [function(){}]);