function replaceATag(str){
    var replacedStr, replacedStrToArr, currentChar, count = 1;

    replacedStr = str.replace(new RegExp('<a href=', 'g'), '[URL=', ']');
    replacedStr = replacedStr.replace(new RegExp('</a>', 'g'), '[/URL]');
    replacedStrToArr = replacedStr.split('');
    for (var charIndex in replacedStrToArr) {
        currentChar = replacedStrToArr[charIndex];
        if (currentChar == '<') {
            count += 1;
        }
        
        if (currentChar == '>') {
            count -= 1;
            if (count == 0) {
                replacedStrToArr[charIndex] = ']';
                count = 1;
            }
        }
    }
   
    console.log(replacedStrToArr.join(''));
}

// if input is correct html
var inputStr = 
        '<ul>\r\n' +
        ' <li>\r\n'+
        '  <a href="http://softuni.bg">SoftUni</a>\r\n'+
        ' </li>\r\n'+
        ' <li>\r\n' +
        '  <a href="http://stackoverflow.com">Stack Overflow</a>\r\n'+
        ' </li>\r\n' +
        ' <li>\r\n' +
        '  <a href="http://wordpress.com">Wordpress</a>\r\n' +
        ' </li>\r\n' +
        '</ul>';
replaceATag(inputStr);