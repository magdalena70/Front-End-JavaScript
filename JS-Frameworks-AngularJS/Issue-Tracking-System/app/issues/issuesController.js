'use strict'

angular.module('issueTrackingSystemApp.issues', [
		'issueTrackingSystemApp.issues.issueServices',
		'issueTrackingSystemApp.labels.labelServices',
		'issueTrackingSystemApp.admin.adminServices',
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.common.projectsAndIssuesHelpers',
		'issueTrackingSystemApp.common.notificationServices',
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/issues', {
			templateUrl: 'app/issues/templates/all-issues.html',
			controller: 'IssuesController'
		});
	
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
		'notificationServices',
		'userIdentity',
		function($scope, $routeParams, $location, issueServices, labelServices,
			adminServices, projectServices, projectsAndIssuesHelpers, notificationServices, userIdentity){
			
			// '/issues/:id/edit'
			function getIssueById(){
				var issueId = $routeParams.id;
				
				issueServices.getIssueById(issueId)
					.then(function(issueData){
						$scope.issue = issueData.data;
						$scope.issue.DueDate = new Date($scope.issue.DueDate);
						$scope.issue.PriorityId = $scope.issue.Priority.Id;
						$scope.issue.AvailablePriorities = projectsAndIssuesHelpers.getIssueAvailablePriorities();
						$scope.issue.Labels = projectsAndIssuesHelpers.makeToString($scope.issue.Labels);
						$scope.isAssignee = userIdentity.checkIfCurrentUserIsIssueAssignee($scope.issue);
						
						// check if current user is project leader
						var projectId = $scope.issue.Project.Id;
						projectServices.getProjectById(projectId)
							.then(function(projectData){
								$scope.isLeader = userIdentity.checkIfCurrentUserIsProjectLeader(projectData.data);
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
						notificationServices.setMessage('successMsg', 'Changed status successfuly');
						getIssueById();
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
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
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			
			$scope.addCommentInIssue = function(comment){
				var issueId = $routeParams.id;
				
				issueServices.addCommentInIssue(issueId, comment)
					.then(function(commentData, comment){
						notificationServices.setMessage('successMsg', 'Added comment successfuly');
						$scope.newComment = commentData.data;
						// show comments
						$scope.getIssueComments();
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			// end
			
			
			// '/issues'
			$scope.allIssuesPaginationPageSize = 7;
			$scope.getAllIssues = function(pageSize, curPage){
				$scope.allIssuesPageSize = pageSize;
				$scope.allIssuesCurPage = curPage;
				
				issueServices.getAllIssues($scope.allIssuesPageSize, $scope.allIssuesCurPage)
					.then(function(allIssuesData){
						$scope.allIssues = allIssuesData.data.Issues;
						$scope.allIssuesTotalCount = allIssuesData.data.TotalCount;
						$scope.allIssuesTotalPages = allIssuesData.data.TotalPages;
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			// end
			
			// '/issues/:id/edit'
			$scope.getAllUsersToMakeAssignee = function(){
				adminServices.getUsers()
					.then(function(usersData){
						if(usersData.data.length){
							$scope.usersForAssignee =  usersData.data;
							notificationServices.setMessage('successMsg', 'Got users by filter successfuly. Now select user!');
						}
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			
			$scope.editIssue = function(issue){
				
				if(!issue.AssigneeId){
					issue.AssigneeId = issue.Assignee.Id;
				}
				
				issue.Labels = projectsAndIssuesHelpers.addLabels(issue.Labels);
				issueServices.editIssue(issue.Id, issue)
					.then(function(issueData){
						notificationServices.setMessage('successMsg', 'Edited issue successfuly');
						$location.path('/issues/' + issue.Id);
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			// end
	}]);