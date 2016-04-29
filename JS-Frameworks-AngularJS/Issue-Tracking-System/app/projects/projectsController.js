'use strict'

angular.module('issueTrackingSystemApp.projects', [
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.issues.issueServices',
		'issueTrackingSystemApp.admin.adminServices',
		'issueTrackingSystemApp.labels.labelServices',
		'issueTrackingSystemApp.common.projectsAndIssuesHelpers'
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
		'$rootScope',
		'$routeParams',
		'$location',
		'projectServices',
		'issueServices',
		'labelServices',
		'adminServices',
		'projectsAndIssuesHelpers',
		function($scope, $rootScope, $routeParams, $location, projectServices, issueServices, labelServices, adminServices, projectsAndIssuesHelpers){
			
			// '/projects/:id'
			function getProjectById(){
				var projectId = $routeParams.id;
				
				projectServices.getProjectById(projectId)
					.then(function(projectData){
						sessionStorage['availablePriorities'] = JSON.stringify(projectData.data.Priorities);
					
						var editedProject = projectData.data;
						editedProject.AvailablePriorities = editedProject.Priorities;
						editedProject.Priorities = projectsAndIssuesHelpers.makeToString(editedProject.Priorities);
						editedProject.Labels = projectsAndIssuesHelpers.makeToString(editedProject.Labels);
						
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
			// end
			
			// '/projects/:id/add-issue'
			$scope.addIssueInCurrentProject = function(newIssue){
				console.log(newIssue);
				newIssue.ProjectId = $routeParams.id;
				
				// labels
				if(newIssue.Labels){
					newIssue.Labels = projectsAndIssuesHelpers.makeToAsociativeArr(newIssue.Labels, ';');
				}
				angular.forEach(newIssue.Labels, function(labelFilter){
					labelServices.getLabels(labelFilter)
						.then(function(labelsData){
							if(labelsData.data.length){
								angular.forEach(labelsData.data, function(label){
									if(label.Name === labelFilter){
										newIssue.Labels.push(label);
									}else{
										newIssue.Labels.push({'Name': labelFilter});
									}
								});
							}else{
								newIssue.Labels.push({'Name': labelFilter});
							}
						});
				});
				//end labels
				issueServices.addIssue(newIssue)
					.then(function(issueData){
						$scope.issue = issueData.data;
						sessionStorage['successMsg'] = 'Added issue successfuly';
						$location.path('/issues/' + $scope.issue.Id);;
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			};
			// end
			
			// '/projects'
			$scope.getAllProjects = function(pageSize, curPage){
				$scope.pageSize = pageSize;
				$rootScope.curPage = curPage;
				
				projectServices.getAllProjects($scope.pageSize, $rootScope.curPage)
					.then(function(projectsData){
						$scope.projects = projectsData.data.Projects;
						$scope.totalCount = projectsData.data.TotalCount;
						
						if($scope.projects.length){
							$scope.numberOfPages = function(){
								return Math.ceil($scope.totalCount / $scope.pageSize);
							}
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			// end
			
			// '/projects/add'
			$scope.addProject = function(project){
				var projectId = $routeParams.id;
				
				project.Priorities = projectsAndIssuesHelpers.makeToAsociativeArr(project.Priorities, '; ');
				// labels
				project.Labels = projectsAndIssuesHelpers.makeToAsociativeArr(project.Labels, ';');	
				angular.forEach(project.Labels, function(labelFilter){
					labelServices.getLabels(labelFilter)
						.then(function(labelsData){
							if(labelsData.data.length){
								angular.forEach(labelsData.data, function(label){
									if(label.Name === labelFilter){
										project.Labels.push(label);
									}else{
										project.Labels.push({'Name': labelFilter});
									}
								});
							}else{
								project.Labels.push({'Name': labelFilter});
							}
						});
				});
				//end labels
				projectServices.addProject(project)
					.then(function(projectData){
						project.Priorities = projectsAndIssuesHelpers.makeToString(project.Priorities);
						sessionStorage['successMsg'] = 'Added project successfuly';
						$location.path('/projects/' + projectData.data.Id);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			};
			
			// '/projects/:id/edit'
			$scope.editProject = function(editedProject){
				var projectId = $routeParams.id;
				
				if(!editedProject.LeadId){
					editedProject.LeadId = editedProject.Lead.Id;
				}
				
				editedProject.Priorities = projectsAndIssuesHelpers.makeToAsociativeArr(editedProject.Priorities, '; ');
				// labels
				editedProject.Labels = projectsAndIssuesHelpers.makeToAsociativeArr(editedProject.Labels, ';');	
				angular.forEach(editedProject.Labels, function(labelFilter){
					labelServices.getLabels(labelFilter)
						.then(function(labelsData){
							if(labelsData.data.length){
								angular.forEach(labelsData.data, function(label){
									if(label.Name === labelFilter){
										editedProject.Labels.push(label);
									}else{
										editedProject.Labels.push({'Name': labelFilter});
									}
								});
							}else{
								editedProject.Labels.push({'Name': labelFilter});
							}
						});
				});
				//end labels
				projectServices.editProject(editedProject, projectId)
					.then(function(projectData){
						sessionStorage['successMsg'] = 'Edited project successfuly';
						$location.path('/projects/' + $routeParams.id);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
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
							sessionStorage['successMsg'] = 'Got users by filter successfuly. Now select user!';
						}else{
							sessionStorage['errorMsg'] = 'No users';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			//end
	}]);