angular.module('StarWarsAngularJS')
	.controller('PeopleController', ['$scope', '$location', '$routeParams', 'PeopleService', 'ToolsFactory',
		function($scope, $location, $routeParams, PeopleService, ToolsFactory) {

			$scope.getAllPeople = function() {
				PeopleService.getAllPeople($scope.pageNumber)
					.then(function(response) {
						if (response != undefined) {
							$scope.peoples = response;
							console.log($scope.peoples);
						}
						$scope.loaded = true;
					})
			}

			$scope.getPeople = function() {
				PeopleService.getPeople($routeParams.peopleId)
					.then(function(response) {
						if (response != undefined) {
							$scope.people = response;
							console.log($scope.people);

							$scope.filmsUrlName = ToolsFactory.getFilmUrlName(response.data.films);
							$scope.vehiclesUrlName = ToolsFactory.getVehiclesUrlName(response.data.vehicles);
							$scope.starshipsUrlName = ToolsFactory.getStarshipsUrlName(response.data.starships);
							$scope.planetsUrlName = ToolsFactory.getPlanetsUrlName(response.data.homeworld);
							$scope.speciesUrlName = ToolsFactory.getSpeciesUrlName(response.data.species);
						}
						$scope.loaded = true;
					})
			}

			$scope.searchPeople = function() {
				PeopleService.searchPeople($scope.peopleSearched)
					.then(function(response) {
						if (response != undefined) {
							console.log(response);
							console.log($scope.peopleSearched);
							$scope.searchResult = response;
						}
					})
			}

			$scope.extractUrlId = function(string) {
				return ToolsFactory.extractUrlId(string);
			}

			$scope.pageNumberIncrement = function() {
				$scope.pageNumber++;
				$scope.getAllPeople();
			}

			$scope.pageNumberDecrement = function() {
				if ($scope.pageNumber > 1)
					$scope.pageNumber--;
				$scope.getAllPeople();
			}

			$scope.start = function() {
				console.log($routeParams);
				$scope.loaded = false;
				$scope.peopleSearched = '';
				$scope.searchResult = null;
				$scope.people = null;
				$scope.peoples = null;

				$scope.filmsUrlName = [];
				$scope.vehiclesUrlName = [];
				$scope.planetsUrlName = [];
				$scope.starshipsUrlName = [];
				$scope.speciesUrlName = [];

				if ($routeParams.peopleId) {
					$scope.getPeople();
				} else {
					$scope.pageNumber = 1;
					$scope.getAllPeople();
				}
			}

			$scope.start();
		}
	])
