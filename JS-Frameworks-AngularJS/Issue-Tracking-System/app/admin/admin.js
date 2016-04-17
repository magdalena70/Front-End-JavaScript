'use strict'

angular.module('issueTrackingSystemApp.admin', [
		'issueTrackingSystemApp.admin.adminSettings',
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.issues.issueServices'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/admin/makeAdmin', {
			templateUrl: 'app/admin/make-admin.html',
			controller: 'AdminsController'
		});
		
		$routeProvider.when('/admin/users/all', {
			templateUrl: 'app/admin/all-users.html',
			controller: 'AdminsController'
		});
		
		$routeProvider.when('/admin/users/:username/info', {
			templateUrl: 'app/admin/admin-user-info.html',
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
					},
					function(error){
						console.log(error);
					});
			}
			
			$scope.makeAdmin = function(user){
				console.log(user);
				adminSettings.makeAdmin({"userId": user.userId})
					.then(function(response){
						$location.path('/');
					},
					function(error){
						console.log(error.data.Message);
					});
			}
			
			$scope.getUserProjects = function(){
				var username = $routeParams.username;
				
				projectServices.getUserProjects(username)
					.then(function(userProjectsData){
						$scope.userProjects = userProjectsData.data.Projects;
						console.log($scope.userProjects);
					},
					function(error){
						console.log(error);
					});
			}
			
			$scope.getUserIssues = function(){
				var username = $routeParams.username;
				
				issueServices.getUserIssues(username)
					.then(function(userIssuesData){
						$scope.userIssues = userIssuesData.data.Issues;
						console.log($scope.userIssues);
					},
					function(error){
						console.log(error);
					});
			}
			
	}]);