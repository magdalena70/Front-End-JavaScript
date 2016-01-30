function solve(arr){
    if (arr.length) {
        //console.log(arr);
        var year, month, day, i, currDate, currDateObj,
            targetDate = new Date("May 25, 1973"), minDate = new Date("January 1, 1900"), maxDate = new Date("January 1, 2015"),
            fans = [], haters = [];

        for (i in arr) {
            currDate = arr[i].split('.');
            day = currDate[0];
            month = currDate[1]-1;
            year = currDate[2];
            currDateObj = new Date(year, month, day);
            //console.log(currDate, day, month, year, currDateObj.toDateString());

            if (currDateObj > minDate && currDateObj < maxDate) {
                if (currDateObj >= targetDate) {
                    fans.push(currDateObj);
                } else {
                    haters.push(currDateObj);
                }
                
            }
        }
        
        if (fans.length > 0) {
            fans.sort(function (a, b) {
                return b.getTime() - a.getTime();
            });
           
            console.log('The biggest fan of ewoks was born on %s', fans[0].toDateString());
        }
        
        if (haters.length > 0) {
            haters.sort(function (a, b) {
                return a.getTime() - b.getTime();
            });
            
            console.log('The biggest hater of ewoks was born on %s', haters[0].toDateString());
        }

        if (fans.length === 0 && haters.length === 0) {
            console.log('No result');
        }
    }
}

var arr = ['22.03.2014', '17.05.1933', '10.10.1954']; // The biggest fan of ewoks was born on Sat Mar 22 2014
                                                      // The biggest hater of ewoks was born on Wed May 17 1933
var arr2 = ['22.03.2000']; // The biggest fan of ewoks was born on Wed Mar 22 2000
var arr3 = ['22.03.1700', '01.07.2020']; // No result
var arr4 = ['25.11.2002', '19.06.2001', '18.13 .1966', '29.03 .1955'];
/*The biggest fan of ewoks was born on Mon Nov 25 2002
  The biggest hater of ewoks was born on Tue Mar 29 1955
*/
var arr5 = [
    '10.10.1566',
    '10.10.1966',
    '10.10.1967',
    '10.10.1968',
    '10.10.1969',
    '10.10.1970',
    '10.10.1971',
    '11.11.2006',
    '11.11.2007',
    '11.11.2008',
    '11.11.2009',
    '11.11.2010',
    '11.11.2011',
    '11.11.2012'
];
/*The biggest fan of ewoks was born on Sun Nov 11 2012
  The biggest hater of ewoks was born on Mon Oct 10 1966
*/
solve(arr5);