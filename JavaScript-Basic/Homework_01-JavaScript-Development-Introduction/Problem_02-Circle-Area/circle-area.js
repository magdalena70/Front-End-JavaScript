function calcCircleArea(r){
	//area = 3.14 * (r * r)
	var area = Math.PI * (r * r);
	document.write("<p class='result'> r = <span>" + r + "</span>;  area = <span>" + area + "</span></p>");
}
	
calcCircleArea(7);
calcCircleArea(1.5);
calcCircleArea(20);