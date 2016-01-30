function solve(arr) {
    if (arr.length) {
        //console.log(arr);
        var index, tableRow, productName, price, products = [];
        
        for (index = 2; index < arr.length - 1; index++) {
            tableRow = arr[index].split(/<tr>|<td>|<\/td>|<\/tr>/).filter(Boolean);
            //console.log(tableRow);
            productName = tableRow[0];
            price = tableRow[1];
            votes = tableRow[2];
            
            products.push({
                name: productName,
                price: price,
                votes: votes
            });
        }
        
        products.sort(function (a, b) {
            if (a.price === b.price) {
                return a.name.localeCompare(b.name);
            }
            
            return a.price - b.price;
        });
        
        console.log(arr[0] + '\r\n' + arr[1]);
        for (var i in products) {
            console.log('<tr><td>%s</td><td>%s</td><td>%s</td></tr>', products[i].name, products[i].price, products[i].votes);
        }
        
        console.log(arr[arr.length - 1]);
    }
}

var arr = [
    '<table>',
    '<tr><th>Product</th><th>Price</th><th>Votes</th></tr>',
    '<tr><td>Vodka Finlandia 1 l</td><td>19.35</td><td>+12</td></tr>',
    '<tr><td>Ariana Radler 0.5 l</td><td>1.19</td><td>+33</td></tr>',
    '<tr><td>Laptop HP 250 G2</td><td>629</td><td>+1</td></tr>',
    '<tr><td>Kamenitza Grapefruit 1 l</td><td>1.85</td><td>+7</td></tr>',
    '<tr><td>Cofee Davidoff 250 gr.</td><td>11.99</td><td>+11</td></tr>',
    '</table>'
];
/*<table>
<tr><th>Product</th><th>Price</th><th>Votes</th></tr>
<tr><td>Ariana Radler 0.5 l</td><td>1.19</td><td>+33</td></tr>
<tr><td>Kamenitza Grapefruit 1 l</td><td>1.85</td><td>+7</td></tr>
<tr><td>Cofee Davidoff 250 gr.</td><td>11.99</td><td>+11</td></tr>
<tr><td>Vodka Finlandia 1 l</td><td>19.35</td><td>+12</td></tr>
<tr><td>Laptop HP 250 G2</td><td>629</td><td>+1</td></tr>
</table>
*/

var arr2 = [
    '<table>',
    '<tr><th>Product</th><th>Price</th><th>Votes</th></tr>',
    '<tr><td>Kamenitza Grapefruit 1 l</td><td>1.85</td><td>+7</td></tr>',
    '<tr><td>Vodka Finlandia 1 l</td><td>19.35</td><td>+12</td></tr>',
    '<tr><td>Laptop Lenovo IdeaPad B5400</td><td>929.00</td><td>0</td></tr>',
    '<tr><td>Laptop ASUS ROG G550JK-CN268D</td><td>1939.00</td><td>+1</td></tr>',
    '<tr><td>Ariana Radler 0.5 l</td><td>1.19</td><td>+33</td></tr>',
    '<tr><td>Coffee Davidoff 250 gr.</td><td>11.99</td><td>+11</td></tr>',
    '</table>'
];
/*<table>
<tr><th>Product</th><th>Price</th><th>Votes</th></tr>
<tr><td>Ariana Radler 0.5 l</td><td>1.19</td><td>+33</td></tr>
<tr><td>Kamenitza Grapefruit 1 l</td><td>1.85</td><td>+7</td></tr>
<tr><td>Coffee Davidoff 250 gr.</td><td>11.99</td><td>+11</td></tr>
<tr><td>Vodka Finlandia 1 l</td><td>19.35</td><td>+12</td></tr>
<tr><td>Laptop Lenovo IdeaPad B5400</td><td>929.00</td><td>0</td></tr>
<tr><td>Laptop ASUS ROG G550JK-CN268D</td><td>1939.00</td><td>+1</td></tr>
</table>
*/

solve(arr);