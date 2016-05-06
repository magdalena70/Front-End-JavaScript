'use strict'

angular.module('issueTrackingSystemApp.projects.projectServices', [
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.factory('projectServices', [
		'$http',
		'$q',
		'$localStorage',
		'BASE_URL',
		'userIdentity',
		function($http, $q, $localStorage, BASE_URL, userIdentity){
			var headers = userIdentity.getRequestHeaders();
			
			function getAllProjects(pageSize, pageNumber){
				var defer = $q.defer();
				
				$http.get(BASE_URL + 'projects?pageSize=' + pageSize +
					'&pageNumber=' + pageNumber + '&filter=' , headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getUserProjects(pageSize, pageNumber, username){
				var defer = $q.defer();
				var headers = userIdentity.getRequestHeaders();
				$http.get(BASE_URL + 'projects?pageSize=' + pageSize + 
					'&pageNumber=' + pageNumber + '&filter=Lead.Username=="' + username + '"', headers)
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