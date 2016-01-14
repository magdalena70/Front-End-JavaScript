function arrayManipulator(inputArr){
    var result = [], resultSortedDesc, minNum, maxNum, count = 1;

    for (var item in inputArr) {
        //console.log(typeof(inputArr[item])); -> check for type
        if (typeof(inputArr[item]) == 'number') {
            result.push(inputArr[item]);
        }
    }
    
    resultSortedDesc = result.sort(function (a, b) { return a < b; });
    minNum = resultSortedDesc[resultSortedDesc.length - 1];
    maxNum = resultSortedDesc[0];
    
    for (var i = 0; i < resultSortedDesc.length - 1; i++) {
        if (resultSortedDesc[i] == resultSortedDesc[i + 1]) {
            count++;
        }
    }
    
    console.log('Min number: ' + minNum);
    console.log('Max number: ' + maxNum);
    console.log('Most frequent number: ' + count);
    console.log(resultSortedDesc);


}

arrayManipulator(["Pesho", 2, "Gosho", 12, 2, "true", 9, undefined, 0, "Penka", { bunniesCount : 10 }, [10, 20, 30, 40]]);

//Output:
//Min number: 0
//Max number: 12
//Most frequent number: 2
//[12, 9, 2, 2, 0]