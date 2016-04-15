'use strict'

angular.module('issueTrackingSystemApp.admin', [
		'issueTrackingSystemApp.admin.adminSettings'
	])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/admin/makeAdmin', {
			templateUrl: 'app/admin/make-admin.html',
			controller: 'AdminsController'
		});
		
		$routeProvider.when('/admin/users/all', {
			templateUrl: 'app/admin/all-users.html',
			controller: 'AdminsController'
		});
	}])
	.controller('AdminsController', [
		'$scope',
		'$location',
		'adminSettings',
		function($scope, $location, adminSettings){
			
			$scope.getAllUsers = function(){
				adminSettings.getUsers()
					.then(function(usersData){
						$scope.users = usersData.data;
					},
					function(error){
						console.log(error);
					});
			}
			
			$scope.makeAdmin = function(user){
				console.log(user);
				adminSettings.makeAdmin({"userId": user.userId})
					.then(function(response){
						$location.path('/');
					},
					function(error){
						console.log(error.data.Message);
					});
			}
	}]);