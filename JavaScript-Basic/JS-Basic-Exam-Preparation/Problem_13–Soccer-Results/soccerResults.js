function solve(arr) {
    if (arr.length) {
        //console.log(arr);
        var homeTeam, awayTeam, homeGoals, awayGoals, index, currLine,
            teams = {}, sortedKeys = [], keyCounter, sortedTeams = {}, key;
        
        for (index in arr) {
            if (arr[index].indexOf('/') > -1 && arr[index].indexOf(':') > -1 && arr[index].indexOf('-') > -1) {
                currLine = arr[index].split(/\/|:|-/g);
                homeTeam = currLine[0].trim();
                awayTeam = currLine[1].trim();
                homeGoals = Number(currLine[2]);
                awayGoals = Number(currLine[3]);
                //console.log(homeTeam, awayTeam, homeGoals, awayGoals);
                
                createObj(teams, homeTeam, homeGoals, awayGoals, awayTeam);  
                createObj(teams, awayTeam, awayGoals, homeGoals, homeTeam);   
            }
        }
        
        for (index in teams) {
            sortedKeys.push(index);
            teams[index].matchesPlayedWith.sort();
        }
        
        sortedKeys.sort();
        for (keyCounter = 0; keyCounter < sortedKeys.length; keyCounter++) {
            key = sortedKeys[keyCounter];
            sortedTeams[key] = teams[key];
        }

        console.log(JSON.stringify(sortedTeams));
        
        function createObj(obj, key, value1, value2, value3) {
            if (!obj[key]) {
                obj[key] = {
                    goalsScored: 0,
                    goalsConceded: 0,
                    matchesPlayedWith: []
                };
            }
            
            obj[key].goalsScored += value1;
            obj[key].goalsConceded += value2;
            if (obj[key].matchesPlayedWith.indexOf(value3) == -1) {
                obj[key].matchesPlayedWith.push(value3);
            }
            
            return obj;
        }
    }
}

var arr = [
    'Germany / Argentina: 1-0',
    'Brazil / Netherlands: 0-3',
    'Netherlands / Argentina: 0-0',
    'Brazil / Germany: 1-7',
    'Argentina / Belgium: 1-0',
    'Netherlands / Costa Rica: 0-0',
    'France / Germany: 0-1',
    'Brazil / Colombia: 2-1'
];
/*{
 * "Argentina":{"goalsScored":1,"goalsConceded":1,"matchesPlayedWith":["Belgium","Germany","Netherlands"]},
 * "Belgium":{"goalsScored":0,"goalsConceded":1,"matchesPlayedWith":["Argentina"]},
 * "Brazil":{"goalsScored":3,"goalsConceded":11,"matchesPlayedWith":["Colombia","Germany","Netherlands"]},
 * "Colombia":{"goalsScored":1,"goalsConceded":2,"matchesPlayedWith":["Brazil"]},
 * "Costa Rica":{"goalsScored":0,"goalsConceded":0,"matchesPlayedWith":["Netherlands"]},
 * "France":{"goalsScored":0,"goalsConceded":1,"matchesPlayedWith":["Germany"]},
 * "Germany":{"goalsScored":9,"goalsConceded":1,"matchesPlayedWith":["Argentina","Brazil","France"]},
 * "Netherlands":{"goalsScored":3,"goalsConceded":0,"matchesPlayedWith":["Argentina","Brazil","Costa Rica"]}
 * }
*/

solve(arr);