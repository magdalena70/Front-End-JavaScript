'use strict';

angular.module('issueTrackingSystemApp.users.authenticationServices', [
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.factory('authenticationServices', [
		'$http',
		'$q',
		'BASE_URL',
		'userIdentity',
		function($http, $q, BASE_URL, userIdentity){
			
			function registerUser(user){
				var defer = $q.defer();
				$http.post(BASE_URL + 'api/Account/Register', user)
					.then(function(success){
						defer.resolve(success.data);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function loginUser(user){
				var defer = $q.defer();
				$http.post(BASE_URL + 'api/Token', user)
					.then(function(success){
						defer.resolve(success.data);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function logout(){
				var defer = $q.defer();
				var headers = userIdentity.getRequestHeaders();
				$http.post(BASE_URL + 'api/Account/Logout', '', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getUserInfo(){
				var defer = $q.defer();
				var headers = userIdentity.getRequestHeaders();
				$http.get(BASE_URL + 'users/me', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			return{
				registerUser: registerUser,
				loginUser: loginUser,
				logout: logout,
				getUserInfo: getUserInfo
			};
	}]);