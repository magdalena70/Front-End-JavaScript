'use strict';

angular.module('issueTrackingSystemApp.home', [
		'issueTrackingSystemApp.users.authentication'
	])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/', {
		  templateUrl: 'app/home/home.html',
		  controller: 'HomeController'
	  });
	}])
	.controller('HomeController', [
		'$scope',
		'authentication',
		function($scope, authentication) {
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
						console.log(loggedInUser);
						sessionStorage['accessToken'] = loggedInUser.access_token;
						sessionStorage['currentUserUsername'] = loggedInUser.userName;
					},
					function(error){
						console.log(error);
					});
			}
	}]);