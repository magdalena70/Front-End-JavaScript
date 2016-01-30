function solve(arr) {
    if (arr && arr.length >= 3) {
        var encryptedString = arr[0], magicNumber = Number(arr[1]),
            i, rowIndexFirstElem, colIndexFirstElem, rowIndexSecondElem, colIndexSecondElem, index, char,
            matrix = [], matrixRow = [], magicIndexArr = [], result = '',
            firstValue, secondValue, sumPositions = 0;
        
        for (i = 2; i < arr.length; i++) {
            matrixRow = arr[i].split(' ');
            matrix.push(matrixRow);
        }
        
        for (rowIndexFirstElem = 0; rowIndexFirstElem < matrix.length; rowIndexFirstElem++) {
            for (colIndexFirstElem = 0; colIndexFirstElem < matrixRow.length; colIndexFirstElem++) {
                firstValue = Number(matrix[rowIndexFirstElem][colIndexFirstElem]);
                
                for (rowIndexSecondElem = 0; rowIndexSecondElem < matrix.length; rowIndexSecondElem++) {
                    for (colIndexSecondElem = 1; colIndexSecondElem < matrixRow.length; colIndexSecondElem++) {
                        secondValue = Number(matrix[rowIndexSecondElem][colIndexSecondElem]);
                        
                        if (firstValue + secondValue === magicNumber) {
                            //console.log(firstValue+'->' + secondValue);
                            magicIndexArr.push(rowIndexFirstElem, colIndexFirstElem, rowIndexSecondElem, colIndexSecondElem);
                            break;
                        }
                    }
                }
                
                if (magicIndexArr.length > 0) {
                    break;
                }
            }
        }
        
        //console.log(magicIndexArr);
        for (index in magicIndexArr) {
            sumPositions += magicIndexArr[index];
        }
        
        //console.log(encryptedString);
        for (char = 0; char < encryptedString.length; char++) {
            if (char === 0) {
                result += String.fromCharCode(encryptedString[char].charCodeAt(0) + sumPositions);
            } else if (char % 2 !== 0) {
                result += String.fromCharCode(encryptedString[char].charCodeAt(0) - sumPositions);
            } else {
                result += String.fromCharCode(encryptedString[char].charCodeAt(0) + sumPositions);
            }
        }
        
        console.log(result);
    }
}

var arr = [
    'QqdvSpg',
    '400',
    '100 200 120',
    '120 300 310',
    '150 290 370'
];
var arr2 = [
    '>scsimh$deo$]$^mnxdh]}',
    '400',
    '200 100 120',
    '120 102 300',
    '150 290 370'
];
solve(arr2);