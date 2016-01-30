function solve(arr) {
    if (arr.length) {
        //console.log(arr);
        var index, line, regex = /([^=&?]+)=([^=&?]+)/g,
            match, result = {}, resultKey, keyValue;
        
        for (index in arr) {
            line = arr[index].replace(/(\+|%20)+/g, ' ');
            match = regex.exec(line);
            //console.log(match);
            
            while (match) {
                resultKey = match[1].trim();
                keyValue = match[2].trim();
                
                if (!result[resultKey]) {
                    result[resultKey] = [];
                }
                
                result[resultKey].push(keyValue);
                match = regex.exec(line);
            }
            
            var str = '';
            for (var elem in result) {
                str += elem + '=[' + result[elem].join(', ') + ']';
            }
            console.log(str);
            result = {};
        }
    }
}

var arr = ['login=student&password=student'];
// login=[student]password=[student]
var arr2 = ['field=value1&field=value2&field=value3', 'http://example.com/over/there?name=ferret'];
/*
 * field=[value1, value2, value3]
 * name=[ferret]
 * */
var arr3 = [
    'foo=%20foo&value=+val&foo+=5+%20+203',
    'foo=poo%20&value=valley&dog=wow+',
    'url=https://softuni.bg/trainings/coursesinstances/details/1070',
    'https://softuni.bg/trainings?trainer=nakov&course=oop&course=php'
];
/*foo=[foo, 5 203]value=[val]
foo=[poo]value=[valley]dog=[wow]
url=[https://softuni.bg/trainings/coursesinstances/details/1070]
trainer=[nakov]course=[oop, php]*/
solve(arr3);