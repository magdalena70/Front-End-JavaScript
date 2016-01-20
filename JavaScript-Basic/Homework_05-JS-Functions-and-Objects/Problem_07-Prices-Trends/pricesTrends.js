'use strict'
function printPricesTrends(arr) {
    var currentNum, nextNum, trend;

    if (arr) {
        console.log('<table>');
        console.log('<tr><th>Price</th><th>Trend</th></tr>');
        console.log('<tr><td>%s</td><td><img src="fixed.png"/></td></tr>', Number(arr[0]).toFixed(2));
        arr.forEach(function (num, index, arr) {
            if (arr[index + 1]) {
                currentNum = Number(num).toFixed(2);
                nextNum = Number(arr[index + 1]).toFixed(2);

                if (currentNum === nextNum) {
                    trend = 'fixed.png';
                } else if (currentNum < nextNum) {
                    trend = 'up.png';
                } else {
                    trend = 'down.png';
                }

                console.log('<tr><td>%s</td><td><img src="%s"/></td></tr>', nextNum, trend);
            }
        });

        console.log('</table>');
    }
}

var input1 = ['50', '60'];
var input2 = ['36.333', '36.5', '37.019', '35.4', '35', '35.001', '36.225'];
printPricesTrends(input2);