'use strict'

angular.module('issueTrackingSystemApp.common', [])
	.controller('MainController', [
		'$scope', 
		'BASE_URL',
		function($scope, authentication, BASE_URL){ 
			
			$scope.getCurrentUserUsername = function(){
				if(sessionStorage['currentUserUsername']){
					return $scope.username = sessionStorage['currentUserUsername'];
				}
			}
			
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
			
			// for success messages
			$scope.isSuccess = function(){
				if(sessionStorage['successMsg']){
					$scope.messageBoxStyle = {
						"background-color": "rgba(254, 238, 189, 0.6)"
					};
					$scope.successMsg = sessionStorage['successMsg'];
					return true;
				}
			}
			
			$scope.hideSuccessMsg = function(){
				sessionStorage.removeItem('successMsg');
				$scope.messageBoxStyle = {
					"background-color": "transparent"
				};
			}
			
			// for error messages
			$scope.isError = function(){
				if(sessionStorage['errorMsg']){
					$scope.messageBoxStyle = {
						"background-color": "rgba(212, 10, 0, 0.6)"
					};
					$scope.errorMsg = sessionStorage['errorMsg'];
					return true;
				}
			}
			
			$scope.hideErrorMsg = function(){
				sessionStorage.removeItem('errorMsg');
				$scope.messageBoxStyle = {
					"background-color": "transparent"
				};
			}
		}])
		.filter('pagination', function(){
		return function(input, start){
			if(input){
				start = +start;
				return input.slice(start);
			}
		}
	});