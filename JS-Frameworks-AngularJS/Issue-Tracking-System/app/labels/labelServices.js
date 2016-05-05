'use strict'

angular.module('issueTrackingSystemApp.labels.labelServices', [
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.factory('labelServices', [
		'$http',
		'$q',
		'BASE_URL',
		'userIdentity',
		function($http, $q, BASE_URL, userIdentity){
			
			// get all labels without filter
			function getLabels(labelFilter){
				var defer = $q.defer();
				var headers = userIdentity.getRequestHeaders();
				$http.get(BASE_URL + 'labels/?filter=' + labelFilter, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			return{
				getLabels: getLabels
			};
		}]);