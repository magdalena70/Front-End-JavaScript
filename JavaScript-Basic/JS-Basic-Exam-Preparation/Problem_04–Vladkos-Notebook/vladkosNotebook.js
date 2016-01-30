function solve(arr) {
    if (arr && arr.length > 0 && arr.length <= 150) {
        //console.log(arr);
        var i, lineArr, color, key, value,
            dataObj = {}, sortedKeyDataObj, keyObjName, elemObj,
            keyObj, rank, result = {};

        for (i in arr) {
            lineArr = arr[i].replace(/[\s\s+]+/g, ' ').split('|');
            //console.log(lineArr);
            color = lineArr[0];
            key = lineArr[1];
            value = lineArr[2];

            if (!dataObj[color]) {
                dataObj[color] = {
                    opponents: [],
                    win: 0,
                    loss: 0
                };
            }

            if (key === 'age' || key === 'name') {
                dataObj[color][key] = value;
            }

            if (key === 'loss') {
                dataObj[color].loss ++;
                dataObj[color].opponents.push(value);
            }

            if (key === 'win') {
                dataObj[color].win ++;
                dataObj[color].opponents.push(value);
            }
        }

        //console.log(dataObj);
        sortedKeyDataObj = Object.keys(dataObj).sort();
        //console.log(sortedKeyDataObj);
        for (keyObj in sortedKeyDataObj) {
            keyObjName = sortedKeyDataObj[keyObj],
                elemObj = dataObj[keyObjName],
                rank = ((elemObj.win + 1) / (elemObj.loss + 1)).toFixed(2);

            //console.log(keyObjName + ': ', elemObj);

            if (!elemObj.name || !elemObj.age) {
                continue;
            }

            result[keyObjName] = {
                age: elemObj.age,
                name: elemObj.name,
                opponents: elemObj.opponents.sort(),
                rank: rank
            };
        }

        console.log(JSON.stringify(result));
    }
}

var arr = [
    'purple|age|99',
    'red|age|44',
    'blue|win|pesho',
    'blue|win|mariya',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Yana',
    'purple|loss|Yana',
    'purple|loss|Manov',
    'purple|loss|Manov',
    'red|name|gosho',
    'blue|win|Vladko',
    'purple|loss|Yana',
    'purple|name|VladoKaramfilov',
    'blue|age|21',
    'blue|loss|Pesho'];
solve(arr);