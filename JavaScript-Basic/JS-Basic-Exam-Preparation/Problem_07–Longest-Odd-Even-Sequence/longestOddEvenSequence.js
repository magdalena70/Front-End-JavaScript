function solve(arr){
    if (arr) {
        //console.log(arr);
        var i, lineArr, evenIndex, evenIndexNum, oddIndex, oddIndexNum, count = 1, maxCount = 0;

        for (i in arr) {
            lineArr = arr[i].replace(/[\s\s+]+/g, '').split(/[\(|\)]/g);
            lineArr = lineArr.filter(function (elem) { return elem; });
            //console.log(lineArr);
            for (evenIndex = 0; evenIndex < lineArr.length; evenIndex += 1) {
                evenIndexNum = lineArr[evenIndex];
                //console.log(evenIndexNum);
                oddIndex = evenIndex + 1;
                if(oddIndex < lineArr.length){
                    oddIndexNum = lineArr[oddIndex];
                    //console.log(oddIndexNum);

                    if ((evenIndexNum % 2 == 0  && oddIndexNum % 2 != 0 || oddIndexNum == 0) ||
                         (evenIndexNum % 2 != 0 || evenIndexNum == 0 && oddIndexNum % 2 == 0)) {
                        count += 1;
                        //console.log(count, evenIndexNum, oddIndexNum);
                    }
                    
                    if (evenIndexNum != 0 && oddIndexNum != 0) {
                        if ((evenIndexNum % 2 == 0 && oddIndexNum % 2 == 0) ||
                         (evenIndexNum % 2 != 0 && oddIndexNum % 2 != 0)) {
                            count = 1;
                        }
                    }

                    if (maxCount < count) {
                        maxCount = count;
                    }
                }
            }

            console.log(maxCount);
        }
    }
}

var arr = ['(3) (22) (-18) (55) (44) (3) (21)'];
var arr2 = ['(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)'];
var arr3 = ['( 2 )  ( 33 ) (1) (4)   (  -1  )'];
var arr4 = ['(102)(103)(0)(105)  (107)(1)'];
var arr5 = ['(2) (2) (2) (2) (2)'];
var arr6 = ['(102)(103)(0)(105)  (107)(1)'];
var arr7 = ['(1) (0) (0) (0) (0) (0) (1)'];
var arr8 = ['(2) (3) (4) (0) (6) (7) (8) (0) (10) (0) (-12) (2) (3) (4) (5) (6)'];
solve(arr7);