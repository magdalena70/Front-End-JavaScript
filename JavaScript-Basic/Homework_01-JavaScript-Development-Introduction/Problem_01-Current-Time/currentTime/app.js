function displayCurrentDate() {
    var currentDate = new Date();
    var dateUTCFormat = currentDate.toUTCString();

    console.log(dateUTCFormat);
}

displayCurrentDate();