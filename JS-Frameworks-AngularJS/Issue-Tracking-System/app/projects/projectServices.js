'use strict'

angular.module('issueTrackingSystemApp.projects.projectServices', [])
	.factory('projectServices', [
		'$http',
		'$q',
		'BASE_URL',
		function($http, $q, BASE_URL){
			
			function getAllProjects(pageSize){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'projects?pageSize=' + pageSize +
					'&pageNumber=1&filter=TransitionSchemeId==1' , headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getUserProjects(username){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.get(BASE_URL + 'projects?pageSize=300&pageNumber=1&filter=Lead.Username=="' + username + '"', headers)
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
			
			function addProject(project){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.post(BASE_URL + 'projects', project, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function editProject(project, projectId){
				var defer = $q.defer();
				var accessToken = sessionStorage['accessToken'];
				var headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
				$http.put(BASE_URL + 'projects/' + projectId, project, headers)
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
				getUserProjects: getUserProjects,
				getProjectById: getProjectById,
				getIssuesByProjectId: getIssuesByProjectId,
				addProject: addProject,
				editProject: editProject
			};
	}]);