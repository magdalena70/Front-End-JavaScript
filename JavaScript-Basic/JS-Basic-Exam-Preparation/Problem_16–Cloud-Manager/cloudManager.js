function solve(arr){
    if (arr.length) {
        //console.log(arr);
        var index, line, fileName, extension, memory,
            filesObj = {}, sortedFiles = {}, sortedKey = [], key, k, i;

        for (index in arr) {
            line = arr[index].split(' ');
            //console.log(line);
            fileName = line[0].trim();
            extension = line[1].trim();
            memory = line[2].replace('MB', '').trim();
            //console.log(fileName, extension, memory);

            if (!filesObj[extension]) {
                filesObj[extension] = { files: [], memory: 0 };
            }

            filesObj[extension].memory += Number(memory);
            if (filesObj[extension].files.indexOf(fileName) === -1) {
                filesObj[extension].files.push(fileName);
            }
        }
        
        for (k in filesObj) {
            sortedKey.push(k);
            filesObj[k].files.sort();
            filesObj[k].memory = filesObj[k].memory.toFixed(2);
        }
        
        sortedKey.sort();
        for (i = 0; i < sortedKey.length; i++) {
            key = sortedKey[i];
            sortedFiles[key] = filesObj[key];
        }
        console.log(JSON.stringify(sortedFiles));
    }
}

var arr = [
    'sentinel .exe 15MB',
    'zoomIt .msi 3MB',
    'skype .exe 45MB',
    'trojanStopper .bat 23MB',
    'kindleInstaller .exe 120MB',
    'setup .msi 33.4MB',
    'winBlock .bat 1MB'
];
/*{
 * ".bat":{"files":["trojanStopper","winBlock"],"memory":"24.00"},
 * ".exe":{"files":["kindleInstaller","sentinel","skype"],"memory":"180.00"},
 * ".msi":{"files":["setup","zoomIt"],"memory":"36.40"}
 * }
*/

solve(arr);