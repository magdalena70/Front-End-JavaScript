$(function(){
	var APP_KEY = "kid_Z1miGwiW1Z",
		APP_SECRET = "199eac1396444083adf75919d55aadd9",
		BASE_URL = "https://baas.kinvey.com/appdata/",
		USER_AUTHTOKEN = "Kinvey 72803e1a-d6da-4a2f-ba6a-dd283cad4e45.BcLNeK9rP2mUi4ziNQ5iEUt/NMwbfRGbBSV5y+d7bMM=",
		CONTENT_TYPE = "application/json",
		newCountryName;
	
	$("<p>").attr("id", "printError")
			.prependTo($("body")).hide();
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
				url: BASE_URL + APP_KEY + "/countries"
			}).success(function(data){
					//console.log(data);
					addCountryToDom(data, "#country");
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
				url: BASE_URL + APP_KEY + "/towns?resolve=country"
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
				url: BASE_URL + APP_KEY + '/towns?query={"country._id":"' + countryId + '"}'
			}).success(function(data){
					//console.log(data);
					addTownToDom(data, "#town");
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
					//console.log(data);
					addCountryToDom(data, "#country");
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
					printSuccess("Town added successfully!");
			}).error(function(err){
				printError(err.responseText);
			})
	}
	
	// Add to DOM
	function addCountryToDom(countryData, parentId){
		var parent = $(parentId).empty(),
			country, countryName, countryDetails, countryId,
			getTownsByCountryBtn, addTownBtn, newTownName;
		
		$('#newTown').show();
		$('#printError').hide();
		$('#printSuccess').hide();
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
						$("#newTown").css("border", "1px solid red");
						printError("Town's name can not be empty!");
					}else{
						addTownInCurrentCountry(newTownName, $(this).parent().attr("id"));
						$("#newTown").css("border", "none");
					}
					
					$("#newTownName").val('');
				});
			
			countryName = $("<p>").attr("id", countryId)
				.text(countryData[country].name)
				.append(getTownsByCountryBtn)
				.append(addTownBtn)
				.appendTo(parent);
		}
	}
	
	function addTownToDom(townData, parentId){
		var parent = $(parentId).empty(),
			town, townName, townDetails, countryTown;
		
		$('#printError').hide();
		$('#printSuccess').hide();
		for(town in townData){
			townName = $("<p>").text(townData[town].name)
				.appendTo(parent);
			if(townData[town].country._obj){
				townName.text(townData[town].name + ": country " + townData[town].country._obj.name);
			}
		}
	}
	
	function printSuccess(message){
		$('#printError').hide();
		$("<p>").text(message)
			.attr("id", "printSuccess")
			.prependTo($("body"));
	}
	
	function printError(err){
		//console.log(err.responseText);
		$('#printSuccess').hide();
		$("#printError").text(err).show();
		return false;
	}
}());