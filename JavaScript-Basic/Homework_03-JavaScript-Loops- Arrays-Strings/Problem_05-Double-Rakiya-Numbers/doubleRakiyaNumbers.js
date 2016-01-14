function doubleRakiyaNumbers(arr) {
    if (arr && arr.length >= 2 &&
         arr[0] !== '' && arr[1] !== '' &&
         arr[0] !== null && arr[1] !== null && 
    Number(arr[0]) >= 1 && Number(arr[0]) < 1000000000 &&
    Number(arr[1]) > 1 && Number(arr[1]) <= 1000000000) {
        var start = arr[0], end = arr[1],
            checkedStr, substrLength = 2, index;
        
        function printAll(inputStart, inputEnd) {
            var i;
            
            console.log('<ul>');
            for (i = Number(inputStart); i <= Number(inputEnd); i++) {
                checkedStr = i.toString();
                console.log('<li><span class=\'num\'>' + checkedStr + '</span></li>');
            }
            console.log('</ul>');
        }
        
        function printCheckedString(str) {
            var startIndexSubstr = 0, startIndexOf = 2,
                resultIndexOf, isRakiya;
            
            while (startIndexOf < str.length - 1) {
                substring = str.substr(startIndexSubstr, substrLength);
                resultIndexOf = str.indexOf(substring, startIndexOf);
                //console.log(substring + ' -> ' + resultIndexOf);
                
                if (resultIndexOf != -1) {
                    isRakiya = true;
                    console.log('<li><span class=\'rakiya\'>' + str + '</span><a href="view.php?id=' + str + '">View</a></li>');
                    break;
                }
                
                isRakiya = false;
                startIndexSubstr++;
                startIndexOf++;
            }
            
            if (isRakiya == false) {
                console.log('<li><span class=\'num\'>' + str + '</span></li>');
            }
        }
        
        
        if (end.length <= 3) {
            printAll(start, end);
        } else if (start.length <= 3 && end.length == 4) {
            console.log('<ul>');
            for (index = Number(start); index <= Number(end); index++) {
                checkedStr = index.toString();
                if (checkedStr.length < 4) {
                    console.log('<li><span class=\'num\'>' + checkedStr + '</span></li>');
                } else {
                    printCheckedString(checkedStr);
                }
            }
            
            console.log('</ul>');
        } else if (start.length > 3 || end.length > 3) {
            console.log('<ul>');
            for (index = Number(start); index <= Number(end); index++) {
                checkedStr = index.toString();
                printCheckedString(checkedStr);
            }
            
            console.log('</ul>');
        }
    }
}

//doubleRakiyaNumbers(['5', '8']); 
//doubleRakiyaNumbers(['998', '1011']);
//doubleRakiyaNumbers(['1212', '1215']);
//doubleRakiyaNumbers(['9999', '10010']);
doubleRakiyaNumbers(['11210', '11215']);
//doubleRakiyaNumbers(['55555', '55561']);
//doubleRakiyaNumbers(['203103', '203109']);
//doubleRakiyaNumbers(['5210217', '5210221']);
//doubleRakiyaNumbers(['21212121', '21212130']);
doubleRakiyaNumbers(['999999999' , '1000000000']);

doubleRakiyaNumbers(['999999999' , '1000000001']); // out of range
doubleRakiyaNumbers(['0' , '3']); // out of range
doubleRakiyaNumbers([]); // empty array
doubleRakiyaNumbers(); // empty input
doubleRakiyaNumbers(['null' , null]); // array with incorect values
doubleRakiyaNumbers(['-6' , '-15']); // values must be positive