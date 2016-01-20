'use strict'
function stringLettersOrganizer(str, sortedBy){
    if (str && sortedBy === true || sortedBy === false) {
        var strToArr = [], result = '';
        
        // sort by ascending
        if (sortedBy === true) {
            //console.log(str); 
            strToArr = str.split('').sort(function (a, b) {
                return a.toLowerCase() > b.toLowerCase();
            });
            
            result = strToArr.join('');
            console.log(result);
            //console.log(typeof (result)); // check for type
        }
        
        // sort by descending
        if (sortedBy === false) {
            //console.log(str);
            strToArr = str.split('').sort(function (a, b) {
                return a.toLowerCase() < b.toLowerCase();
            });
            
            result = strToArr.join('');
            console.log(result);
            //console.log(typeof (result)); // check for type
        }
    }
}

var input = 'HelloWorld';
stringLettersOrganizer(input, true);
stringLettersOrganizer(input, false);
//output:
// ascending  -> 'deHllloorW'
// descending  -> 'WroolllHed'