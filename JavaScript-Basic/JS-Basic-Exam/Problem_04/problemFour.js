function solve(arr) {
    if (arr.length) {
        //console.log(arr);
        var name, type, taskNumber, score, linesOfCode,
            lineArr, index, tasksObj = {}, key = 'Task ',
            countElem = 0, elem, taskElem, sortedArr = [], resultObj = {};

        for (index in arr) {
            lineArr = arr[index].replace(/[\s\s+]+/g, ' ').split('&');
            name = lineArr[0].trim();
            type = lineArr[1].trim();
            taskNumber = lineArr[2].trim();
            score = Number(lineArr[3].trim());
            linesOfCode = Number(lineArr[4].trim());
            //console.log(name, type, taskNumber, score, linesOfCode);
            

            if (!tasksObj[key + taskNumber]) {
                tasksObj[key + taskNumber] = {tasks: [], average: 0, lines: 0};
            }

            tasksObj[key + taskNumber].tasks.push({ name: name, type: type });
            tasksObj[key + taskNumber].average += score;
            tasksObj[key + taskNumber].lines += linesOfCode;
        }
        
        for (elem in tasksObj) {
            countElem = tasksObj[elem].tasks.length;
            tasksObj[elem].average = tasksObj[elem].average / countElem;
            taskElem = tasksObj[elem].tasks;
            for (var i in taskElem) {
                taskElem = taskElem.sort(function (a, b) { return a.name > b.name});
            }
        }
        
        for (elem in tasksObj) {
            tasksObj[elem].key = elem;
            sortedArr.push(tasksObj[elem]);
        }
        
        sortedArr.sort(function (a, b) {
            if (a.average === b.average) {
                return a.lines - b.lines;
            }

            return a.average < b.average;
        })
        
        for (elem in sortedArr) {
            resultObj[sortedArr[elem].key] = {
                tasks: sortedArr[elem].tasks,
                average: Math.round(sortedArr[elem].average * 100)/100,
                lines: sortedArr[elem].lines
                };
        }
        
        console.log(JSON.stringify(resultObj));
    }
}

var arr = [
    'Array Matcher & strings & 4 & 100 & 38',
    'Magic Wand & draw & 3 & 100 & 15',
    'Dream Item & loops & 2 & 88 & 80',
    'Knight Path & bits & 5 & 100 & 65',
    'Basket Battle & conditionals & 2 & 100 & 120',
    'Torrent Pirate & calculations & 1 & 100 & 20',
    'Encrypted Matrix & nested loops & 4 & 90 & 52',
    'Game of bits & bits & 5 & 100 & 18',
    'Fit box in box & conditionals & 1 & 100 & 95',
    'Disk & draw & 3 & 90 & 15',
    'Poker Straight & nested loops & 4 & 40 & 57',
    'Friend Bits & bits & 5 & 100 & 81'
];
/*{
 * "Task 1":
 * {"tasks":[{"name":"Fit box in box","type":"conditionals"},
 * {"name":"Torrent Pirate","type":"calculations"}],"average":100,"lines":115},
 *"Task 5":
 * {"tasks":[{"name":"Friend Bits","type":"bits"},
 * {"name":"Game of bits","type":"bits"},
 * {"name":"Knight Path","type":"bits"}],"average":100,"lines":164},
 *"Task 3":
 * {"tasks":[{"name":"Disk","type":"draw"}
 * ,{"name":"Magic Wand","type":"draw"}],"average":95,"lines":30},
 *"Task 2":
 * {"tasks":[{"name":"Basket Battle","type":"conditionals"},
 * {"name":"Dream Item","type":"loops"}],"average":94,"lines":200},
 *"Task 4":{"tasks":[{"name":"Array Matcher","type":"strings"},
 * {"name":"Encrypted Matrix","type":"nested loops"},
 * {"name":"Poker Straight","type":"nested loops"}],"average":76.67,"lines":147}
 * }
*/

solve(arr);