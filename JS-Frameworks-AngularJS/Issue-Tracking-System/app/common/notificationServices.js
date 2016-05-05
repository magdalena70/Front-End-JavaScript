'use strict'

angular.module('issueTrackingSystemApp.common.notificationServices', ['ngStorage'])
	.factory('notificationServices', [
		'$sessionStorage',
		function($sessionStorage){
			
			function setMessage(storageKey, message){
				$sessionStorage[storageKey] = message;
			}
			
			function getMessage(storageKey){
				if($sessionStorage[storageKey]){
					return $sessionStorage[storageKey];
				}
			}
		
			return{
				setMessage: setMessage,
				getMessage: getMessage
			};
		}
	]);