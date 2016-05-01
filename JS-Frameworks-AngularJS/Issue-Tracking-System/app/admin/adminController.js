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
			
			// '/admin/users/all'
			$scope.getAllUsers = function(){
				// pagination
				$scope.allUsersCurPage = 0;
				$scope.allusersPageSize = 5;
			
				adminServices.getUsers()
					.then(function(usersData){
						$scope.users = usersData.data;
						$scope.usersCount = usersData.data.length? usersData.data.length: 'No Users';
						
						// pagination
						if($scope.users.length){
							$scope.allUsersNumberOfPages = function(){
								return Math.ceil($scope.users.length / $scope.allusersPageSize);
							}
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			// end
			
			// '/admin/makeAdmin'
			$scope.getUserToMakeAdmin = function(filterUsername){
				adminServices.getUserToMakeAdmin(filterUsername)
					.then(function(userData){
						console.log(userData);
						if(userData.data.length == 1){
							$scope.userToMakeAdmin = userData.data[0];
							if($scope.userToMakeAdmin.isAdmin===true){
								sessionStorage['errorMsg'] = 'Selected user is an Admin!'
							}else{
								sessionStorage['successMsg'] = 'Selected user: ' + JSON.stringify($scope.userToMakeAdmin);
							}
						}else{
							sessionStorage['errorMsg'] = 'No user with username: ' + filterUsername;
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
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
			// end
			
			// '/admin/users/:username/info'
			if($routeParams.username){
				$scope.selectedUserUsername = $routeParams.username;
			}
			
			$scope.getUserProjects = function(){
				var username = $routeParams.username,
					pageSize = 300,
					pageNumber = 1;
				
				
				projectServices.getUserProjects(pageSize, pageNumber, username)
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
				var username = $routeParams.username,
					pageSize = 300,
					pageNumber = 1;
				
				issueServices.getUserIssues(pageSize, pageNumber, username)
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
			// end
			
	}]);