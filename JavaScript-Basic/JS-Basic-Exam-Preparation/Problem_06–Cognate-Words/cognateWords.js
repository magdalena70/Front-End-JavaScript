function solve(arr) {
    if (arr) {
        //console.log(arr);
        var i, y, x, lineArr, index,
            firstWord, secondWord, wordResult1, wordResult2, resultStr1, resultStr2,
            noResult = true, result = {}, elem;
        
        for (i in arr) {
            lineArr = arr[i].split(/[^a-zA-Z]/g).filter(function (elem) {
                return elem;
            });
            
            for (index in lineArr) {
                firstWord = lineArr[index];
                
                for (y = 1; y < lineArr.length; y++) {
                    secondWord = lineArr[y];
                    
                    for (x in lineArr) {
                        wordResult1 = firstWord + secondWord;
                        wordResult2 = secondWord + firstWord;
                        
                        if (wordResult1 === lineArr[x] && !result[wordResult1]) {
                            noResult = false;
                            resultStr1 = firstWord + '|' + secondWord + '=' + lineArr[x];
                            result[wordResult1] = [resultStr1];
                        }
                        
                        if (wordResult2 === lineArr[x] && !result[wordResult2]) {
                            noResult = false;
                            resultStr2 = secondWord + '|' + firstWord + '=' + lineArr[x];
                            result[wordResult2] = [resultStr2];
                        }
                    }
                }
            }
            
            if (noResult) {
                console.log('No');
            } else {
                for (elem in result) {
                    console.log(result[elem][0]);
                }
            }
        }
    }
}

var arr = ['java..?|basics/*-+=javabasics'];
var arr2 = ['Hi, Hi, Hihi'];
var arr3 = ['Uni(lo,.ve=I love SoftUni (Soft)'];
var arr4 = ['Lo rem ips um dol or si t am et, consectetur adipiscing elit. Fusce et ultricies ipsum. Phasellus vitae justo rutrum, tempor mauris in, posuere lectus. Nunc accumsan, neque et ultricies faucibus, metus est commodo turpis, eget mattis lorem leo quis ante. Sed tincidunt ornare tincidunt. Mauris aliquam posuere sapien et blandit. Aenean sit amet nunc vel felis feugiat rutrum. Quisque aliquet arcu sed velit fringilla, vitae pharetra diam fringilla.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et ultricies ipsum. Phasellus vitae justo rutrum, tempor mauris in, posuere lectus. Nunc accumsan, neque et ultricies faucibus, metus est commodo turpis, eget mattis lorem leo quis ante. Sed tincidunt ornare tincidunt. Mauris aliquam posuere sapien et blandit. Aenean sit amet nunc vel felis feugiat rutrum. Quisque aliquet arcu sed velit fringilla, vitae pharetra diam fringilla.'];
solve(arr4);