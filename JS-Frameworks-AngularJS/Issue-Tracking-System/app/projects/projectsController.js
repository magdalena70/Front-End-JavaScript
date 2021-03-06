'use strict'

angular.module('issueTrackingSystemApp.projects', [
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.issues.issueServices',
		'issueTrackingSystemApp.admin.adminServices',
		'issueTrackingSystemApp.common.projectsAndIssuesHelpers',
		'issueTrackingSystemApp.common.notificationServices',
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.config(['$routeProvider', function($routeProvider){
		var routeChecks = {
					authenticated: ['$q', 'userIdentity', function($q, userIdentity){
						if(userIdentity.checkIfCurrentUserIsAuthenticated()){
							return $q.when(true);
						}
						
						return $q.reject('Unauthorized!');
					}]
			};
	
		$routeProvider.when('/projects', {
			templateUrl: 'app/projects/templates/all-projects.html',
			controller: 'ProjectsController',
			resolve: routeChecks.authenticated
		});
		
		$routeProvider.when('/projects/add', {
			templateUrl: 'app/projects/templates/add-project.html',
			controller: 'ProjectsController',
			resolve: routeChecks.authenticated
		});
		
		$routeProvider.when('/projects/:id/add-issue', {
			templateUrl: 'app/issues/templates/add-issue.html',
			controller: 'ProjectsController',
			resolve: routeChecks.authenticated
		});
		
		$routeProvider.when('/projects/:id/edit', {
			templateUrl: 'app/projects/templates/edit-project.html',
			controller: 'ProjectsController',
			resolve: routeChecks.authenticated
		});
		
		$routeProvider.when('/projects/:id', {
			templateUrl: 'app/projects/templates/project-details.html',
			controller: 'ProjectsController',
			resolve: routeChecks.authenticated
		});
	}])
	.controller('ProjectsController', [
		'$scope',
		'$routeParams',
		'$location',
		'projectServices',
		'issueServices',
		'adminServices',
		'projectsAndIssuesHelpers',
		'notificationServices',
		'userIdentity',
		function($scope, $routeParams, $location, projectServices, issueServices,
			adminServices, projectsAndIssuesHelpers, notificationServices, userIdentity){
			
			// '/projects/:id'
			function getProjectById(){
				var projectId = $routeParams.id;
				
				projectServices.getProjectById(projectId)
					.then(function(projectData){
						projectsAndIssuesHelpers.setAvailablePrioritiesForIssuesInCurProject(projectData.data);
						var editedProject = projectData.data;
						editedProject.AvailablePriorities = editedProject.Priorities;
						editedProject.Priorities = projectsAndIssuesHelpers.makeToString(editedProject.Priorities);
						editedProject.Labels = projectsAndIssuesHelpers.makeToString(editedProject.Labels);
						
						$scope.isLeader = userIdentity.checkIfCurrentUserIsProjectLeader(editedProject);
						$scope.project = editedProject;
						$scope.editedProject = editedProject;
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			if(Number($routeParams.id)){
				getProjectById();
			}
			
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
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			// end
			
			// '/projects/:id/add-issue'
			$scope.addIssueInCurrentProject = function(newIssue){
				newIssue.ProjectId = $routeParams.id;
				newIssue.Labels = projectsAndIssuesHelpers.addLabels(newIssue.Labels);
				
				issueServices.addIssue(newIssue)
					.then(function(issueData){
						$scope.issue = issueData.data;
						notificationServices.setMessage('successMsg', 'Added issue successfuly');
						$location.path('/issues/' + $scope.issue.Id);;
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			};
			// end
			
			// '/projects'
			// on this page ->
			// Step-1. The user call function getAllProjects(3, 1) -> using pagination and takes 3 projects a page,
			//  so I take Projects TotalCount and then I use it when the user make Step-2;
			// Step-2. The user call function getAllProjects(totalCount, 1) -> without pagination using filters;
			$scope.allProjectsPaginationPageSize = 3;
			
			$scope.getAllProjects = function(pageSize, curPage){
				$scope.allProjectsPageSize = pageSize;
				$scope.allProjectsCurPage = curPage;
				
				projectServices.getAllProjects($scope.allProjectsPageSize, $scope.allProjectsCurPage)
					.then(function(projectsData){
						$scope.projects = projectsData.data.Projects;
						$scope.totalCount = projectsData.data.TotalCount;
						
						// pagination
						if($scope.projects.length){
							$scope.allProjectsNumberOfPages = function(){
								return Math.ceil($scope.totalCount / $scope.allProjectsPageSize);
							}
						}
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			// end
			
			// '/projects/add'
			$scope.addProject = function(project){
				var projectId = $routeParams.id;
				
				project.Priorities = projectsAndIssuesHelpers.makeToAsociativeArr(project.Priorities, '; ');
				project.Labels = projectsAndIssuesHelpers.addLabels(project.Labels);
				
				projectServices.addProject(project)
					.then(function(projectData){
						project.Priorities = projectsAndIssuesHelpers.makeToString(project.Priorities);
						notificationServices.setMessage('successMsg', 'Added project successfuly');
						$location.path('/projects/' + projectData.data.Id);
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			};
			
			// '/projects/:id/edit'
			$scope.editProject = function(editedProject){
				
				if(!editedProject.LeadId){
					editedProject.LeadId = editedProject.Lead.Id;
				}
				
				editedProject.Priorities = projectsAndIssuesHelpers.makeToAsociativeArr(editedProject.Priorities, '; ');
				editedProject.Labels = projectsAndIssuesHelpers.addLabels(editedProject.Labels);
			
				projectServices.editProject(editedProject, editedProject.Id)
					.then(function(projectData){
						notificationServices.setMessage('successMsg', 'Edited project successfuly');
						$location.path('/projects/' + editedProject.Id);
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			};
			// end
			
			// get user to make Leader or Assignee
			$scope.getAllUsersToMakeLeaderOrAssignee = function(){
				adminServices.getUsers()
					.then(function(usersData){
						if(usersData.data.length){
							$scope.usersForAssignee =  usersData.data;
							$scope.usersForLeader = usersData.data;
							notificationServices.setMessage('successMsg', 'Got users by filter successfuly. Now select user!');
						}else{
							notificationServices.setMessage('errorMsg', 'No users');
						}
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			//end
	}]);