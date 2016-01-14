function coreModification(numArr){
    var filteredArr = [], downwardNum, filteredArrSortedAsc;

    for(var num in numArr){
        if (numArr[num] >= 0 && numArr[num] <= 400) {
            downwardNum = numArr[num] - ((numArr[num] * 20) / 100);
            filteredArr.push(downwardNum);
        }
    }
    
    filteredArrSortedAsc = filteredArr.sort(function (a, b) { return a - b; });
    console.log(filteredArrSortedAsc);
}

coreModification([200, 120, 23, 67, 350, 420, 170, 212, 401, 615, -1]);

//Output:
//[ 18.4, 53.6, 96, 136, 160, 169.6, 280 ]