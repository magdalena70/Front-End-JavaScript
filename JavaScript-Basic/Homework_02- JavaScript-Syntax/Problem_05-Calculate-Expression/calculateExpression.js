var evalResult = document.getElementById("eval_result_btn");
evalResult.onclick = calcExpression;

function calcExpression() {
		var inputExpression = document.getElementById("input_expression");
		if(inputExpression.value){
			var result  = inputExpression.value;
			document.getElementById("output_result").innerHTML = 'Invalid expression! Try again.';
			document.getElementById("output_result").style.color = 'red';
			document.getElementById("output_result").innerHTML = eval(result);
			document.getElementById("output_result").style.color = '#fff';
		}else{
			document.getElementById("output_result").innerHTML = "Empty input! Put expression in the text field.";
			document.getElementById("output_result").style.color = 'red';
		}
}

var clear = document.getElementById("clear_btn");
clear.onclick = tryAgain;
function tryAgain () {
    document.getElementById("output_result").innerHTML = "";
	document.getElementById("input_expression").value = "";
}