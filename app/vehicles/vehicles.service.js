angular.module("StarWarsAngularJS")
	.service("VehiclesService", ["$http", function($http){

		var service = {};

		service.getAllVehicles = function(pageNumber){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/vehicles/?page="+pageNumber
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.getVehicles = function(vehicleId){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/vehicles/"+vehicleId+"/"
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.searchVehicles = function(search){
			console.log("searched item:"+search);
			return $http({
				method: "GET",
				url: "https://swapi.co/api/vehicles/?search="+search
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}


		return service;
	}])
