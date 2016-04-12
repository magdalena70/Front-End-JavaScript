'use strict'

angular.module('issueTrackingSystemApp.common', [])
	.controller('MainController', [
		'$scope', 
		'BASE_URL',
		function($scope, identity, BASE_URL){
		
			$scope.isAuthenticated = function(){
				if(sessionStorage['accessToken']){
					return true;
				}else{
					 return false;
				}	
			}
			
			$scope.username = sessionStorage['currentUserUsername'];
		}]);