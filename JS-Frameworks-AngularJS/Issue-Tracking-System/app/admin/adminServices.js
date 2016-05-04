'use strict'

angular.module('issueTrackingSystemApp.admin.adminServices', [])
	.factory('adminServices', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
			if(localStorage['accessToken']){
				var accessToken = localStorage['accessToken'];
			}
			
			function getUsers(){
				var defer = $q.defer();
				//var accessToken = sessionStorage['accessToken'];
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
			
			function getUserToMakeAdmin(filterUsername){
				var defer = $q.defer();
				//var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'users?filter=Username=="' + filterUsername + '"', headers)
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
				//var accessToken = sessionStorage['accessToken'];
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
				getUserToMakeAdmin: getUserToMakeAdmin,
				makeAdmin: makeAdmin
			};
	}]);