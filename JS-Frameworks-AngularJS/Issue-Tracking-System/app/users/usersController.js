'use strict'

angular.module('issueTrackingSystemApp.users', [
		'issueTrackingSystemApp.users.profileSettingsServices'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/profile', {
			templateUrl: 'app/users/templates/edit-profile.html',
			controller: 'UsersController'
		});
		
		$routeProvider.when('/profile/password', {
			templateUrl: 'app/users/templates/change-user-password.html',
			controller: 'UsersController'
		})
	}])
	.controller('UsersController', [
		'$scope',
		'$location',
		'profileSettingsServices',
		function($scope, $location, profileSettingsServices){
			
			$scope.changePassword = function(user){
				profileSettingsServices.changePassword(user)
					.then(function(success){
						sessionStorage['successMsg'] = 'Changed password successfuly';
						$location.path('/');
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
			
			$scope.editProfile = function(user){
				console.log(user);
				profileSettingsServices.editProfile(user)
					.then(function(success){
						//console.log(success);
						sessionStorage['successMsg'] = 'Edited profile successfuly';
						$location.path('/');
					},
					function(error){
						sessionStorage['errorMsg'] = error.data.Message;
					});
			}
	}]);