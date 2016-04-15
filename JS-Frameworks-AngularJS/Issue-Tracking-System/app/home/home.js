'use strict';

angular.module('issueTrackingSystemApp.home', [
		'issueTrackingSystemApp.users.authentication',
		'issueTrackingSystemApp.projects.projectServices',
		'issueTrackingSystemApp.issues.issueServices'
	])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/', {
		  templateUrl: 'app/home/home.html',
		  controller: 'HomeController'
	  });
	  
	  $routeProvider.when('/logout', {
		  templateUrl: 'app/users/logout.html',
		  controller: 'HomeController'
	  });
	}])
	.controller('HomeController', [
		'$scope',
		'$location',
		'authentication',
		'projectServices',
		'issueServices',
		function($scope, $location, authentication, projectServices, issueServices) {
		
			$scope.register = function(user){
				$scope.registerUserData = user;
				$scope.registerUserData.username = user.email;
				authentication.registerUser(user)
					.then(function(){
						$scope.login($scope.registerUserData);
					})
			}
			
			$scope.login = function(user){
				authentication.loginUser("username=" + user.username + "&password=" + user.password + "&grant_type=password")
					.then(function(loggedInUser){
						sessionStorage['accessToken'] = loggedInUser.access_token;
						$scope.getUserInfo();
						$location.path('/');
					},
					function(error){
						console.log(error);
					});
			}
			
			$scope.getUserInfo = function(){
				authentication.getUserInfo()
					.then(function(userData){
					console.log(userData);
						sessionStorage['userId'] = userData.data.Id;
						sessionStorage['currentUserUsername'] = userData.data.Username;
						if(userData.data.isAdmin === true){
							sessionStorage['isAdmin'] = userData.data.isAdmin;
						}
					});
			}
			
			$scope.logout = function(){
				authentication.logout()
					.then(function(success){
						sessionStorage.clear();
						$location.path('/');
					},
					function(error){
						console.log(error);
					});
			}
			
			$scope.getMyProjects = function(){
				projectServices.getAllProjects()
					.then(function(projectsData){
						var projects = [];
						angular.forEach(projectsData.data, function(project){
							if(project.Lead.Username == sessionStorage['currentUserUsername']){
								projects.push(project);
							}
						});
						$scope.myProjects = projects;
					});
			}
			
			$scope.getMyIssues = function(){
				issueServices.getMyIssues()
					.then(function(issuesData){
						$scope.issues = issuesData.data.Issues;
						console.log($scope.issues);
					},
					function(error){
						console.log(error);
					});
			}
	}]);