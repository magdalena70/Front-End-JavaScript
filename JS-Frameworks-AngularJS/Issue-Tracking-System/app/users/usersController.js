'use strict'

angular.module('issueTrackingSystemApp.users', [
		'issueTrackingSystemApp.users.profileSettingsServices'
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
		function($scope, $location, profileSettingsServices){
			
			// '/profile/password'
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
			// end
	}]);