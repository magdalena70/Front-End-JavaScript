'use strict'

angular.module('issueTrackingSystemApp.users', [
		'issueTrackingSystemApp.users.profileSettingsServices',
		'issueTrackingSystemApp.common.notificationServices'
	])
	.config(['$routeProvider', function($routeProvider){
		var routeChecks = {
					authenticated: ['$q', 'userIdentity', function($q, userIdentity){
						if(userIdentity.checkIfCurrentUserIsAuthenticated()){
							return $q.when(true);
						}
						
						return $q.reject('Unauthorized!');
					}]
			};
	
		$routeProvider.when('/profile/password', {
			templateUrl: 'app/users/templates/change-user-password.html',
			controller: 'UsersController',
			resolve: routeChecks.authenticated
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