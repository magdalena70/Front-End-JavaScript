'use strict'

angular.module('issueTrackingSystemApp.issues.issueServices', [
		'issueTrackingSystemApp.users.userIdentityServices'
	])
	.factory('issueServices', [
		'$http',
		'$q',
		'BASE_URL',
		'userIdentity',
		function($http, $q, BASE_URL, userIdentity){
			var headers = userIdentity.getRequestHeaders();
			
			function getAllIssues(pageSize, pageNumber){
				var defer = $q.defer();
				
				$http.get(BASE_URL + 'issues/?pageSize='+ pageSize +
					'&pageNumber=' + pageNumber + '&filter=', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getMyIssues(pageSize, pageNumber){
				var defer = $q.defer();
				
				$http.get(BASE_URL + 'issues/me?orderBy=DueDate desc&pageSize='+
					pageSize + '&pageNumber=' + pageNumber, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getUserIssues(pageSize, pageNumber, username){
				var defer = $q.defer();
				
				$http.get(BASE_URL + 'issues?orderBy=DueDate desc&pageSize=' + pageSize + '&pageNumber=' + pageNumber +
					'&filter=Assignee.Username=="' + username + '"', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getIssueById(id){
				var defer = $q.defer();
				
				$http.get(BASE_URL + 'issues/' + id, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function getCommentsByIssueId(id){
				var defer = $q.defer();
				
				$http.get(BASE_URL + 'issues/' + id + '/comments', headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function addCommentInIssue(id, comment){
				var defer = $q.defer();
				
				$http.post(BASE_URL + 'issues/' + id + '/comments', comment, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function changeIssueStatus(id, statusId, issue){
				var defer = $q.defer();
				
				$http.put(BASE_URL + 'issues/' + id + '/changestatus?statusId=' + statusId, issue, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function editIssue(id, issue){
				var defer = $q.defer();
				
				$http.put(BASE_URL + 'issues/' + id, issue, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			function addIssue(issue){
				var defer = $q.defer();
				
				$http.post(BASE_URL + 'issues', issue, headers)
					.then(function(success){
						defer.resolve(success);
					},
					function(error){
						defer.reject(error);
					});
				
				return defer.promise;
			}
			
			return{
				getAllIssues: getAllIssues,
				getMyIssues: getMyIssues,
				getUserIssues: getUserIssues,
				getIssueById: getIssueById,
				getCommentsByIssueId: getCommentsByIssueId,
				addCommentInIssue: addCommentInIssue,
				changeIssueStatus: changeIssueStatus,
				editIssue: editIssue,
				addIssue: addIssue
			};
	}]);