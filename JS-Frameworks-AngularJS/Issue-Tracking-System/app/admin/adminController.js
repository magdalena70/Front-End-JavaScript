'use strict'

angular.module('issueTrackingSystemApp.admin', [
		'issueTrackingSystemApp.admin.adminServices',
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.issues.issueServices'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/admin/makeAdmin', {
			templateUrl: 'app/admin/templates/make-admin.html',
			controller: 'AdminsController'
		});
		
		$routeProvider.when('/admin/users/all', {
			templateUrl: 'app/admin/templates/all-users.html',
			controller: 'AdminsController'
		});
		
		$routeProvider.when('/admin/users/:username/info', {
			templateUrl: 'app/admin/templates/admin-user-info.html',
			controller: 'AdminsController'
		});
	}])
	.controller('AdminsController', [
		'$scope',
		'$location',
		'$routeParams',
		'adminServices',
		'projectServices',
		'issueServices',
		function($scope, $location, $routeParams, adminServices, projectServices, issueServices){
			
			// pagination
			$scope.curPage = 0;
			$scope.pageSize = 10;
			$scope.getAllUsers = function(){
				adminServices.getUsers()
					.then(function(usersData){
						$scope.users = usersData.data;
						$scope.usersCount = usersData.data.length;
						
						if($scope.users.length){
							$scope.numberOfPages = function(){
								return Math.ceil($scope.users.length / $scope.pageSize);
							}
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			//------------
			
			$scope.makeAdmin = function(user){
				adminServices.makeAdmin({"userId": user.userId})
					.then(function(response){
						sessionStorage['successMsg'] = 'Made admin successfuly';
						$location.path('/admin/users/all');
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.getUserProjects = function(){
				var username = $routeParams.username;
				
				projectServices.getUserProjects(username)
					.then(function(userProjectsData){
						$scope.userProjects = userProjectsData.data.Projects;
						if($scope.userProjects.length){
							$scope.projectsCount = $scope.userProjects.length;
						}else{
							$scope.projectsCount = 'No projects';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.getUserIssues = function(){
				var username = $routeParams.username;
				
				issueServices.getUserIssues(username)
					.then(function(userIssuesData){
						$scope.userIssues = userIssuesData.data.Issues;
						if($scope.userIssues.length){
							$scope.issuesCount = $scope.userIssues.length;
						}else{
							$scope.issuesCount = 'No issues';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
	}]);