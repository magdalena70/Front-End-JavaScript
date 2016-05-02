'use strict'

angular.module('issueTrackingSystemApp.common.popover', [])
	.directive('popover', [function(){
		return{
			restict: 'A',
			link: function(scope, element){
					$('[data-toggle="popover"]').popover();
				}
		};
	}]);