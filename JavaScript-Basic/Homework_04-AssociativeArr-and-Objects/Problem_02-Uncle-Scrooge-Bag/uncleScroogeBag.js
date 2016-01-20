function uncleScroogeBag(arr) {
    if (arr) {
        //console.log(arr);
        var lineArr, type, value, sum = 0, gold, silver, bronze;

        for( var item in arr) {
            lineArr = arr[item].split(' ');
            type = lineArr[0].toLowerCase();
            value = Number(lineArr[1]);
            if (type === 'coin' && value > 0 && value % 1 === 0) {
                sum += value;
            }
        }

        gold = Math.floor(sum / 100);
        sum = sum % 100;
        silver = Math.floor(sum / 10);
        bronze = sum % 10;
        // output
        console.log('gold : ' + gold);
        console.log('silver : ' + silver);
        console.log('bronze : ' + bronze);
    }
}

var input1 = ['coin 1', 'coin 2', 'coin 5', 'coin 10', 'coin 20', 'coin 50', 'coin 100', 'coin 200', 'coin 500', 'cigars 1'];
var input2 = ['coin one', 'coin two', 'coin five', 'coin ten', 'coin twenty', 'coin fifty', 'coin hundred', 'cigars 1'];
var input3 = ['coin 1', 'coin two', 'coin 5', 'coin 10.50', 'coin 20', 'coin 50', 'coin hundred', 'cigars 1'];
uncleScroogeBag(input1);