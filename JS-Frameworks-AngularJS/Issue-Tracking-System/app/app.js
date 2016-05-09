'use strict';

angular.module('issueTrackingSystemApp', [
		'angular-loading-bar',
		'ngRoute',
		'ngStorage',
		'issueTrackingSystemApp.common',
		'issueTrackingSystemApp.common.datepicker',
		'issueTrackingSystemApp.common.dialogModal',
		'issueTrackingSystemApp.common.hideModal',
		'issueTrackingSystemApp.common.popover',
		'issueTrackingSystemApp.common.collapse',
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
	.run(['$rootScope', '$location','$sessionStorage', function($rootScope, $location, $sessionStorage){
		$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection){
			if(rejection === 'Unauthorized!'){
				$location.path('/');
				$sessionStorage['errorMsg'] = rejection + ' You can not access route: " ' + current.$$route.originalPath + '"';
			}
		});
	}])
	.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
