'use strict';

angular.module('issueTrackingSystemApp.users.profileSettingsServices', [
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.factory('profileSettingsServices', [
		'$http',
		'$q',
		'BASE_URL',
		'userIdentity',
		function($http, $q, BASE_URL, userIdentity){
			
			function changePassword(user){
				var defer = $q.defer();
				var headers = userIdentity.getRequestHeaders();
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
				changePassword: changePassword
			};
	}]);