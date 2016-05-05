'use strict'

angular.module('issueTrackingSystemApp.users', [
		'issueTrackingSystemApp.users.profileSettingsServices',
		'issueTrackingSystemApp.common.notificationServices'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/profile/password', {
			templateUrl: 'app/users/templates/change-user-password.html',
			controller: 'UsersController'
		})
	}])
	.controller('UsersController', [
		'$scope',
		'$location',
		'profileSettingsServices',
		'notificationServices',
		function($scope, $location, profileSettingsServices, notificationServices){
			
			// '/profile/password'
			$scope.changePassword = function(user){
				profileSettingsServices.changePassword(user)
					.then(function(success){
						notificationServices.setMessage('successMsg', 'Changed password successfuly');
						$location.path('/');
					},
					function(error){
						notificationServices.setMessage('errorMsg', error.data.Message);
					});
			}
			// end
	}]);