function solve(arr){
    if (arr.length) {
        //console.log(arr);
        var index, inputConditions = arr[0].split('^'),
            studentsCriteria = inputConditions[0].trim(), trainersCriteria = inputConditions[1].trim(),
            dataLine, elem, students = [], student, trainers = [], trainer, result = {};
        //console.log(studentsCriteria, trainersCriteria);

        for (index = 1; index < arr.length; index++) {
            dataLine = JSON.parse(arr[index]);
            for (elem in dataLine) {
                if (elem === 'role') {
                    if (dataLine[elem] === 'student') {
                        students.push(dataLine);
                    }

                    if (dataLine[elem] === 'trainer') {
                        trainers.push(dataLine);
                    }
                }
            } 
        }
        
        if (studentsCriteria === 'level') {
            students.sort(function (a, b) {
                if (a.level === b.level) {
                    return a.id - b.id;
                }
                
                return a.level - b.level;
            });
        }
        
        if (studentsCriteria === 'name') {
            students.sort(function (a, b) {
                if (a.firstname === b.firstname) {
                    return a.lastname.localeCompare(b.lastname);
                }

                return a.firstname.localeCompare(b.firstname);
            });
        }
        
        if (trainersCriteria === 'courses') {
            trainers.sort(function (a, b) {
                var aQuantityCourses = a.courses.length, bQuantityCourses = b.courses.length;

                if (aQuantityCourses === bQuantityCourses) {
                    return a.lecturesPerDay - b.lecturesPerDay;
                }

                return aQuantityCourses - bQuantityCourses;
            });
        }
        //console.log(students);
        //console.log(trainers);
        
        result.students = [];
        for(student in students){
            result.students.push({
                id: students[student].id,
                firstname: students[student].firstname,
                lastname: students[student].lastname,
                averageGrade: calcAvgGrade(students[student].grades),
                certificate: students[student].certificate
            });
        }
        
        result.trainers = [];
        for(trainer in trainers){
            result.trainers.push({
                id: trainers[trainer].id,
                firstname: trainers[trainer].firstname,
                lastname: trainers[trainer].lastname,
                courses: trainers[trainer].courses,
                lecturesPerDay: trainers[trainer].lecturesPerDay
            });
        }

        console.log(JSON.stringify(result));

        function calcAvgGrade(gradesArr){
            var i, sum = 0, avg;

            for (i in gradesArr) {
                sum += Number(gradesArr[i]);
            }

            avg = sum / gradesArr.length;
            return avg.toFixed(2);
        }
    }
}

var arr = [
    'level^courses',
    '{"id":0,"firstname":"Angel","lastname":"Ivanov","town":"Plovdiv","role":"student","grades":["5.89"],"level":2,"certificate":false}',
    '{"id":1,"firstname":"Mitko","lastname":"Nakova","town":"Dimitrovgrad","role":"trainer","courses":["PHP","Unity Basics"],"lecturesPerDay":6}',
    '{"id":2,"firstname":"Bobi","lastname":"Georgiev","town":"Varna","role":"student","grades":["5.59","3.50","4.54","5.05","3.45"],"level":4,"certificate":false}',
    '{"id":3,"firstname":"Ivan","lastname":"Ivanova","town":"Vidin","role":"trainer","courses":["JS","Java","JS OOP","Database","OOP","C#"],"lecturesPerDay":7}',
    '{"id":4,"firstname":"Mitko","lastname":"Petrova","town":"Sofia","role":"trainer","courses":["Database","JS Apps","Java"],"lecturesPerDay":2}'
];
/*{"students":[
 * {"id":0,"firstname":"Angel","lastname":"Ivanov","averageGrade":"5.89","certificate":false},
 * {"id":2,"firstname":"Bobi","lastname":"Georgiev","averageGrade":"4.43","certificate":false}],
 * "trainers":[
 * {"id":1,"firstname":"Mitko","lastname":"Nakova","courses":["PHP","Unity Basics"],"lecturesPerDay":6},
 * {"id":4,"firstname":"Mitko","lastname":"Petrova","courses":["Database","JS Apps","Java"],"lecturesPerDay":2},
 * {"id":3,"firstname":"Ivan","lastname":"Ivanova","courses":["JS","Java","JS OOP","Database","OOP","C#"],"lecturesPerDay":7}
 *]}
*/

var arr2 = [
    'name^courses',
    '{"id":0,"firstname":"Angel","lastname":"Ivanov","town":"Plovdiv","role":"student","grades":["5.89"],"level":2,"certificate":false}',
    '{"id":1,"firstname":"Mitko","lastname":"Nakova","town":"Dimitrovgrad","role":"trainer","courses":["PHP","Unity Basics"],"lecturesPerDay":6}',
    '{"id":2,"firstname":"Angel","lastname":"Georgiev","town":"Varna","role":"student","grades":["5.59","3.50","4.54","5.05","3.45"],"level":4,"certificate":false}',
    '{"id":3,"firstname":"Ivan","lastname":"Ivanova","town":"Vidin","role":"trainer","courses":["JS","Java","JS OOP","Database","OOP","C#"],"lecturesPerDay":7}',
    '{"id":4,"firstname":"Mitko","lastname":"Petrova","town":"Sofia","role":"trainer","courses":["Database","JS Apps"],"lecturesPerDay":2}'
];

/*{"students":[
 * {"id":2,"firstname":"Angel","lastname":"Georgiev","averageGrade":"4.43","certificate":false},
 * {"id":0,"firstname":"Angel","lastname":"Ivanov","averageGrade":"5.89","certificate":false}],
 * "trainers":[
 * {"id":4,"firstname":"Mitko","lastname":"Petrova","courses":["Database","JS Apps"],"lecturesPerDay":2},
 * {"id":1,"firstname":"Mitko","lastname":"Nakova","courses":["PHP","Unity Basics"],"lecturesPerDay":6},
 * {"id":3,"firstname":"Ivan","lastname":"Ivanova","courses":["JS","Java","JS OOP","Database","OOP","C#"],"lecturesPerDay":7}
 *]}
*/
solve(arr2);