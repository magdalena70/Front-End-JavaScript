'use strict'

angular.module('issueTrackingSystemApp.issues', [
		'issueTrackingSystemApp.issues.issueServices',
		'issueTrackingSystemApp.admin.adminSettings'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/projects/:id/add-issue', {
			templateUrl: 'app/issues/add-issue.html',
			controller: 'IssuesController'
		});
		
		$routeProvider.when('/issues/:id/edit', {
			templateUrl: 'app/issues/edit-issue.html',
			controller: 'IssuesController'
		});
		
		$routeProvider.when('/issues/:id', {
			templateUrl: 'app/issues/issue-details.html',
			controller: 'IssuesController'
		});
	}])
	.controller('IssuesController', [
		'$scope',
		'$routeParams',
		'$location',
		'issueServices',
		'adminSettings',
		function($scope, $routeParams, $location, issueServices, adminSettings){
			
			$scope.changeIssueStatus = function(statusId, issue){
				var issueId = $routeParams.id;
				
				console.log(statusId);
				console.log(issue);
				issueServices.changeIssueStatus(issueId, statusId, issue)
					.then(function(issueData){
						console.log(issueData);
						$location.path('/');
					});
			}
			
			$scope.getAllUsersToMakeAssignee = function(){
				adminSettings.getUsers()
					.then(function(usersData){
						$scope.usersForAssignee =  usersData.data;
					},
					function(error){
						console.log(error);
					});
			}
			$scope.getAllUsersToMakeAssignee();
			
			$scope.editIssue = function(issue){
				var issueId = $routeParams.id;
				issue.Labels = makeStrToAsociativeArr(issue.Labels, '; ');
				if(!issue.AssigneeId){
					issue.AssigneeId = issue.Assignee.Id;
				}
				
				issueServices.editIssue(issueId, issue)
					.then(function(issueData){
						console.log(issueData);
						$location.path('/issues/' + issueId);
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
			
			function getIssueById(){
				var issueId = $routeParams.id;
				
				issueServices.getIssueById(issueId)
					.then(function(issueData){
						console.log(issueData);
						$scope.issue = issueData.data;
						$scope.issue.DueDate = new Date($scope.issue.DueDate);
						$scope.issue.PriorityId = $scope.issue.Priority.Id;
						$scope.issue.AvailablePriorities = sessionStorage['availablePriorities'];
						$scope.issue.Labels = makeToString($scope.issue.Labels);
						if($scope.issue.Assignee.Username === sessionStorage['currentUserUsername']){
							$scope.isAssignee = true;
						}else{
							$scope.isAssignee = false;
						}
					});
			}
			getIssueById();
	}]);