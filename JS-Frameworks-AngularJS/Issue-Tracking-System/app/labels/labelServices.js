'use strict'

angular.module('issueTrackingSystemApp.labels.labelServices', [])
	.factory('labelServices', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
			
			// get all withouth filter
			function getLabels(labelFilter){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
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