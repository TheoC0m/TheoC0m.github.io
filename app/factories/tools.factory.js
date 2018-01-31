angular.module('StarWarsAngularJS')
	.factory('ToolsFactory', ['$http', 'FilmsService', 'VehiclesService', 'PlanetsService', 'StarshipsService', 'SpeciesService', 'PeopleService',
		function($http, FilmsService, VehiclesService, PlanetsService, StarshipsService, SpeciesService, PeopleService) {
			var methods = {

				extractUrlId: function(string) {
					if(string != null){
						var tab = string.split("/");
						return tab[tab.length - 2];
					}
					else{
						return undefined;
					}
				},

				getFilmUrlName: function(filmsUrlArray) {
					var filmsUrlName = [];
					angular.forEach(filmsUrlArray, function(film) {
						FilmsService.getFilms(methods.extractUrlId(film)).then(function(response) {
							if (response != undefined)
								filmsUrlName.push({
									name: response.data.title,
									id: methods.extractUrlId(response.data.url)
								});
							else
								filmsUrlName.push({
									name: "unknow",
									id: "unknow"
								});
						});
					});
					return filmsUrlName;
				},

				getVehiclesUrlName: function(vehiclesUrlArray) {
					var vechiclesUrlName = [];
					angular.forEach(vehiclesUrlArray, function(vehicle) {
						VehiclesService.getVehicles(methods.extractUrlId(vehicle)).then(function(response) {
							if (response != undefined)
								vechiclesUrlName.push({
									name: response.data.name,
									id: methods.extractUrlId(response.data.url)
								});
							else
								vechiclesUrlName.push({
									name: "unknow",
									id: "unknow"
								});
						});
					});
					return vechiclesUrlName;
				},

				getPlanetsUrlName: function(planetsUrlArray) {
					if (!(planetsUrlArray instanceof Array)) {
						var tmp = planetsUrlArray;
						var planetsUrlArray = [tmp];
					}
					var planetsUrlName = [];
					angular.forEach(planetsUrlArray, function(planet) {
						PlanetsService.getPlanets(methods.extractUrlId(planet)).then(function(response) {
							if (response != undefined)
								planetsUrlName.push({
									name: response.data.name,
									id: methods.extractUrlId(response.data.url)
								});
							else
								planetsUrlName.push({
									name: "unknow",
									id: "unknow"
								});
						});
					});
					return planetsUrlName;
				},

				getStarshipsUrlName: function(starshipsUrlArray) {
					var starshipsUrlName = [];
					angular.forEach(starshipsUrlArray, function(starship) {
						StarshipsService.getStarships(methods.extractUrlId(starship)).then(function(response) {
							if (response != undefined)
								starshipsUrlName.push({
									name: response.data.name,
									id: methods.extractUrlId(response.data.url)
								});
							else
								starshipsUrlName.push({
									name: "unknow",
									id: "unknow"
								});
						});
					});
					return starshipsUrlName;
				},

				getSpeciesUrlName: function(speciesUrlArray) {
					var speciesUrlName = [];
					angular.forEach(speciesUrlArray, function(race) {
						SpeciesService.getSpecies(methods.extractUrlId(race)).then(function(response) {
							if (response != undefined)
								speciesUrlName.push({
									name: response.data.name,
									id: methods.extractUrlId(response.data.url)
								});
							else
								speciesUrlName.push({
									name: "unknow",
									id: "unknow"
								});
						});
					});
					return speciesUrlName;
				},

				getPeopleUrlName: function(peopleUrlArray) {
					var peopleUrlName = [];
					angular.forEach(peopleUrlArray, function(person) {
						PeopleService.getPeople(methods.extractUrlId(person)).then(function(response) {
							if (response != undefined)
								peopleUrlName.push({
									name: response.data.name,
									id: methods.extractUrlId(response.data.url)
								});
							else
								peopleUrlName.push({
									name: "unknow",
									id: "unknow"
								});
						});
					});
					return peopleUrlName;
				},

			}
			return methods
		}
	])
