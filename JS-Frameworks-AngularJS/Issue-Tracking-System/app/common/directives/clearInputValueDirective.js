'use strict'

angular.module('issueTrackingSystemApp.common.clearInputValue', [])
	.directive('clearInputValue', [function(){
		return{
			restict: 'A',
			link: function(scope, element){
				element.on('click', function(ev){
					if($('INPUT')){
						$('INPUT').val('');
					}
				});
			}
		};
	}]);