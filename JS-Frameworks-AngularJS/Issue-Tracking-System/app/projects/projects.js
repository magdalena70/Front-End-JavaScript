'use strict'

angular.module('issueTrackingSystemApp.projects', [
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.admin.adminSettings'
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
		
		$routeProvider.when('/projects/:id/edit', {
			templateUrl: 'app/projects/edit-project.html',
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
		'$location',
		'projectServices',
		'adminSettings',
		function($scope, $routeParams, $location, projectServices, adminSettings){
			
			$scope.getProjects = function(){
				projectServices.getAllProjects()
					.then(function(projectsData){
						console.log(projectsData);
						$scope.projects = projectsData.data;
					},
					function(error){
						console.log(error);
					});
			}
			
			
			$scope.getIssuesByProjectId = function(){
				var projectId = $routeParams.id;
				
				projectServices.getIssuesByProjectId(projectId)
					.then(function(issuesData){
						if(issuesData.data.length){
							$scope.issuesInProject = issuesData.data;
						}else{
							console.log('No issues in project');
						}
					},
					function(error){
						console.log(error);
					});
			}
			
			$scope.addProject = function(project){
				project.Priorities = makeStrToAsociativeArr(project.Priorities, '; ');
				project.Labels = makeStrToAsociativeArr(project.Labels, '; ');
				projectServices.addProject(project)
					.then(function(projectData){
						//console.log(projectData);
						project.Priorities = makeToString(project.Priorities);
						project.Labels = makeToString(project.Labels);
						$location.path('/projects/' + projectData.data.Id);
					},
					function(error){
						console.log(error);
					});
			}
			
			$scope.editProject = function(editedProject){
				//console.log(editedProject);
				var projectId = $routeParams.id;
				editedProject.Priorities = makeStrToAsociativeArr(editedProject.Priorities, '; ');
				editedProject.Labels = makeStrToAsociativeArr(editedProject.Labels, '; ');
				if(!editedProject.LeadId){
					editedProject.LeadId = editedProject.Lead.Id;
				}
				console.log(editedProject);
				projectServices.editProject(editedProject, projectId)
					.then(function(projectData){
						//console.log(projectData);
						editedProject.Priorities = makeToString(editedProject.Priorities);
						editedProject.Labels = makeToString(editedProject.Labels);
						$location.path('/projects/' + $routeParams.id);
					});
			}
			
			function makeStrToAsociativeArr(str, splitBy){
				var strToArr = str.split(splitBy),  arr = [];
				
				angular.forEach(strToArr, function(elem){
					if(elem != false){
					var obj = {"Name": elem};
					arr.push(obj);
					}
				});
				
				return arr;
			}
			
			function makeToString(asociativeArr){
				var str = '';
				angular.forEach(asociativeArr, function(obj){
							str += obj.Name + '; ';
						});
				return str;
			}
			
			function getProjectById(){
				var projectId = $routeParams.id;
				
				projectServices.getProjectById(projectId)
					.then(function(projectData){
						var editedProject = projectData.data;
						editedProject.Priorities = makeToString(editedProject.Priorities);
						editedProject.Labels = makeToString(editedProject.Labels);
						
						$scope.project = editedProject;
						$scope.editedProject = editedProject;
						//console.log($scope.project);
						if(editedProject.Lead.Username === sessionStorage['currentUserUsername']){
							$scope.isLeader = true;
						}else{
							$scope.isLeader = false;
						}
					},
					function(error){
						console.log(error);
					});
			}
			getProjectById();
			
			function getAllUsersToMakeLeader(){
				adminSettings.getUsers()
					.then(function(usersData){
						$scope.usersForLeader =  usersData.data;
					},
					function(error){
						console.log(error);
					});
			}
			getAllUsersToMakeLeader();
	}]);