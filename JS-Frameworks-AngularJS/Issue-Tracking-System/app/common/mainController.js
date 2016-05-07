'use strict'

angular.module('issueTrackingSystemApp.common', [
		'issueTrackingSystemApp.users.userIdentityServices',
		'issueTrackingSystemApp.common.notificationServices'
	])
	.controller('MainController', [
		'$scope',
		'userIdentity',
		'notificationServices',
		function($scope, userIdentity, notificationServices){ 
			
			// using to sort projects and issues by key
			$scope.orderByKey = function(key){
				$scope.keyOrder = key;
			}
			// end 
			
			/*$scope.orderCommentsByDate = function(comments){
				return comments.sort(function(a, b){
					return a.CreatedOn > b.CreatedOn;
				});
				//return a.CreatedOn > b.CreatedOn;
			}*/
			
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
				if(notificationServices.checkIfSomeMessage('successMsg')){
					$scope.messageBoxStyle = notificationServices.showSuccessMessageBox_style();
					$scope.successMsg = notificationServices.getMessage('successMsg');
					return true;
				}
			}
			
			$scope.hideSuccessMsg = function(){
				notificationServices.deleteMessage('successMsg');
				$scope.messageBoxStyle = notificationServices.hideMessageBox_style();
			}
			// end success messages
			
			// for error messages
			$scope.isError = function(){
				if(notificationServices.checkIfSomeMessage('errorMsg')){
					$scope.messageBoxStyle = notificationServices.showErrorMessageBox_style();
					$scope.errorMsg = notificationServices.getMessage('errorMsg');
					return true;
				}
			}
			
			$scope.hideErrorMsg = function(){
				notificationServices.deleteMessage('errorMsg');
				$scope.messageBoxStyle = notificationServices.hideMessageBox_style();
			}
			
			// if Network is not connected
			// get from http://stackoverflow.com/questions/28587753/capture-no-internet-connection-in-angularjs
			function getNetworkStatus(callback, timeout, x){
				x = new XMLHttpRequest(); 
				x.timeout = timeout,
				x.onreadystatechange = function(){
					x.readyState === 4 && callback(x.status === 200)
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