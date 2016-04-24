'use strict'

angular.module('issueTrackingSystemApp.issues', [
		'issueTrackingSystemApp.issues.issueServices',
		'issueTrackingSystemApp.admin.adminServices',
		'issueTrackingSystemApp.projects.projectServices'
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
		'adminServices',
		'projectServices',
		function($scope, $routeParams, $location, issueServices, adminServices, projectServices){
			
			function getIssueById(){
				var issueId = $routeParams.id;
				
				issueServices.getIssueById(issueId)
					.then(function(issueData){
						$scope.issue = issueData.data;
						$scope.issue.DueDate = new Date($scope.issue.DueDate);
						$scope.issue.PriorityId = $scope.issue.Priority.Id;
						$scope.issue.AvailablePriorities = sessionStorage['availablePriorities'];
						$scope.issue.Labels = makeToString($scope.issue.Labels);
						if($scope.issue.Assignee.Id === sessionStorage['userId']){
							$scope.isAssignee = true;
						}else{
							$scope.isAssignee = false;
						}
						
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
			
			$scope.getAllUsersToMakeAssignee = function(){
				adminServices.getUsers()
					.then(function(usersData){
						$scope.usersForAssignee =  usersData.data;
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.editIssue = function(issue){
				var issueId = $routeParams.id;
				issue.Labels = makeToAsociativeArr(issue.Labels, '; ');
				if(!issue.AssigneeId){
					issue.AssigneeId = issue.Assignee.Id;
				}
				
				issueServices.editIssue(issueId, issue)
					.then(function(issueData){
						//console.log(issueData);
						sessionStorage['successMsg'] = 'Edited issue successfuly';
						$location.path('/issues/' + issueId);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			//---------------------------------------------
			
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