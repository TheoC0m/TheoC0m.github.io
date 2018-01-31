angular.module("StarWarsAngularJS")
	.service("SpeciesService", ["$http", function($http){

		var service = {};

		service.getAllSpecies = function(pageNumber){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/species/?page="+pageNumber
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.getSpecies = function(speciesId){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/species/"+speciesId+"/"
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.searchSpecies = function(search){
			console.log("searched item:"+search);
			return $http({
				method: "GET",
				url: "https://swapi.co/api/species/?search="+search
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
