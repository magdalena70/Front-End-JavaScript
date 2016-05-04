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
						//sessionStorage['accessToken'] = loggedInUser.access_token;
						localStorage['accessToken'] = loggedInUser.access_token;
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
						//sessionStorage['userId'] = userData.data.Id;
						//sessionStorage['currentUserUsername'] = userData.data.Username;
						localStorage['userId'] = userData.data.Id;
						localStorage['currentUserUsername'] = userData.data.Username;
						if(userData.data.isAdmin === true){
							//sessionStorage['isAdmin'] = userData.data.isAdmin;
							localStorage['isAdmin'] = userData.data.isAdmin;
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
						localStorage.clear();
						sessionStorage['successMsg'] = 'Logout successfuly';
						$location.path('/');
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.getMyProjects = function(){
				//var username = sessionStorage['currentUserUsername'],
				var username = localStorage['currentUserUsername'],
					pageSize = 300,
					pageNumber = 1;
					
				// pagination
				$scope.myProjectsCurPage = 0;
				$scope.myProjectsPageSize = 3;
	
				projectServices.getUserProjects(pageSize, pageNumber, username)
					.then(function(myProjectsData){
						$scope.myProjects = myProjectsData.data.Projects;
						if($scope.myProjects.length){
							$scope.myProjectsCount = $scope.myProjects.length;
						}else{
							$scope.myProjectsCount = 'No projects';
						}
						
						// pagination
						if($scope.myProjects.length){
							$scope.myProjectsNumberOfPages = function(){
								return Math.ceil($scope.myProjects.length / $scope.myProjectsPageSize);
							}
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.getMyIssues = function(){
				var pageSize = 300,
					pageNumber = 1;
					
				// pagination
				$scope.myIssuesCurPage = 0;
				$scope.myIssuesPageSize = 3;
				
				issueServices.getMyIssues(pageSize, pageNumber)
					.then(function(issuesData){
						$scope.myIssues = issuesData.data.Issues;
						if($scope.myIssues.length){
							$scope.myIssuesCount = $scope.myIssues.length;
						}else{
							$scope.myIssuesCount = 'No issues';
						}
						
						// pagination
						if($scope.myIssues.length){
							$scope.myIssuesNumberOfPages = function(){
								return Math.ceil($scope.myIssues.length / $scope.myIssuesPageSize);
							}
						}
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
	}]);