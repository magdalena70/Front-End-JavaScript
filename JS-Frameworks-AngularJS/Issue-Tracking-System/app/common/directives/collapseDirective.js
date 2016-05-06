'use strict'

angular.module('issueTrackingSystemApp.common.collapse', [])
	.directive('collapse', [function(){
		return{
			restict: 'A',
			link: function(scope, element){
				element.collapse();
				
				//first you must add button with class="openCollapse"
				$( ".openCollapse" ).click(function() {
					element.collapse('show');
				});
			}
		};
	}]);