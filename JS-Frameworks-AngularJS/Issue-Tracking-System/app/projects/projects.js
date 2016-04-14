'use strict'

angular.module('issueTrackingSystemApp.projects', [
		'issueTrackingSystemApp.projects.projectServices'
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
		'projectServices',
		function($scope, $routeParams, projectServices){
			
			$scope.getProjects = function(){
				projectServices.getAllProjects()
					.then(function(projectsData){
						console.log(projectsData);
						$scope.projects = projectsData.data;
					});
			}
			//$scope.getProjects();
			
			$scope.getProjectById = function(){
				var projectId = $routeParams.id;
				
				projectServices.getProjectById(projectId)
					.then(function(projectData){
						console.log(projectData);
						$scope.project = projectData.data;
						$scope.getIssuesByProjectId();
					});
			}
			$scope.getProjectById();
			
			$scope.getIssuesByProjectId = function(){
				var projectId = $routeParams.id;
				
				projectServices.getIssuesByProjectId(projectId)
					.then(function(issuesData){
						console.log(issuesData);
						$scope.issuesInProject = issuesData.data;
					});
			}
			
			$scope.addProject = function(project){
				projectServices.addProject(project)
					.then(function(projectData){
						console.log(projectData);
						$scope.newProject = projectData.data;
					});
			}
	}]);