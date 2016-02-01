function solve(arr) {
    if (arr.length) {
        //console.log(arr);
        var strRows = '', strResult = [], index, i, k, y,
            sequenceLength = Number(arr[arr.length - 1]);
        
        for (index = 0; index < arr.length - 1; index++) {
            strRows += ' | ' + arr[index];
        }
        
        strResult = strRows.replace(/[\s\s+]+/g, ' ').split(' ');
        for (i = 0; i < strResult.length; i++) {
           
            if (strResult[i] === '|' && strResult[i + 1] !== '|' && strResult[i-1] === strResult[i + 1]) {
                
                for (k = i + 1; k > i + 1 - sequenceLength; k--) {
                    if (strResult[k] !== '|') {
                        strResult[k] = '*';
                    } else {
                        strResult[k] = '|';
                    }
                }
            }

            if (strResult[i] !== '|' && strResult[i + 1] !== '|' && strResult[i] === strResult[i+1]) {
                
                for (var k = i + 1; k > i + 1 - sequenceLength; k--) {
                    strResult[k] = '*';
                }
            }

            if (strResult[i] !== '|' && strResult[i + 1] === '|' && strResult[i] === strResult[i + 2]) {
                
                for (var k = i + 2; k > i + 2 - (sequenceLength+1); k--) {
                    //console.log(k + ' -> ' + strResult[k]);
                    if(strResult[k] !== '|') {
                        strResult[k] = '*';
                    } else {
                        strResult[k] = '|';
                    }
                }
            }
        }
        
        strResult = strResult.join('').split('|').filter(Boolean);      
        for (y in strResult) {
            var count = 0;
            var output = '';
            for (var el in strResult[y]) {
                if (strResult[y][el] === '*') {
                    count++
                    if (count === strResult[y].length) {
                        output = '(empty)';
                    }
                }
                else {
                    output += strResult[y][el] + ' ';
                }
            }
            console.log(strResult[y]);
            console.log(output);
        }
    }
}

var arr = [
    '3 3 3 2 5 9 9 9 9 1 2',
    '1 1 1 1 1 2 5 8 1 1 7',
    '7 7 1 2 3 5 7 4 4 1 2',
    '2'
];
/*
3 2 5 1 2
1 2 5 8
7 1 2 3 5 7 1 2
*/
var arr2 = ['2 1 1 1', '1 1 1', '3 7 3 3 1', '1'];
/*
2
(empty)
3 7 1
*/
solve(arr2);