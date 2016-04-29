'use strict'

angular.module('issueTrackingSystemApp.issues', [
		'issueTrackingSystemApp.issues.issueServices',
		'issueTrackingSystemApp.labels.labelServices',
		'issueTrackingSystemApp.admin.adminServices',
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.common.projectsAndIssuesHelpers'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/issues/:id/edit', {
			templateUrl: 'app/issues/templates/edit-issue.html',
			controller: 'IssuesController'
		});
		
		$routeProvider.when('/issues/:id', {
			templateUrl: 'app/issues/templates/issue-details.html',
			controller: 'IssuesController'
		});
	}])
	.controller('IssuesController', [
		'$scope',
		'$routeParams',
		'$location',
		'issueServices',
		'labelServices',
		'adminServices',
		'projectServices',
		'projectsAndIssuesHelpers',
		function($scope, $routeParams, $location, issueServices, labelServices, adminServices, projectServices, projectsAndIssuesHelpers){
			
			// '/issues/:id/edit'
			function getIssueById(){
				var issueId = $routeParams.id;
				
				issueServices.getIssueById(issueId)
					.then(function(issueData){
						$scope.issue = issueData.data;
						$scope.issue.DueDate = new Date($scope.issue.DueDate);
						$scope.issue.PriorityId = $scope.issue.Priority.Id;
						$scope.issue.AvailablePriorities = JSON.parse(sessionStorage['availablePriorities']);
						if($scope.issue.Assignee.Id === sessionStorage['userId']){
							$scope.isAssignee = true;
						}else{
							$scope.isAssignee = false;
						}
						$scope.issue.Labels = projectsAndIssuesHelpers.makeToString($scope.issue.Labels);
						
						// check if current user is project leader
						var projectId = $scope.issue.Project.Id;
						projectServices.getProjectById(projectId)
							.then(function(projectData){
								if(projectData.data.Lead.Id === sessionStorage['userId']){
									$scope.isLeader = true;
								}else{
									$scope.isLeader = false;
								}
							});
					});
			}
			if(Number($routeParams.id)){
				getIssueById();
			}
			
			$scope.changeIssueStatus = function(statusId, issue){
				var issueId = $routeParams.id;
				
				issueServices.changeIssueStatus(issueId, statusId, issue)
					.then(function(statusData){
						sessionStorage['successMsg'] = 'Changed status successfuly';
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.getIssueComments = function(){
				var issueId = $routeParams.id;
				
				issueServices.getCommentsByIssueId(issueId)
					.then(function(commentsData){
						if(commentsData.data.length){
							$scope.comments = commentsData.data;
							commentsData.count = commentsData.data.length;
							$scope.commentsCount = commentsData.count;
						}else{
							$scope.commentsCount = 'No comments';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.addCommentInIssue = function(comment){
				var issueId = $routeParams.id;
				
				issueServices.addCommentInIssue(issueId, comment)
					.then(function(commentData, comment){
						sessionStorage['successMsg'] = 'Added comment successfuly';
						$scope.newComment = commentData.data;
						// show comments
						$scope.getIssueComments();
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			// end
			
			
			// '/issues/:id/edit'
			$scope.getAllUsersToMakeAssignee = function(){
				adminServices.getUsers()
					.then(function(usersData){
						if(usersData.data.length){
							$scope.usersForAssignee =  usersData.data;
							sessionStorage['successMsg'] = 'Got users by filter successfuly. Now select user!';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.editIssue = function(issue){
				var issueId = $routeParams.id;
				if(!issue.AssigneeId){
					issue.AssigneeId = issue.Assignee.Id;
				}
				
				issue.Labels = projectsAndIssuesHelpers.makeToAsociativeArr(issue.Labels, ';')
				issueServices.editIssue(issueId, issue)
					.then(function(issueData){
						sessionStorage['successMsg'] = 'Edited issue successfuly';
						$location.path('/issues/' + issueId);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			// end
	}]);