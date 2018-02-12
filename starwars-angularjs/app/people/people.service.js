angular.module("StarWarsAngularJS")
	.service("PeopleService", ["$http", function($http){

		var service = {};

		service.getAllPeople = function(pageNumber){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/people/?page="+pageNumber
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.getPeople = function(peopleId){
			return $http({
				method: "GET",
				url: "https://swapi.co/api/people/"+peopleId+"/"
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.searchPeople = function(search){
			console.log("searched item:"+search);
			return $http({
				method: "GET",
				url: "https://swapi.co/api/people/?search="+search
			})
			.then(function(response){
				return response;
			})
			.catch(function(){
				return undefined;
			})
		}

		service.getFilmName = function(filmId){
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
