'use strict'

angular.module('issueTrackingSystemApp.users.userIdentityServices', ['ngStorage'])
	.factory('userIdentity', [
		'$localStorage',
		function($localStorage){
			
			function setCurrentUserAccessToken(responseData){
				if(responseData.access_token){
					$localStorage['accessToken'] = responseData.access_token;
				}
			}
			
			function getRequestHeaders(){
				if($localStorage.accessToken){
					var accessToken = $localStorage.accessToken,
						headers = {headers: { 'Authorization': 'Bearer ' + accessToken }};
						return headers;
				}
			}
			
			function setCurrentUserInfo(responseData){
				if(responseData.Id){
					$localStorage['userId'] = responseData.Id;
				}
				
				if(responseData.Username){
					$localStorage['currentUserUsername'] = responseData.Username;
				}
				
				if(responseData.isAdmin === true){
					$localStorage['isAdmin'] = responseData.isAdmin;
				}
			}
			
			function clearCurrentUserInfo(){
				$localStorage.$reset();
			}
			
			function getCurrentUserUsername(){
				if($localStorage['currentUserUsername']){
					return $localStorage['currentUserUsername'];
				}
			}
			
			function checkIfCurrentUserIsAuthenticated(){
				if($localStorage['accessToken']){
					return true;
				}else{
					 return false;
				}
			}
			
			function checkIfCurrentUserIsAdmin(){
				if($localStorage['isAdmin']){
					return true;
				}else{
					 return false;
				}
			}
			
			function checkIfCurrentUserIsProjectLeader(projectData){
				if(projectData.Lead.Id === $localStorage['userId']){
					return true;
				}else{
					return false;
				}
			}
			
			function checkIfCurrentUserIsIssueAssignee(issueData){
				if(issueData.Assignee.Id === $localStorage['userId']){
					return true;
				}else{
					return false;
				}
			}
		
			return{
				setCurrentUserAccessToken: setCurrentUserAccessToken,
				getRequestHeaders: getRequestHeaders,
				setCurrentUserInfo: setCurrentUserInfo,
				clearCurrentUserInfo: clearCurrentUserInfo,
				getCurrentUserUsername: getCurrentUserUsername,
				checkIfCurrentUserIsAuthenticated: checkIfCurrentUserIsAuthenticated,
				checkIfCurrentUserIsAdmin: checkIfCurrentUserIsAdmin,
				checkIfCurrentUserIsProjectLeader: checkIfCurrentUserIsProjectLeader,
				checkIfCurrentUserIsIssueAssignee: checkIfCurrentUserIsIssueAssignee
			};
		}
	]);