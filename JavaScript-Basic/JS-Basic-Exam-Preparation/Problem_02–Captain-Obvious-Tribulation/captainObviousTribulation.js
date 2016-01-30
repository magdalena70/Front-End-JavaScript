function solve(arr) {
    if (arr && arr.length === 2) {
        var firstText = arr[0].replace(/[\W]/g, '|').split(/[|]/), secondText = arr[1],
            word, currentWord, words = {}, uniqueArr = [], unique, resultObj = {}, result = [],
            countUniqueWord = 0, index, i,
            sentences = secondText.split(/[!\.\?]/);
        
        firstText = firstText.filter(function (elem) {
            return elem !== '';
        });
        
        for (index = 0; index < firstText.length - 1; index++) {
            word = firstText[index].toLowerCase();
            
            for (i = 1; i < firstText.length; i++) {
                currentWord = firstText[i].toLowerCase();
                
                if (word === currentWord) {
                    countUniqueWord++;
                    
                    if (countUniqueWord >= 3) {
                        words[word] = currentWord;
                    }
                }
            }
            
            countUniqueWord = 0;
        }
        
        for (var key in words) {
            uniqueArr.push(words[key]);
        }
        
        if (uniqueArr.length < 1) {
            console.log('No words');
        } else {
            //console.log(uniqueArr);
            for (var y = 0; y < uniqueArr.length; y++) {
                unique = uniqueArr[y];
             
                for (var sent in sentences) {
                    var sentence = sentences[sent].toLowerCase();              
                    for (var t in uniqueArr) {
                        var unique2 = uniqueArr[t];
                        if (unique !== unique2 &&
                             sentence.indexOf(unique) > -1 &&
                                sentence.indexOf(unique2) > -1) {
                            //console.log(unique + '->' + sentence.lastIndexOf(unique) + '->' + sentence);
                            //console.log(unique2 + '->' + sentence.lastIndexOf(unique2) + '->' + sentence);
                                
                            resultObj[sentences[sent]] = sentences[sent];
                        }
                    }
                }

            }
            
            for (var obj in resultObj) {
                result.push(resultObj[obj]);
            }
            
            if (result.length > 0) {
                for (var r in result) {
                    console.log((secondText.substr(secondText.lastIndexOf(result[r]), result[r].length + 1)).trim());
                }
            } else {
                console.log('No sentences');
            }
        }
    }
}

var arr = [
    'Captain Obvious was walking down the street. As the captain was walking a person came and told him: You are Captain Obvious! He replied: Thank you CAPTAIN OBVIOUS you are the man!',
    'The captain was walking and he was obvious. He did not know what was going to happen to you in the future. Was he curious? We do not know.'
]

//output:
//The captain was walking and he was obvious.
//He did not know what was going to happen to you in the future.

var arr2 = [
    'Why, why is he so crazy, so so crazy? Why?',
    'There are no words that you should be matching. You should be careful.'
];

//output:
//No sentences

var arr3 = [
    'You will match no words in this text. Print No words in the console.',
    'Donot look at this text.You already have an output.'
];

//output:
//No words

//to do
var arr4 = [
    'Using motion triggered cameras located in the Yanachaga National Park in Peru, scientists found significant changes in animal behavior more than three weeks before a magnitude 7 earthquake struck the region in 2011. On a typical day the cameras recorded 5 to 15 animal sightings, but within the 23 day period in the run up to the earthquake, they recorded five or fewer sightings. For the five to seven days immediately before the earthquake, no animal movements were recorded at all an unusual phenomenon in a mountainous rainforest region normally teeming with wildlife.',
    'While science stops short of calling it a sixth sense, wild animals are generally more sensitive than people when it comes to responding to their environment. Humans are generalists, we are not specialized ecologically, she said. We don\' tlive in contact with thesoil or the ground.We \'ve insulated ourselves into concrete buildings in cities. While there have been reports of people displaying medical symptoms ahead of earthquakes, I think the effect would be negligible. However, I\' m prepared to keep an open mind on that subject.'
];

//to do
var arr5 = [
    'Lorem ipsum dolor sit amet, sale errem nam no, dictas scaevola posidonium id per. Cibo rebum eloquentiam in per, est vide suavitate et? Duo eu nostro dolorum eloquentiam, at mei libris prompta expetendis, ius hinc vero fabulas ad. Duo natum putant voluptatum ei. Vix option offendit erroribus no, his no meis menandri, ne sea cibo choro dicam. Mei agam consul electram at, vel te iisque regione! Brute adversarium consequuntur in ius, ius ex essent meliore. Sea no modus omnesque expetenda, vix ludus ceteros id, per ancillae voluptatum definitionem ea? Id vis tota dicam exerci, mea mollis expetenda ei? Vel no tation partiendo, eu nam dolore pertinax adversarium, ea sea ludus atomorum! Vix option suscipiantur concludaturque id. His elit vitae explicari ne. Duo ut nonumy iisque pertinax, ut meis zril mel?',
    'Lorem ipsum dolor sit amet, ut accumsan adipisci nam! Has oratio docendi vulputate ei, ut vis vidit ceteros. Vel eu dolor oblique, ea quot unum vel. Sint convenire at his, tempor constituam est ex. Cibo epicuri ne est, per no convenire erroribus patrioque, has te utamur oblique scaevola! No euismod senserit concludaturque has? Ei legere commodo appellantur duo, assum ponderum eu sea, nulla graece no duo? Et erant eirmod propriae his, qui invenire scripserit efficiantur ut. Integre referrentur mea at. At amet ocurreret qui, cum libris possim praesent ea, velit legere viderer an his? Vim quis solet eirmod cu. Saperet perfecto cum eu, dicant ornatus vix ne. Discere euismod detraxit has ex, sea cibo legere adolescens cu, pro eu alii elit. Ex probatus signiferumque vel? Id vix audiam delectus necessitatibus, quod ocurreret disputationi eos cu. Mea eu animal fabellas sensibus, ut sit paulo torquatos! Oratio forensibus ut ius, sed scaevola torquatos definitionem an. Everti option atomorum cu quo, vix tempor postea tincidunt ea, eu viderer aliquid democritum mel. Sed dicta abhorreant contentiones ne, sed laoreet invenire democritum cu! Per laudem sententiae ea! Nam numquam commune vulputate ex. Ridens verear disputando qui eu, per in debitis accusamus consetetur, et nec hinc nostrum evertitur? Id est iuvaret mediocrem, fastidii pertinax consectetuer sit ei, has quaeque eruditi an? Liber abhorreant argumentum nam te, eos in inimicus mnesarchum.'
];

solve(arr);