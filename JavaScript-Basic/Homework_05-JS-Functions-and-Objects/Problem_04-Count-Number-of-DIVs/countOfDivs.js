'use strict'
function countDivs(html){
    if (html) {
        //console.log(html);
        var count = 0, index = 0, result;

        while (html.indexOf('<div', index) != -1) {
            count++;
            index = html.indexOf('<div', index) + 1;
        }
        
        result = count;
        index = 0;
        while (html.indexOf('</div>', index) != -1) {
            count--;
            index = html.indexOf('</div>', index) + 1;
        }

        if (count !== 0) {
            console.log('Incorrect html');
        } else {
            console.log(result);
        }
    }
}

var input = 
'<!DOCTYPE html>' +
'<html>'+
    '<head lang="en">'+
        '<meta charset="UTF-8">'+
        '<title>index</title>'+
        '<script src="/yourScript.js" defer></script>'+
    '</head>'+
    '<body>'+
        '<div id="outerDiv">'+
            '<div class="first">'+
                '<div><div>hello</div></div>'+
            '</div>'+
            '<div>hi<div></div></div>'+        
            '<div>I am a div</div>'+
        '</div>'+
    '</body>'+
'</html>';

countDivs(input);