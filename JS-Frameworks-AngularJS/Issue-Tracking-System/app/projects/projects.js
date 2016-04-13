'use strict'

angular.module('issueTrackingSystemApp.projects', [
		'issueTrackingSystemApp.projects.services'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/projects', {
			templateUrl: 'app/projects/projects.html',
			controller: 'ProjectsController'
		});
		
		$routeProvider.when('/projects/add', {
			templateUrl: 'app/projects/add-project.html',
			controller: 'ProjectsController'
		});
		
		$routeProvider.when('/projects/:id', {
			templateUrl: 'app/projects/project-details.html',
			controller: 'ProjectsController'
		});
	}])
	.controller('ProjectsController', [
		'$scope',
		'$routeParams',
		'services',
		function($scope, $routeParams, services){
			
			$scope.getProjects = function(){
				services.getAllProjects()
					.then(function(projectsData){
						console.log(projectsData);
						$scope.projects = projectsData.data;
					});
			}
			//$scope.getProjects();
			
			$scope.getProjectById = function(){
				var projectId = $routeParams.id;
				
				services.getProjectById(projectId)
					.then(function(projectData){
						console.log(projectData);
						$scope.project = projectData.data;
						$scope.getIssuesByProjectId();
					});
			}
			//$scope.getProjectById();
			
			$scope.getIssuesByProjectId = function(){
				var projectId = $routeParams.id;
				
				services.getIssuesByProjectId(projectId)
					.then(function(issuesData){
						console.log(issuesData);
						$scope.issuesInProject = issuesData.data;
					});
			}
			
			$scope.addProject = function(project){
				services.addProject(project)
					.then(function(projectData){
						console.log(projectData);
						$scope.newProject = projectData.data;
					});
			}
	}]);