function solve(arr){
    if (arr.length) {
        //console.log(arr);
        var bill = Number(arr[0]), mood = arr[1].trim(), tip, n;
        //console.log(bill, mood);

        if (mood === 'happy') {
            tip = (bill * 10) / 100;
        } else if (mood === 'married') {
            tip = (bill * 0.05) / 100;
        } else if (mood === 'drunk') {
            tip = ((bill * 15) / 100);
            tip = Math.pow(tip, Number(tip.toString()[0]));
        } else {
            tip = (bill * 5) / 100;
        }

        console.log(tip.toFixed(2));
    }
}

var arr = ['1230.83', 'drunk'];
/*184.62*/
var arr2 = ['716.00', 'married'];
/*0.36*/
var arr3 = ['716.00', 'bored'];
/*35.80*/
var arr4 = ['120.44', 'happy '];
/*12.04*/
solve(arr);