'use strict'

angular.module('issueTrackingSystemApp.common.hideModal', [])
	.directive('hideModal', [function(){
		return{
			restict: 'A',
			link: function(scope, element){
				element.on('click', function(ev){
					if($('.ui-dialog')){
						$('.ui-dialog').hide(4000);
					}
				});
			}
		};
	}]);