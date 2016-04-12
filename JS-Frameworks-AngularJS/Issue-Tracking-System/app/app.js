'use strict';

angular.module('issueTrackingSystemApp', [
		'angular-loading-bar',
		'ngRoute',
		'issueTrackingSystemApp.common',
		'issueTrackingSystemApp.home'
		//'issueTrackingSystemApp.users.identity'	
	])
	.config(['$routeProvider', 'cfpLoadingBarProvider',
		function($routeProvider, cfpLoadingBarProvider) {
			$routeProvider.otherwise({redirectTo: '/'});
			
			cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
			cfpLoadingBarProvider.spinnerTemplate = '<h1>Loading...<i class="fa fa-spinner"></i></h1>';
	}])
	.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
