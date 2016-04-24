'use strict'

angular.module('issueTrackingSystemApp.common.hideElement', [])
	.directive('hideElement', [function(){
		return{
			restict: 'A',
			link: function(scope, element){
				element.on('click', function(){
					element.hide();
				});
				}
		};
	}]);