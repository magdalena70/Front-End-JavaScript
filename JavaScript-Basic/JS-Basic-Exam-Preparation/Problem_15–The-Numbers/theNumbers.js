function solve(arr){
    if (arr.length) {
        //console.log(arr);
        var message = arr[0].split(/[^\d]/g).filter(Boolean);
        message = message.map(function (elem) { 
            var hex = Number(elem).toString(16);
            hex = "0000".substr(0, 4 - hex.length) + hex.toUpperCase();
            return '0x' + hex;
        });

        console.log(message.join('-'));
    }
}

var arr = ['5tffwj(//*7837xzc2---34rlxXP%$".'];
/* 0x0005-0x1E9D-0x0002-0x0022 */

var arr2 = ['482vMWo(*&^%$213;k!@41341((()&^>><///]42344p;e312'];
/* 0x01E2-0x00D5-0xA17D-0xA568-0x0138 */

var arr3 = ['20'];
/* 0x0014 */

solve(arr2);