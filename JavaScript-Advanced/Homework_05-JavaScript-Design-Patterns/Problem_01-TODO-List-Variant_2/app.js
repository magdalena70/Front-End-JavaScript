(function(){
	document.getElementById('date').innerText = new Date().toDateString();
	var todoList = models.getContainer(getCurrDayName() + ' TODO List');
	todoList.addToDom('wrapper');

	console.log(models.getContainer('TODO List'));
}());