'use strict';

angular.module('issueTrackingSystemApp', [
		'angular-loading-bar',
		'ngRoute',
		'issueTrackingSystemApp.common',
		'issueTrackingSystemApp.common.datepicker',
		'issueTrackingSystemApp.common.dialogModal',
		'issueTrackingSystemApp.common.popover',
		'issueTrackingSystemApp.common.clearInputValue',
		'issueTrackingSystemApp.common.hideElement',
		'issueTrackingSystemApp.common.paginationFilter',
		'issueTrackingSystemApp.home',
		'issueTrackingSystemApp.users',
		'issueTrackingSystemApp.projects',
		'issueTrackingSystemApp.issues',
		'issueTrackingSystemApp.admin'
	])
	.config(['$routeProvider', 'cfpLoadingBarProvider',
		function($routeProvider, cfpLoadingBarProvider) {
			$routeProvider.otherwise({redirectTo: '/'});
			
			cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
			cfpLoadingBarProvider.spinnerTemplate = '<h1>Loading...<i class="fa fa-spinner"></i></h1>';
	}])
	.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
