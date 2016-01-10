function calcCylinderVol(inputArr) {
    //volume of the cylinder = 3.14 * (r * r) * height
    var radius = inputArr[0];
    var height = inputArr[1];
    var volume = Math.PI * (radius * radius) * height;
    
    console.log(volume.toFixed(3));
}

calcCylinderVol([2, 4]);
calcCylinderVol([5, 8]);
calcCylinderVol([12, 3]);