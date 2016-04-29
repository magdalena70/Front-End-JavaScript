'use strict'

angular.module('issueTrackingSystemApp.common.projectsAndIssuesHelpers', [])
	.factory('projectsAndIssuesHelpers', [
		function(){
			// using for project.Labels, project.Priorities, issue.Labels, issue.Priorities
			function makeToAsociativeArr(str, splitBy){
				var strToArr = str.split(splitBy),  arr = [];
				
				angular.forEach(strToArr, function(elem){
					if(elem != false){
						elem = elem.trim();
						var obj = {"Name": elem};
						arr.push(obj);
					}
				});
				
				return arr;
			}
			
			function makeToString(asociativeArr){
				var str = '';
				angular.forEach(asociativeArr, function(obj){
							str += obj.Name + '; ';
						});
				return str;
			}
			// end
			
			return{
				makeToAsociativeArr: makeToAsociativeArr,
				makeToString: makeToString
			};
		}]);