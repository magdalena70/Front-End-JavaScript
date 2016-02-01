function solve(arr){
    if (arr.length) {
        //console.log(arr);
        var student, course, examPoints, courseBonuses,
            line, index, requestedExam = arr[arr.length - 1].replace(/[\s\s+]+/g, '').trim(),
            coursePoints, grade, avgExamPoints = 0, countAvg = 0, strResult = '';

        for (index = 0; index < arr.length-1; index++) {
            line = arr[index].replace(/[\s\s+]+/g, ' ').split(' ').filter(Boolean);
            //console.log(line);

            student = line[0].trim();
            course = line[1].trim();
            examPoints = Number(line[2].trim());
            courseBonuses = Number(line[3].trim());
            coursePoints = ((examPoints * 20) / 100) + courseBonuses;
            if (coursePoints > 0) {
                grade = ((coursePoints / 80) * 4) + 2;
            }

            if (grade > 6) {
                grade = 6;
            }
            
            if (course == requestedExam) {
                countAvg++;
                avgExamPoints += examPoints;
            }
            
            if (examPoints >= 100) {
                strResult = student + ': Exam - "' + course + '"; Points - ' + Math.round(coursePoints*100)/100 + '; Grade - ' + grade.toFixed(2);
            } else {
                strResult = student + ' failed at "' + course + '"';
            }

            console.log(strResult);
        }
        if (avgExamPoints > 0) {
            avgExamPoints = avgExamPoints / countAvg;
            console.log('"%s" average points -> %s', requestedExam, Math.round(avgExamPoints * 100) / 100);
        }
    }
}

var arr = [
    'Pesho C#-Advanced 100 3',
    'Gosho Java-Basics 157 3',
    'Tosho HTML&CSS 317 12',
    'Minka C#-Advanced 57 15',
    'Stanka C#-Advanced 157 15',
    'Kircho C#-Advanced 300 0',
    'Niki C#-Advanced 400 10',
    ''
];
/*Pesho: Exam - "C#-Advanced"; Points - 23; Grade - 3.15
Gosho: Exam - "Java-Basics"; Points - 34.4; Grade - 3.72
Tosho: Exam - "HTML&CSS"; Points - 75.4; Grade - 5.77
Minka failed at "C#-Advanced"
Stanka: Exam - "C#-Advanced"; Points - 46.4; Grade - 4.32
Kircho: Exam - "C#-Advanced"; Points - 60; Grade - 5.00
Niki: Exam - "C#-Advanced"; Points - 90; Grade - 6.00
"C#-Advanced" average points -> 202.8
*/

var arr2 = [
    '   EDUU    JS-Basics                317          15',         
    '           RoYaL        HTML5        121         10',        
    'ApovBerger      OOP   0    10     ',
    'Stamat OOP   190 10 ',
    'MINKA OOP   230 10 ',
    '   OOP '
];
/*EDUU: Exam - "JS-Basics"; Points - 78.4; Grade - 5.92
RoYaL: Exam - "HTML5"; Points - 34.2; Grade - 3.71
ApovBerger failed at "OOP"
Stamat: Exam - "OOP"; Points - 48; Grade - 4.40
MINKA: Exam - "OOP"; Points - 56; Grade - 4.80
"OOP" average points -> 140*/
solve(arr);