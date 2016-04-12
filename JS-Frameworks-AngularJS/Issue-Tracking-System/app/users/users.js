'use strict'

angular.module('issueTrackingSystemApp.users', [
		'issueTrackingSystemApp.users.profileSettings'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/profile', {
			templateUrl: 'app/users/edit-profile.html',
			controller: 'UsersController'
		});
		
		$routeProvider.when('/profile/password', {
			templateUrl: 'app/users/change-user-password.html',
			controller: 'UsersController'
		})
	}])
	.controller('UsersController', [
		'$scope',
		'$location',
		'profileSettings',
		function($scope, $location, profileSettings){
			
			$scope.changePassword = function(user){
				profileSettings.changePassword(user)
					.then(function(success){
						console.log(success);
						$location.path('/');
					});
			}
			
			$scope.editProfile = function(user){
				console.log(user);
				profileSettings.editProfile(user)
					.then(function(success){
						console.log(success);
						$location.path('/');
					});
			}
	}]);