'use strict';

angular.module('issueTrackingSystemApp.home', [
		'issueTrackingSystemApp.users.authentication'
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
		function($scope, $location, authentication) {
		
			$scope.register = function(user){
				//console.log(user);
				$scope.registerUserData = user;
				$scope.registerUserData.username = user.email;
				authentication.registerUser(user)
					.then(function(){
						$scope.login($scope.registerUserData);
					})
			}
			
			$scope.login = function(user){
				//console.log(user);
				authentication.loginUser("username=" + user.username + "&password=" + user.password + "&grant_type=password")
					.then(function(loggedInUser){
						//console.log(loggedInUser);
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
	}]);