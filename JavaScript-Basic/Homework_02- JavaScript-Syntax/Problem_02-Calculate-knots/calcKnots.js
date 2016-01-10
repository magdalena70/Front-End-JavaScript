function convertKmPerHourToKnots(kmPerHour){
    //1 km/h = 0.539956803 knot
    var knots = kmPerHour * 0.539956803;

    console.log(knots.toFixed(2));
}

convertKmPerHourToKnots(20);
convertKmPerHourToKnots(112);
convertKmPerHourToKnots(400);