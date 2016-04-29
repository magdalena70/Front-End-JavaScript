'use strict'

angular.module('issueTrackingSystemApp.common.projectsAndIssuesHelpers', [
		'issueTrackingSystemApp.labels.labelServices'
	])
	.factory('projectsAndIssuesHelpers', [
		'labelServices',
		function(labelServices){
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
			
			// using for project.Labels and issue.Labels
			function addLabels(labels){
				if(labels){
					labels = makeToAsociativeArr(labels, ';');
				}
				angular.forEach(labels, function(labelFilter){
					labelServices.getLabels(labelFilter)
						.then(function(labelsData){
							if(labelsData.data.length){
								angular.forEach(labelsData.data, function(label){
									if(label.Name === labelFilter){
										labels.push(label);
									}else{
										labels.push({'Name': labelFilter});
									}
								});
							}else{
								labels.push({'Name': labelFilter});
							}
						});
				});
				
				return labels;
			}
			
			return{
				makeToAsociativeArr: makeToAsociativeArr,
				makeToString: makeToString,
				addLabels: addLabels
			};
		}]);