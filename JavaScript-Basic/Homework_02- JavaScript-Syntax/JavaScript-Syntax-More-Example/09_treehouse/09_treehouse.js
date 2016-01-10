function treeHouseCompare(arr){
    var a = arr[0];
    var b = arr[1];
    //houseArea = (a * a) + (a * ha / 2)
    var areaOfHouse = (a * a) + (a * (a - a/3) / 2);
    //treeArea = (a * b) + (3.14 * r * r)
    var areaOfTree = ((b / 3) * b) + (Math.PI * (b / 3 * 2) * (b / 3 * 2));

    if (areaOfHouse > areaOfTree) {
        console.log("house / " + areaOfHouse.toFixed(2));
    } else {
        console.log("tree / " + areaOfTree.toFixed(2));
    }
}

treeHouseCompare([3, 2]);
treeHouseCompare([3, 3]);
treeHouseCompare([4, 5]);

//Write a JavaScript function treeHouseCompare(arr) that accepts the following parameters:
//integers a and b.The function compares the area of the house and the area of the tree(Figure 1) and
//returns the name of the figure with biggerarea(house or tree)and the value of the area.
//Write JS program treehouse.js that compares a few houses and trees.
//The result should be printed on the console.Run the program through Node.js.

//Example:
//Input	        Output
//[3, 2]        house / 12.00
//[3, 3]        tree / 15.57
//[4, 5]        tree / 43.24
