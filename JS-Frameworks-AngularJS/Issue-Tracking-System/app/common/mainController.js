'use strict'

angular.module('issueTrackingSystemApp.common', [])
	.controller('MainController', [
		'$scope', 
		'BASE_URL',
		function($scope, authentication, BASE_URL){
			$scope.username = sessionStorage['currentUserUsername'];
			
			$scope.isAuthenticated = function(){
				if(sessionStorage['accessToken']){
					return true;
				}else{
					 return false;
				}	
			}
			
			$scope.isAdmin = function(){
				if(sessionStorage['isAdmin']){
					return true;
				}else{
					 return false;
				}
			}
		}]);