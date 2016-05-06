'use strict'

angular.module('issueTrackingSystemApp.common.dialogModal', [])
	.directive('dialogModal', [function(){
		return{
			restict: 'A',
			link: function(scope, element){
				element.dialog({
					width: 600,
					autoOpen: false,
					show: {
						//effect: "blind",
						effect: "explode",
						duration: 1000
					},
					hide: {
						effect: "explode",
						duration: 1000
					}
				});
 
				$( ".openerBtn" ).click(function() {
					element.dialog( "open" );
				});
			}
		};
	}]);