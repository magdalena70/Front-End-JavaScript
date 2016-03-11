var app = app || {};

app.requestModel = (function(){
	var AUTHORIZATION = "Kinvey c7d7e11a-1378-439f-83e9-9187773a8b41.pjomp1LShbeEuLD39jmFc/PfbLE5UhbU6LO2R7inX/M=",
			BASIC_HEADERS = {
					"Authorization": AUTHORIZATION,
					"Content-Type": "application/json"
				},
			METHOD_DELETE_HEADERS = {
					"Authorization": AUTHORIZATION,
				};

	function RequestModel(baseUrl, collectionName, query){
		this.baseUrl = baseUrl;
		this.collection = new Collection(baseUrl, collectionName, query);
	}
	
	var Requester = (function(){
		function makeRequest(method, url, data, headers, success, error){
			$.ajax({
				method: method,
				headers: headers,
				url: url,
				data: JSON.stringify(data),
				success: success,
				error: error
			})
		}
		
		return{
			makeRequest: makeRequest
		};
	}());
	
	var Collection = (function(){
		function Collection(baseUrl, collectionName, query){
			this.collectionName = collectionName;
			this.query = query || '';
			this.serviceUrl = baseUrl + this.collectionName;
		}
		
		Collection.prototype.getAllItems = function(success, error){
			return Requester.makeRequest("GET", this.serviceUrl + this.query, null, BASIC_HEADERS, success, error);
		}
		
		Collection.prototype.addItem = function(data, success, error){
			return Requester.makeRequest("POST", this.serviceUrl, data, BASIC_HEADERS, success, error);
		}
		
		Collection.prototype.editItem = function(itemId, data,  success, error){
			return Requester.makeRequest("PUT", this.serviceUrl + '/' + itemId, data, BASIC_HEADERS, success, error);
		}
		
		Collection.prototype.removeItem = function(itemId, success, error){
			return Requester.makeRequest("DELETE", this.serviceUrl + '/' + itemId, null, METHOD_DELETE_HEADERS, success, error);
		}
		
		Collection.prototype.getItemById = function(itemId, success, error){
			return Requester.makeRequest("GET", this.serviceUrl + '/' + itemId, null, BASIC_HEADERS, success, error);
		}
		
		return Collection;
	}());
	
	return{
		loadRequestModel: function(baseUrl, collectionName, query){
			return new RequestModel(baseUrl, collectionName, query);
		}
	};
}());