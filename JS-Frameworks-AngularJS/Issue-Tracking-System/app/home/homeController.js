'use strict';

angular.module('issueTrackingSystemApp.home', [
		'issueTrackingSystemApp.users.authenticationServices',
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.issues.issueServices'
	])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/', {
		  templateUrl: 'app/home/templates/home.html',
		  controller: 'HomeController'
	  });
	  
	  $routeProvider.when('/logout', {
		  templateUrl: 'app/users/templates/logout.html',
		  controller: 'HomeController'
	  });
	}])
	.controller('HomeController', [
		'$scope',
		'$location',
		'authenticationServices',
		'projectServices',
		'issueServices',
		function($scope, $location, authenticationServices, projectServices, issueServices) {
		
			$scope.register = function(user){
				$scope.registerUserData = user;
				$scope.registerUserData.username = user.email;
				authenticationServices.registerUser(user)
					.then(function(){
						$scope.login($scope.registerUserData);
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					})
			}
			
			$scope.login = function(user){
				authenticationServices.loginUser("username=" + user.username + "&password=" + user.password + "&grant_type=password")
					.then(function(loggedInUser){
						sessionStorage['accessToken'] = loggedInUser.access_token;
						$scope.getUserInfo();
						sessionStorage['successMsg'] = 'Logged in successfuly';
						$location.path('/');
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			//get isAdmin for current user
			$scope.getUserInfo = function(){
				authenticationServices.getUserInfo()
					.then(function(userData){
						sessionStorage['userId'] = userData.data.Id;
						sessionStorage['currentUserUsername'] = userData.data.Username;
						if(userData.data.isAdmin === true){
							sessionStorage['isAdmin'] = userData.data.isAdmin;
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.logout = function(){
				authenticationServices.logout()
					.then(function(success){
						sessionStorage.clear();
						sessionStorage['successMsg'] = 'Logout successfuly';
						$location.path('/');
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			// pagination
			$scope.curPage = 0;
			$scope.pageSize = 10;
			
			$scope.getMyProjects = function(){
				var username = sessionStorage['currentUserUsername'];
	
				projectServices.getUserProjects(username)
					.then(function(myProjectsData){
						$scope.myProjects = myProjectsData.data.Projects;
						if($scope.myProjects.length){
							$scope.myProjectsCount = $scope.myProjects.length;
						}else{
							$scope.myProjectsCount = 'No projects';
						}
						
						if($scope.myProjects.length){
							$scope.numberOfPages = function(){
								return Math.ceil($scope.myProjects.length / $scope.pageSize);
							}
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.getMyIssues = function(){
				issueServices.getMyIssues()
					.then(function(issuesData){
						$scope.issues = issuesData.data.Issues;
						if($scope.issues.length){
							$scope.myIssuesCount = $scope.issues.length;
						}else{
							$scope.myIssuesCount = 'No issues';
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
	}]);