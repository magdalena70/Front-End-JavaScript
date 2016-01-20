function groupBy(strCriteria){
    var people_01, people_02, sortedByFirstName, sortedByAge, sortedByLastName;

    function Person(first, last, age) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
    }
    
    function groupByAge(arr) {
        return arr.sort(function (a, b) {
            return a.age > b.age;
        });
    }
    
    function groupByFirstName(arr) {
        return arr.sort(function (a, b) {
            return a.firstName > b.firstName;
        });
    }
    
    function groupByLastName(arr) {
        return arr.sort(function (a, b) {
            return a.lastName > b.lastName;
        });
    }
    
    function printResult(arr, criteria){
        for (var index = 1; index < arr.length; index++) {
            var age = arr[index].age, firstName = arr[index].firstName, lastName = arr[index].lastName,
                ageBefore = arr[index - 1].age, firstNameBefore = arr[index - 1].firstName, lastNameBefore = arr[index - 1].lastName,
                lineResultBefore = firstNameBefore + ' ' + lastNameBefore + '(age ' + ageBefore + ')]';
                lineResultDefault = firstName + ' ' + lastName + '(age ' + age + ')]';
                lineResultIfEqual = ': [' + firstNameBefore + ' ' + lastNameBefore + '(age ' + ageBefore + '), ' + lineResultDefault;

            if (criteria === 'age') {
                if (age === ageBefore) {
                    console.log('Group ' + age + lineResultIfEqual);
                } else {
                    console.log('Group ' + age + ': [' + lineResultDefault);
                }
            }
            
            if (criteria === 'firstName') {
                if (index === 1) {
                    console.log('Group ' + firstNameBefore + ': [' + lineResultBefore);
                    console.log('Group ' + firstName + ': [' + lineResultDefault);
                } else {
                    console.log('Group ' + firstName + ': [' + lineResultDefault);
                }
            }

            if (criteria === 'lastName') {
                if (lastName === lastNameBefore) {
                    console.log('Group ' + lastName + lineResultIfEqual);
                } else if(arr[index+1] && lastName === arr[index+1].lastName) {
                    continue;
                } else {
                    if (index === 1) {
                        console.log('Group ' + lastNameBefore + ': [' + lineResultBefore);
                        console.log('Group ' + lastName + ': [' + lineResultDefault);
                    } else {
                        console.log('Group ' + lastName + ': [' + lineResultDefault);
                    }
                }
            }
        }
    }
        
    people_01 = [
        new Person("Scott", "Guthrie", 38),
        new Person("Scott", "Johns", 36),
        new Person("Scott", "Hanselman", 39),
        new Person("Jesse", "Liberty", 57),
        new Person("Jon", "Skeet", 38)
    ];
    
    sortedByFirstName = groupByFirstName(people_01);    
    //console.log(sortedByFirstName);
    if (strCriteria === 'firstName') {
        printResult(sortedByFirstName, strCriteria);
    }
    
    people_02 = [
        new Person("Scott", "Guthrie", 38),
        new Person("Scott", "Johns", 40),
        new Person("Scott", "Hanselman", 36),
        new Person("Jesse", "Johns", 57),//Liberty
        new Person("Jon", "Skeet", 36)
    ];
    
    if (strCriteria === 'age') {
        sortedByAge = groupByAge(people_02);
        //console.log(sortedByAge);
        printResult(sortedByAge, strCriteria);
    }
    
    if (strCriteria === 'lastName') {
        sortedByLastName = groupByLastName(people_02);
        //console.log(sortedByLastName);
        printResult(sortedByLastName, strCriteria);
    }
}

groupBy('firstName');
//groupBy('age');
//groupBy('lastName');