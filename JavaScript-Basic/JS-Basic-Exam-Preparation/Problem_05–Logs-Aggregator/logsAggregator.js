function solve(arr) {
    if (arr) {
        //console.log(arr);
        var n = arr[0], i, lineArr, ip, user, duration,
            dataObj = {}, keyDataObj = [], sortedKeys, iterator,
            key, value, result = {}, ipAddresses = [], elem;
        
        for (i = 1; i <= n; i++) {
            lineArr = arr[i].split(' ');
            //console.log(lineArr);
            ip = lineArr[0];
            user = lineArr[1];
            duration = Number(lineArr[2]);
            
            if (!dataObj[user]) {
                dataObj[user] = { count: duration };
                dataObj[user][ip] = ip;
            } else {
                dataObj[user].count += duration;
                dataObj[user][ip] = ip;
            }
        }
        
        //console.log(dataObj);
        for (key in dataObj) {
            keyDataObj.push(key);
        }
        
        sortedKeys = keyDataObj.sort();
        for (iterator in sortedKeys) {
            key = sortedKeys[iterator];
            result[key] = [];
            //console.log(dataObj[key]);

            for(value in dataObj[key]){
                if (typeof (dataObj[key][value]) === 'number') {    
                    result[key].push(dataObj[key][value]);
                }
                
                if (typeof (dataObj[key][value]) === 'string') {
                    ipAddresses.push(dataObj[key][value]);
                }
            }

            result[key].push(ipAddresses.sort());
            ipAddresses = [];
        }

        //console.log(result);
        for (elem in result) {
            console.log(elem + ': '+ result[elem][0] + ' [' + result[elem][1].join(', ') + ']');
        }
    }
}

var arr = [
    '7',
    '192.168.0.11 peter 33',
    '10.10.17.33 alex 12',
    '10.10.17.35 peter 30',
    '10.10.17.34 peter 120',
    '10.10.17.34 peter 120',
    '212.50.118.81 alex 46',
    '212.50.118.81 alex 4'
];

var arr2 = [
'4',
'10.10.10.10 root 46',
'8.8.8.8 root 167',
'1.2.3.4 root 120',
'5.6.7.8 root 970',
'192.168.0.11 root 55'
];
solve(arr2);