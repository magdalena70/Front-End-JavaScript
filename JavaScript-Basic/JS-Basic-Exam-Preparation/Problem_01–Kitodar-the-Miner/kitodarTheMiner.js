function solve(arr) {
    if (arr) {
        //console.log(arr);
        var line, goldArr, gold = 0, silverArr, silver = 0, diamondsArr, diamonds = 0, i;
        
        for (i in arr) {
            line = arr[i].toLowerCase().replace(/\s\s+/g, ' ');
            //console.log(line);
            if (line.indexOf('-') !== -1) {
                line = line.split('-');
            }

            if (line[0].indexOf('mine') !== -1 && line[1].indexOf(':') !== -1) {
                
                if (line[1].indexOf('gold') !== -1) {
                    goldArr = line[1].split(':');
                    gold += Number(goldArr[1]);
                }
                
                if (line[1].indexOf('silver') !== -1) {
                    silverArr = line[1].split(':');
                    silver += Number(silverArr[1]);
                }
                
                if (line[1].indexOf('diamonds') !== -1) {
                    diamondsArr = line[1].split(':');
                    diamonds += Number(diamondsArr[1]);
                }
            }
        }
        
        console.log('*Silver: %s', silver);
        console.log('*Gold: %s', gold);
        console.log('*Diamonds: %s', diamonds);
    }
}

var arr = [
    'mine bobovDol - gold : 10',
    'mine medenRudnik - silver : 22',
    'mine chernoMore - shrimps : 24',
    'gold:50'
];

//output:
//*Silver: 22
//*Gold: 10
//*Diamonds: 0

var arr2 = [
    'mine mina- gold - 5', // incorrect
    'mine mina - silver - 5', // incorrect
    'mine mina - diamonds : 5',
    'mine mina - gold:5'
];

//output:
//*Silver: 0
//*Gold: 5
//*Diamonds: 5

var arr3 = [
    '	mine mina - golD : 5',
    'mine mina: gold: 5'
];

//output:
//*Silver: 0
//*Gold: 5
//*Diamonds: 0

solve(arr3);
