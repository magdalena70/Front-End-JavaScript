$(function(){
	var APP_KEY = "kid_Z1miGwiW1Z",
		APP_SECRET = "199eac1396444083adf75919d55aadd9",
		BASE_URL = "https://baas.kinvey.com/appdata/",
		USER_AUTHTOKEN = "Kinvey 72803e1a-d6da-4a2f-ba6a-dd283cad4e45.BcLNeK9rP2mUi4ziNQ5iEUt/NMwbfRGbBSV5y+d7bMM=",
		CONTENT_TYPE = "application/json",
		newCountryName;
	
	$("<p>").attr("id", "printError")
		.prependTo($("body"))
		.hide();
	$("<p>").attr("id", "printSuccess")
		.prependTo($("body"))
		.hide();	
	$("<p>").attr("id", "printInfo")
		.prependTo($("body"))
		.hide();
		
	$('#newTown').hide();
	
	$('#getAllCountries').on('click', getAllCountries);
	$('#getAllTowns').on('click', getAllTowns);
	$('#addNewCountry').on('click', function(){
		newCountryName = $('#newCountryName').val();
		if(!newCountryName && newCountryName == false){
			printError("Country's name can not be empty!");
		}else{
			addCountry(newCountryName);
		}
		
		$('#newCountryName').val('');
	});
		
	function getAllCountries(){
		$.ajax({
				method: "GET",
				headers: {
					"Authorization": USER_AUTHTOKEN,
					"Content-Type": CONTENT_TYPE
				},
				url: BASE_URL + APP_KEY + "/countries?sort={\"name\":1}"
			}).success(function(data){
					//console.log(data);
					addAllCountriesToDom(data, "#country");
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	function getAllTowns(){
		$.ajax({
				method: "GET",
				headers: {
					"Authorization": USER_AUTHTOKEN,
					"Content-Type": CONTENT_TYPE
				},
				url: BASE_URL + APP_KEY + "/towns?resolve=country&sort={\"country\":1}"
			}).success(function(data){
					//console.log(data);
					addTownToDom(data, "#town");
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	function getTownsByCountry(countryId){
		$.ajax({
				method: "GET",
				headers: {
					"Authorization": USER_AUTHTOKEN,
					"Content-Type": CONTENT_TYPE
				},
				url: BASE_URL + APP_KEY + '/towns?query={"country._id":"' + countryId + '"}&sort={"name":1}'
			}).success(function(data){
					if(data.length){
						addTownToDom(data, "#town");	
					}else{
						addTownToDom(data, "#town");
						printInfo("No towns in this country.");	
					}
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	function addCountry(newCountryName){
		$.ajax({
				method: "POST",
				headers: {
					"Authorization": USER_AUTHTOKEN,
					"Content-Type": CONTENT_TYPE
				},
				data: JSON.stringify({
					"name": newCountryName
				}),
				url: BASE_URL + APP_KEY + '/countries'
			}).success(function(data){
					addNewCountryToDom(data, "#country");
					printSuccess("Country " + data.name + " added successfully!");
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	function addTownInCurrentCountry(newTownName, countryId){
		$.ajax({
				method: "POST",
				headers: {
					"Authorization": USER_AUTHTOKEN,
					"Content-Type": CONTENT_TYPE
				},
				data: JSON.stringify({
					"name": newTownName,
					"country": 
					{
						"_type": "KinveyRef",
						"_id": countryId,
						"_collection": "countries"
					}
				}),
				url: BASE_URL + APP_KEY + '/towns'
			}).success(function(data){
					printSuccess("Town " + data.name + " added successfully!");
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	function removeCountry(countryId){
		$.ajax({
				method: "DELETE",
				headers: {
					"Authorization": USER_AUTHTOKEN,
				},
				url: BASE_URL + APP_KEY + '/countries/' + countryId
			}).success(function(){
					removeTownByCountry(countryId);
					printSuccess("Country removed successfully!");
					$("#town").empty();
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	function removeTownByCountry(countryId){
		$.ajax({
				method: "DELETE",
				headers: {
					"Authorization": USER_AUTHTOKEN,
				},
				url: BASE_URL + APP_KEY + '/towns?query={"country._id":"' + countryId + '"}'
			}).success(function(){
					$("#town").empty();
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	function removeTown(townId){
		$.ajax({
				method: "DELETE",
				headers: {
					"Authorization": USER_AUTHTOKEN,
				},
				url: BASE_URL + APP_KEY + '/towns/' + townId
			}).success(function(){
					printSuccess("Town removed successfully!");
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	// Add to DOM
	function addNewCountryToDom(countryData, parentId){
		var parent = $(parentId).empty(),
			countryName;
		
		$('#newTown').show();
		$('#printError').hide();
		$('#printSuccess').hide();
		$("#newTown").css("backgroundColor", "#fff");
		
		if(countryData.name){
			countryName = $("<p>").attr("id", countryData._id)
				.css("fontStyle", "italic")
				.text(countryData.name)
				.appendTo(parent);
		}
	}
	
	function addAllCountriesToDom(countryData, parentId){
		var parent = $(parentId).empty(),
			country, countryName, countryId, newTownName,
			getTownsByCountryBtn, addTownBtn, removeCountryBtn;
		
		$('#newTown').show();
		$('#printError').hide();
		$('#printSuccess').hide();
		$("#newTown").css("backgroundColor", "#fff");
		
		for(country in countryData){
			countryId = countryData[country]._id;
			
			getTownsByCountryBtn = $("<button>").text("Get towns by country")
				.on('click', function(){
					getTownsByCountry($(this).parent().attr("id"));
				});
				
			addTownBtn = $("<button>").text("Add town")
				.on('click', function(){
					newTownName = $("#newTownName").val();
					if(!newTownName && newTownName == false){
						$("#newTown").css("backgroundColor", "red");
						printError("Town's name can not be empty!");
					}else{
						addTownInCurrentCountry(newTownName, $(this).parent().attr("id"));
						$("#newTown").css("backgroundColor", "#fff");
					}
					
					$("#newTownName").val('');
				});
				
			removeCountryBtn = $("<button>").text("X")
				.css("color", "red")
				.on('click', function(){
					removeCountry($(this).parent().attr("id"));
					$(this).parent().hide();
				});
			
			countryName = $("<p>").attr("id", countryId);
			if(countryData[country].name){
				countryName.text(countryData[country].name)
				.css("fontStyle", "italic")
				.append(getTownsByCountryBtn)
				.append(addTownBtn)
				.append(removeCountryBtn)
				.appendTo(parent);
			}
		}
	}
	
	function addTownToDom(townData, parentId){
		var parent = $(parentId).empty(),
			town, townName, removeTownBtn;
		
		$('#printError').hide();
		$('#printSuccess').hide();
		$("#newTown").css("backgroundColor", "#fff");
		
		for(town in townData){
			removeTownBtn = $("<button>").text("X")
			.css("color", "red")
			.on('click', function(){
				removeTown($(this).parent().attr("id"));
				$(this).parent().hide();
			});
		
			townName = $("<p>").text(townData[town].name)
				.css("fontStyle", "italic")
				.attr("id", townData[town]._id)
				.append(removeTownBtn)
				.appendTo(parent);
			if(townData[town].country._obj){
				townName.text(townData[town].name + ": country " + townData[town].country._obj.name);
			}
		}
	}
	
	// notifications
	function printInfo(info){
		$('#printError').hide();
		$('#printSuccess').hide();
		$("#printInfo").text(info).show();
	}
	
	function printSuccess(message){
		$('#printError').hide();
		$('#printInfo').hide();
		$("#printSuccess").text(message).show();
	}
	
	function printError(err){
		$('#printSuccess').hide();
		$("#printError").text(err).show();
		return false;
	}
}());