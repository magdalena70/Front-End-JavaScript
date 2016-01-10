function revealTriangles(matrix){
    
    for (var i = 0; i < matrix.length; i++) {
        var string = matrix[i];

        for (var j = 0; j < string.length; j++) {
            var char = string[j];
           
            //if(matrix[i + 1][j] && matrix[i + 1][j + 1] && matrix[i + 1][j - 1]){
                if (char === matrix[i + 1][j] && char === matrix[i + 1][j + 1] && char === matrix[i + 1][j - 1]) {
                
                    matrix[i][j] = '*';
                    matrix[i + 1][j] = '*';
                    matrix[i + 1][j + 1] = '*';
                    matrix[i + 1][j - 1] = '*';
                   //console.log("matrix[" + i + "][" + j + "] = * ");
                } 
            //}

            console.log("matrix[" + i + "][" + j + "] = " + matrix[i][j]);
        }
    }
}

revealTriangles(["abcdexgh",
                 "bbbdxxxh",
                 "abcxxxxx"]);