'use strict'

angular.module('issueTrackingSystemApp.admin.adminSettings', [])
	.factory('adminSettings', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
			
			function getUsers(){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'users', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function makeAdmin(user){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.put(BASE_URL + 'users/makeadmin', user, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			return{
				getUsers: getUsers,
				makeAdmin: makeAdmin
			};
	}]);