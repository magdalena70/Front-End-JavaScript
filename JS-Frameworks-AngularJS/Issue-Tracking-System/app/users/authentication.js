'use strict';

angular.module('issueTrackingSystemApp.users.authentication', [])
	.factory('authentication', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
		
			function registerUser(user){
				var defer = $q.defer();
				$http.post(BASE_URL + 'api/Account/Register', user)
					.then(function(success){
						console.log(success);
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
						console.log(success);
						defer.resolve(success.data);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function logout(){
			
			}
			
			return{
				registerUser: registerUser,
				loginUser: loginUser,
				logout: logout
			};
	}]);