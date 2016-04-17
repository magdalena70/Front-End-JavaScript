'use strict'

angular.module('issueTrackingSystemApp.issues', [])
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
		function($scope, $routeParams, $location, issueServices){
			
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
			
			function getIssueById(){
				var issueId = $routeParams.id;
				
				issueServices.getIssueById(issueId)
					.then(function(issueData){
						console.log(issueData);
						$scope.issue = issueData.data;
						if($scope.issue.Assignee.Username === sessionStorage['currentUserUsername']){
							$scope.isAssignee = true;
						}else{
							$scope.isAssignee = false;
						}
					});
			}
			getIssueById();
	}]);