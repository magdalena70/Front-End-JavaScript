'use strict'

angular.module('socialNetwork.users.identity', [])
	.factory('identity', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
		
			var isAuthenticated = function(){
				if(sessionStorage['accessToken']){
					return true;
				}else{
					return false;
				}
			}
		
			var headers = $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
			var currentUser = function(BASE_URL){
				var defer = $q.defer();
				$http.get(BASE_URL + 'api/Account/UserInfo', '', headers)
					.then(function(user){
						defer.resolve(user);
					},
					function(err){
						defer.reject(err);
					});
				
				return defer.promise;
			}
			
			return{
				getCurrentUser: currentUser,
				isAuthenticated: isAuthenticated
			};
	}]);