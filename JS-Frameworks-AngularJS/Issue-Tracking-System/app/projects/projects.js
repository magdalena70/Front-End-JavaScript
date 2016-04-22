'use strict'

angular.module('issueTrackingSystemApp.projects', [
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.issues.issueServices',
		'issueTrackingSystemApp.admin.adminSettings'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/projects', {
			templateUrl: 'app/projects/templates/projects.html',
			controller: 'ProjectsController'
		});
		
		$routeProvider.when('/projects/add', {
			templateUrl: 'app/projects/templates/add-project.html',
			controller: 'ProjectsController'
		});
		
		$routeProvider.when('/projects/:id/add-issue', {
			templateUrl: 'app/issues/templates/add-issue.html',
			controller: 'ProjectsController'
		});
		
		$routeProvider.when('/projects/:id/edit', {
			templateUrl: 'app/projects/templates/edit-project.html',
			controller: 'ProjectsController'
		});
		
		$routeProvider.when('/projects/:id', {
			templateUrl: 'app/projects/templates/project-details.html',
			controller: 'ProjectsController'
		});
	}])
	.controller('ProjectsController', [
		'$scope',
		'$routeParams',
		'$location',
		'projectServices',
		'issueServices',
		'adminSettings',
		function($scope, $routeParams, $location, projectServices, issueServices, adminSettings){
			
			function getProjectById(){
				var projectId = $routeParams.id;
				
				projectServices.getProjectById(projectId)
					.then(function(projectData){
						sessionStorage['availablePriorities'] = JSON.stringify(projectData.data.Priorities);
					
						var editedProject = projectData.data;
						editedProject.AvailablePriorities = JSON.stringify(editedProject.Priorities);
						editedProject.Priorities = makeToString(editedProject.Priorities);
						editedProject.Labels = makeToString(editedProject.Labels);
						
						if(editedProject.Lead.Id === sessionStorage['userId']){
							$scope.isLeader = true;
						}else{
							$scope.isLeader = false;
						}
						
						$scope.project = editedProject;
						$scope.editedProject = editedProject;
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			if(Number($routeParams.id)){
				getProjectById();
			}
			
			//------all projects-----
			// pagination
			$scope.curPage = 0;
			$scope.pageSize = 10;
			
			$scope.getProjects = function(){
				var pageSize = 300;
				
				projectServices.getAllProjects(pageSize)
					.then(function(projectsData){
						//console.log(projectsData);
						$scope.projects = projectsData.data.Projects;
						$scope.totalCount = projectsData.data.TotalCount;
						
						if($scope.projects.length){
							$scope.numberOfPages = function(){
								return Math.ceil($scope.projects.length / $scope.pageSize);
							}
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			//------------------------
			
			$scope.getIssuesByProjectId = function(){
				var projectId = $routeParams.id;
				
				projectServices.getIssuesByProjectId(projectId)
					.then(function(issuesData){
						if(issuesData.data.length){
							$scope.issuesInProject = issuesData.data;
							$scope.issuesCount = issuesData.data.length;
						}else{
							$scope.issuesCount = 'No issues in project';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.addIssueInCurrentProject = function(newIssue){
				newIssue.Labels = makeToAsociativeArr(newIssue.Labels, '; ');
				newIssue.ProjectId = $routeParams.id;
				//console.log(newIssue);
				issueServices.addIssue(newIssue)
					.then(function(issueData){
						//console.log(issueData.data);
						$scope.issue = issueData.data;
						sessionStorage['successMsg'] = 'Added issue successfuly';
						$location.path('/issues/' + $scope.issue.Id);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.addProject = function(project){
				project.Priorities = makeToAsociativeArr(project.Priorities, '; ');
				project.Labels = makeToAsociativeArr(project.Labels, '; ');
				projectServices.addProject(project)
					.then(function(projectData){
						//console.log(projectData);
						project.Priorities = makeToString(project.Priorities);
						project.Labels = makeToString(project.Labels);
						sessionStorage['successMsg'] = 'Added project successfuly';
						$location.path('/projects/' + projectData.data.Id);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.editProject = function(editedProject){
				var projectId = $routeParams.id;
				
				editedProject.Priorities = makeToAsociativeArr(editedProject.Priorities, '; ');
				editedProject.Labels = makeToAsociativeArr(editedProject.Labels, '; ');
				if(!editedProject.LeadId){
					editedProject.LeadId = editedProject.Lead.Id;
				}
				//console.log(editedProject);
				projectServices.editProject(editedProject, projectId)
					.then(function(projectData){
						//console.log(projectData);
						editedProject.Priorities = makeToString(editedProject.Priorities);
						editedProject.Labels = makeToString(editedProject.Labels);
						sessionStorage['successMsg'] = 'Edited project successfuly';
						$location.path('/projects/' + $routeParams.id);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			// get user to make Leader or Assignee
			$scope.getAllUsers = function(){
				adminSettings.getUsers()
					.then(function(usersData){
						$scope.users =  usersData.data;
						sessionStorage['successMsg'] = 'You got users successfuly. Now select user.';
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			//-----------------------------------
			
			function makeToAsociativeArr(str, splitBy){
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
	}]);