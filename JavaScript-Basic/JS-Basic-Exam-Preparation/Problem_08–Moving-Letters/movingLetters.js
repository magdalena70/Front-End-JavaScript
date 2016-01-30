function solve(arr){
    if (arr.length === 1) {
        //console.log(arr);
        var splitedWords = arr[0].split(' '), outputSequence = [],
            index, word, wordMaxLength = 0, letter, y, numberK;

        //console.log(splitedWords);
        for (index in splitedWords) {
            splitedWords[index] = splitedWords[index].split('');
            word = splitedWords[index];

            if (word.length > wordMaxLength) {
                wordMaxLength = word.length;
            }
            //console.log(word , wordMaxLength); // get max word's length   
        }

        for(letter = 0; letter < wordMaxLength; letter++){
            for (y in splitedWords) {
                word = splitedWords[y];

                if (word.length > 0) { // check if is not empty
                    outputSequence.push(word.pop());
                }
            }
        }
        //console.log(outputSequence.join(''));

        for (letter = 0; letter < outputSequence.length; letter++) {
            var currentLett = outputSequence[letter];
            numberK = currentLett.toLowerCase().charCodeAt(0) - 96;
            var newPosition = (numberK + letter) % (outputSequence.length);

            outputSequence.splice(letter, 1);
            //console.log(currentLett, letter, numberK, outputSequence.length, newPosition);
            outputSequence.splice(newPosition, 0, currentLett);
        }

        console.log(outputSequence.join(''));
    }
}

var arr = ['Fun exam right']; // output: gmrneaihuFxt
/*First the letter 'n' at position 0 is moved right 14 times: 
 *"nmtuahFxgeir" -> "mtnuahFxgeir". Then the letter 't' at position 1 is moved 20 times right:
 *"mtnuahFxgeir" -> "mnuahFxgetir". Then the process continues:
 *"mnuahFxgetir" ->
 *"mnahFxgetiru" ->
 *"mnaFxgetiruh" -> 
 *"mnaFxgetiruh" ->
 *"gmnaFxetiruh" -> 
 *"gmnaFxtiruhe" -> 
 *"gmnaiFxtruhe" -> 
 *"gmrnaiFxtuhe" -> 
 *"gmrnaiuFxthe" -> 
 *"gmrnaihuFxte" -> 
 *"gmrneaihuFxt".          The result is "gmrneaihuFxt".*/
var arr2 = ['Telerik Academy']; // output: AymlTiedkaerec
var arr3 = ['Hi exam']; // output: maiHex
solve(arr2);