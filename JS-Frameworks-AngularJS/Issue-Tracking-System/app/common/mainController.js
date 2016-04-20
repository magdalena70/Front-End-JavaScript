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
			
			$scope.isSuccess = function(){
				if(sessionStorage['successMsg']){
					$scope.messageBoxStyle = {
						"background-color": "rgba(144, 238, 144, 0.8)"
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
			
			$scope.isError = function(){
				if(sessionStorage['errorMsg']){
					$scope.messageBoxStyle = {
						"background-color": "rgba(255, 0, 0, 0.8)"
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
		}]);