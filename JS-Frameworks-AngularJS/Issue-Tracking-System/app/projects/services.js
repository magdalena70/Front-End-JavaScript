'use strict'

angular.module('issueTrackingSystemApp.projects.services', [])
	.factory('services', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
		
			function getAllProjects(){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'projects', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getProjectById(id){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'projects/' + id, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getIssuesByProjectId(id){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'projects/' + id + '/issues', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
		
			return{
				getAllProjects: getAllProjects,
				getProjectById: getProjectById,
				getIssuesByProjectId: getIssuesByProjectId
			};
	}]);