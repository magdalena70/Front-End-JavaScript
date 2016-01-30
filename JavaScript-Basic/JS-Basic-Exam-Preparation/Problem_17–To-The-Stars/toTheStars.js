function solve(arr){
    if (arr.length) {
        //console.log(arr);
        var star1 = arr[0].split(' '),
            star1Name = star1[0], star1X = Number(star1[1].trim()), star1Y = Number(star1[2].trim()),
            star2 = arr[1].split(' '),
            star2Name = star2[0], star2X = Number(star2[1].trim()), star2Y = Number(star2[2].trim()),
            star3 = arr[2].split(' '),
            star3Name = star3[0], star3X = Number(star3[1].trim()), star3Y = Number(star3[2].trim()),
            normandy = arr[3].split(' ').filter(Number),
            normandyX = Number(normandy[0].trim()), normandyY = Number(normandy[1].trim()),
            numTurns = Number(arr[4].trim()),
            result = '';

        //console.log(star1, star2, star3, normandy, numTurns);
            
        for (var i = 0; i <= numTurns; i++) {
            if (checkTurns(normandyX, normandyY, star1X, star1Y, star1Name, i)) {
                result = star1Name;
            } else if (checkTurns(normandyX, normandyY, star2X, star2Y, star2Name, i)) {
                result = star2Name;
            } else if (checkTurns(normandyX, normandyY, star3X, star3Y, star3Name, i)) {
                result = star3Name;
            } else {
                result = 'space';
            }

            console.log(result.toLowerCase());
        }

        function checkTurns(normX, normY, starX, starY, starName, count){
            if (normX > starX + 1 || normX < starX - 1 ||
                normY + count > starY + 1 || normY + count < starY - 1) {
                return false;
            } else {               
                return true;
            }
        }
    }
}

var arr = ['Terra-Nova 16 2', 'Perseus 2.6 4.8', 'Virgo 1.6 7', '2 5', '4'];
/*
perseus
virgo
virgo
virgo
space
 * */
solve(arr);