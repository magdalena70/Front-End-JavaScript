'use strict'

angular.module('issueTrackingSystemApp.common', [])
	.controller('MainController', [
		'$scope',
		//'identity', 
		'BASE_URL',
		function($scope, identity, BASE_URL){
			//$scope.isAuthenticated = function(){
				if(sessionStorage['accessToken']){
					$scope.isAuthenticated = true;
				}else{
					$scope.isAuthenticated = false;
				}
			//}
			/*$scope.isAuthenticated = identity.isAuthenticated();
			
			identity.getCurrentUser(BASE_URL)
				.then(function(currentUserData){
					console.log(currentUserData);
					$scope.currentUser = currentUserData;
				});*/
		}]);