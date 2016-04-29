'use strict'

angular.module('issueTrackingSystemApp.common.datepicker', [])
	.directive('datePicker', [function(){
		return{
			restict: 'A',
			link: function(scope, element){
				element.datepicker();
			}
		};
	}]);