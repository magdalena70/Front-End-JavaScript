'use strict'

angular.module('issueTrackingSystemApp.issues.issueServices', [])
	.factory('issueServices', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
			
			function getMyIssues(){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=20&pageNumber=1', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			return{
				getMyIssues: getMyIssues
			};
	}]);