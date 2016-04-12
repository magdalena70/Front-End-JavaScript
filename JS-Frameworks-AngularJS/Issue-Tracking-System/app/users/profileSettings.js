'use strict';

angular.module('issueTrackingSystemApp.users.profileSettings', [])
	.factory('profileSettings', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
			
			function editProfile(user){
				//to do
			}
			
			function changePassword(user){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.post(BASE_URL + 'api/Account/ChangePassword', user, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			return{
				editProfile: editProfile,
				changePassword: changePassword
			};
	}]);