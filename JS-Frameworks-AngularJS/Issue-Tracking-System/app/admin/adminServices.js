'use strict'

angular.module('issueTrackingSystemApp.admin.adminServices', [
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.factory('adminServices', [
		'$http',
		'$q',
		'BASE_URL',
		'userIdentity',
		function($http, $q, BASE_URL, userIdentity){
			var headers = userIdentity.getRequestHeaders();
			
			function getUsers(){
				var defer = $q.defer();
				
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