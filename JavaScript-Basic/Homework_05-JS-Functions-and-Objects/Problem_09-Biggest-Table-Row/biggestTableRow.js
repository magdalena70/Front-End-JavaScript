'use strict'
function findBiggestTableRow(arr) {
    if (arr && arr.length <= 1000) {
        //console.log(arr);
        var tableContent = [], store1, store2, store3,
            currentRowSum, maxSum = -3000001, maxIndex, i,
            maxSumElem1, maxSumElem2, maxSumElem3;
        
        for (i = 2; i < arr.length - 1; i++) {
            tableContent.push(arr[i].split(/<tr><td>|<\/td><td>|<\/td><\/tr>/g).filter(Boolean));
        }
        //console.log(tableContent);
        tableContent.forEach(function (elem, index, arr) {
            
            function checkIsNaN(num) {
                var variable;
                
                if (!isNaN(Number(num)) && Number(num) >= -1000000 && Number(num) <= 100000) {
                    variable = Number(num);
                } else {
                    variable = 0;
                }
                
                return variable;
            }
            
            store1 = checkIsNaN(elem[1]);
            store2 = checkIsNaN(elem[2]);
            store3 = checkIsNaN(elem[3]);
            currentRowSum = store1 + store2 + store3;
            console.log(currentRowSum);
            if (maxSum < currentRowSum && currentRowSum !== 0) {
                maxSum = currentRowSum;
                maxIndex = index;
            }
        });
        
        if(maxIndex){
            maxSumElem1 = tableContent[maxIndex][1];
            maxSumElem2 = tableContent[maxIndex][2];
            maxSumElem3 = tableContent[maxIndex][3];

            if (maxSum && maxSumElem1 !== '-' && maxSumElem2 !== '-' && maxSumElem3 !== '-') {
                console.log('%s = %s + %s + %s', maxSum, maxSumElem1, maxSumElem2, maxSumElem3);
            } else if (maxSum && maxSumElem1 !== '-' && maxSumElem2 !== '-' && maxSumElem3 === '-') {
                console.log('%s = %s + %s', maxSum, maxSumElem1, maxSumElem2);
            } else if (maxSum && maxSumElem1 !== '-' && maxSumElem2 === '-' && maxSumElem3 !== '-') {
                console.log('%s = %s + %s', maxSum, maxSumElem1, maxSumElem3);
            } else if (maxSum && maxSumElem1 === '-' && maxSumElem2 !== '-' && maxSumElem3 !== '-') {
                console.log('%s = %s + %s', maxSum, maxSumElem2, maxSumElem3);
            } else if (maxSum && maxSumElem1 !== '-' && maxSumElem2 === '-' && maxSumElem3 === '-') {
                console.log('%s = %s', maxSum, maxSumElem1);
            } else if (maxSum && maxSumElem1 === '-' && maxSumElem2 !== '-' && maxSumElem3 === '-') {
                console.log('%s = %s', maxSum, maxSumElem2);
            } else if (maxSum && maxSumElem1 === '-' && maxSumElem2 === '-' && maxSumElem3 !== '-') {
                console.log('%s = %s', maxSum, maxSumElem3);
            } 
        } else {
            console.log('no data');
        }
    }
}

var input1 = [
    '<table>',
    '<tr><th>Town</th><th>Store1</th><th>Store2</th><th>Store3</th></tr>',
    '<tr><td>Sofia</td><td>26.2</td><td>8.20</td><td>-</td></tr>',
    '<tr><td>Varna</td><td>11.2</td><td>18.00</td><td>36.10</td></tr>',
    '<tr><td>Plovdiv</td><td>17.2</td><td>12.3</td><td>6.4</td></tr>',
    '<tr><td>Bourgas</td><td>-</td><td>24.3</td><td>-</td></tr>',
    '</table>'
],

    input2 = [
        '<table>',
        '<tr><th>Town</th><th>Store1</th><th>Store2</th><th>Store3</th></tr>',
        '<tr><td>Sofia</td><td>-</td><td>-</td><td>-</td></tr>',
        '</table>'
    ],

    input3 = [
        '<table>',
        '<tr><th>Town</th><th>Store1</th><th>Store2</th><th>Store3</th></tr>',
        '<tr><td>Sofia</td><td>12850</td><td>-560</td><td>20833</td></tr>',
        '<tr><td>Rousse</td><td>-</td><td>50000.0</td><td>-</td></tr>',
        '<tr><td>Bourgas</td><td>25000</td><td>-</td><td>25000</td></tr>',
        '</table>'
    ],

    input4 = [
        '<table>',
        '<tr><th>Town</th><th>Store1</th><th>Store2</th><th>Store3</th></tr>',
        '<tr><td>Sofia</td><td>-</td><td>-</td><td>-</td></tr>',
        '<tr><td>Sofia</td><td>-1000000</td><td>-1000000</td><td>-1000000</td></tr>',
        '</table>'
    ];

findBiggestTableRow(input1);
findBiggestTableRow(input2);
findBiggestTableRow(input3);
findBiggestTableRow(input4); // test negative number