angular.module("StarWarsAngularJS")
	.service("StarshipsService", ["$http", function($http){

		var service = {};

		service.getAllStarships = function(pageNumber){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/starships/?page="+pageNumber
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.getStarships = function(starshipId){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/starships/"+starshipId+"/"
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.searchStarships = function(search){
			console.log("searched item:"+search);
			return $http({
				method: "GET",
				url: "https://swapi.co/api/starships/?search="+search
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
