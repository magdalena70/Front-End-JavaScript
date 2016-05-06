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
			
			function checkIfSomeMessage(storageKey){
				if($sessionStorage[storageKey]){
					return true;
				}else{
					return false;
				}
			}
			
			function showSuccessMessageBox_style(){
				return {
						"background-color": "rgba(241, 140, 25, 0.6)"
					};
			}
			
			function showErrorMessageBox_style(){
				return {
						"background-color": "rgba(212, 10, 0, 0.6)"
					};
			}
			
			function hideMessageBox_style(){
				return {
					"background-color": "transparent"
				};
			}
			
			function deleteMessage(storageKey){
				delete $sessionStorage[storageKey];
			}
		
			return{
				setMessage: setMessage,
				getMessage: getMessage,
				checkIfSomeMessage: checkIfSomeMessage,
				showSuccessMessageBox_style: showSuccessMessageBox_style,
				showErrorMessageBox_style: showErrorMessageBox_style,
				hideMessageBox_style: hideMessageBox_style,
				deleteMessage: deleteMessage
			};
		}
	]);