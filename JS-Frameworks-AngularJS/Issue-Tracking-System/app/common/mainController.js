'use strict'

angular.module('issueTrackingSystemApp.common', [
		'ngStorage',
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.controller('MainController', [
		'$scope',
		'$sessionStorage',
		'userIdentity',
		function($scope, $sessionStorage, userIdentity){ 
			
			// using to sort projects and issues by key
			$scope.orderByKey = function(key){
				$scope.keyOrder = key;
			}
			// end 
			
			// authentication
			$scope.getCurrentUserUsername = function(){
				return $scope.username = userIdentity.getCurrentUserUsername();
			}
			
			$scope.isAuthenticated = function(){
				return userIdentity.checkIfCurrentUserIsAuthenticated();
			}
			
			$scope.isAdmin = function(){
				return userIdentity.checkIfCurrentUserIsAdmin();
			}
			// end authentication
			
			// for success messages
			$scope.isSuccess = function(){
				if($sessionStorage['successMsg']){
					$scope.messageBoxStyle = {
						"background-color": "rgba(254, 238, 189, 0.6)"
					};
					$scope.successMsg = $sessionStorage['successMsg'];
					return true;
				}
			}
			
			$scope.hideSuccessMsg = function(){
				delete $sessionStorage('successMsg');
				$scope.messageBoxStyle = {
					"background-color": "transparent"
				};
			}
			// end success messages
			
			// for error messages
			$scope.isError = function(){
				if($sessionStorage['errorMsg']){
					$scope.messageBoxStyle = {
						"background-color": "rgba(212, 10, 0, 0.6)"
					};
					$scope.errorMsg = $sessionStorage['errorMsg'];
					return true;
				}
			}
			
			$scope.hideErrorMsg = function(){
				delete sessionStorage('errorMsg');
				$scope.messageBoxStyle = {
					"background-color": "transparent"
				};
			}
			
			// if Network is not connected
			// get from http://stackoverflow.com/questions/28587753/capture-no-internet-connection-in-angularjs
			function getNetworkStatus(callback, timeout, x){
				x = new XMLHttpRequest(); 
				x.timeout = timeout,
				x.onreadystatechange = function(){
					x.readyState == 4 && callback(x.status == 200)
				},
				x.onerror = function(e){
					callback(!1)
				},
				x.ontimeout = function(){
					callback(!1)
				}, 
				(x.open('GET', 'http://ip-api.com/json/'), x.send());
			}

			/*getNetworkStatus(function(isOnline){
				if(!isOnline){
					 sessionStorage['errorMsg'] = 'Error: INTERNET DISCONNECTED';
				}
				//console.log(isOnline ? "ONLINE" : "OFFLINE");
			},40000);*/
			// end error messages
		}]);