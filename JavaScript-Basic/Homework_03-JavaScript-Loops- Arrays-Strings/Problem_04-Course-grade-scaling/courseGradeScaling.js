function courseGradeScaling(jsonStr) {
    var jsonStrToObj, students;
    
    jsonStrToObj = JSON.parse(jsonStr);
    //console.log(jsonStrToObj);
    
    students = jsonStrToObj
        .map(function (student) {
            return {
                name : student.name,
                score : student.score + ((student.score * 10) / 100),
                hasPassed : true
            }
        })
        .filter(function (student) {
            return student.score >= 100;
        })
        .sort(function (a, b) {
            return a.name > b.name;
        });
    
    console.log(JSON.stringify(students));
    
}

var students = [
    {
        'name' : 'Пешо',
        'score' : 91
    },
    {
        'name' : 'Лилия',
        'score' : 290
    },
    {
        'name' : 'Алекс',
        'score' : 343
    },
    {
        'name' : 'Габриела',
        'score' : 400
    },
    {
        'name' : 'Жичка',
        'score' : 70
    }
];

var input = JSON.stringify(students);
//console.log(input);
courseGradeScaling(input);