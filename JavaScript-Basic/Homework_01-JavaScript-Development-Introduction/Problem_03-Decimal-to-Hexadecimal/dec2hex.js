function Dec2hex(){
		this.render = function(){
			var background = document.getElementById('background');
			var inputbox = document.getElementById('inputbox');
			background.style.display = "block";
			inputbox.style.display = "block";
			document.getElementById('inputboxheader').innerHTML = "JavaScript";
			document.getElementById('inputboxcontent').innerHTML = 
				'<label for="inputDecimal" >Enter a number</label> <input type="text" id="inputDecimal" name="inputDecimal">';
			document.getElementById('inputboxfooter').innerHTML = 
				'<button onclick="Action.result()">OK</button> \t <button onclick="Action.cancel()">Cancel</button>';
		}
			
		this.cancel = function cancel(){
			document.getElementById('inputbox').style.display = "none";
			document.getElementById('background').style.display = "none";
		}
			
		this.result = function result(){
			var inputDecimal = (document.getElementById('inputDecimal').value);
			if(isInt(inputDecimal)){
				document.getElementById('inputboxheader').innerHTML = "JavaScript Alert";
				document.getElementById('inputboxcontent').innerHTML = parseInt(inputDecimal).toString(16).toUpperCase();
				document.getElementById('inputboxfooter').innerHTML = '<button onclick="Action.render()">Next</button>';
			}else{			
				document.getElementById('inputboxheader').innerHTML = "JavaScript Alert";
				document.getElementById('inputboxcontent').innerHTML = "<p>Inavalid value or empty input! Try again.</p>";
				document.getElementById('inputboxfooter').innerHTML = '<button onclick="Action.render()">Next</button>';
			}
			
			function isInt(value) {
				if (isNaN(value)) {
					return false;
				}
				
				var x = parseFloat(value);
				return (x | 0) === x;
			}
		}
	}
	
	var Action = new Dec2hex();