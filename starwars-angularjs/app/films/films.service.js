angular.module("StarWarsAngularJS")
	.service("FilmsService", ["$http", function($http){

		var service = {};

		service.getAllFilms = function(pageNumber){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/films/?page="+pageNumber
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.getFilms = function(filmId){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/films/"+filmId+"/"
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
