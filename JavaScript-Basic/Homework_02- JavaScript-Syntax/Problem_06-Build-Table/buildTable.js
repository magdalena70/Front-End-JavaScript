function buildTable(numbersArr) {
    var startNumInput = Number(numbersArr[0]);
    var endNumInput = Number(numbersArr[1]);
    var thead = "<tr><th>Num</th><th>Square</th><th>Fib</th></tr>";
    function calcFib(num) {
        if (num <= 3) {
            return ("yes");
        }

        var fibNum;
        var a = 2;
        var b = 3;
        for (var i = 0; i < 1000000; i++) {
            fibNum = a + b;
            a = b;
            b = fibNum;
            if (num == fibNum) {
                return ("yes");
            }
        }

        return ("no");
    }

    console.log("<table>");
    console.log(thead);
    for (var i = startNumInput; i <= endNumInput; i++) {
        console.log("<tr><td>" + i + "</td><td>" + (i * i) + "</td><td>" + calcFib(i) + "</td></tr>")
    }

    console.log("</table> \r\n");
}

buildTable([2, 6]);
buildTable([55, 56]);
buildTable(['2', " 6h"]);//check string
buildTable([]);//check empty array