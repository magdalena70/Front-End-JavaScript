'use strict'

angular.module('issueTrackingSystemApp.admin', [
		'issueTrackingSystemApp.admin.adminSettings',
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
		'adminSettings',
		'projectServices',
		'issueServices',
		function($scope, $location, $routeParams, adminSettings, projectServices, issueServices){
			
			$scope.getAllUsers = function(){
				adminSettings.getUsers()
					.then(function(usersData){
						$scope.users = usersData.data;
						$scope.usersCount = usersData.data.length;
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.makeAdmin = function(user){
				adminSettings.makeAdmin({"userId": user.userId})
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
							$scope.projectMessage = '';
						}else{
							$scope.projectMessage = 'No projects';
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
							$scope.issueMessage = '';
						}else{
							$scope.issueMessage = 'No issues';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
	}]);