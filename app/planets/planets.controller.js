angular.module('StarWarsAngularJS')
	.controller('PlanetsController', ['$scope', '$location', '$routeParams', 'PlanetsService', 'ToolsFactory',
		function($scope, $location, $routeParams, PlanetsService, ToolsFactory) {
			$scope.getAllPlanets = function() {
				PlanetsService.getAllPlanets($scope.pageNumber)
					.then(function(response) {
						if (response != undefined) {
							$scope.planets = response;
							console.log($scope.planets);
						}
						$scope.loaded = true;
					})
			}
			$scope.getPlanets = function() {
				PlanetsService.getPlanets($routeParams.planetId)
					.then(function(response) {
						if (response != undefined) {
							$scope.planet = response;
							console.log($scope.planet);
							$scope.filmsUrlName = ToolsFactory.getFilmUrlName(response.data.films);
							$scope.peopleUrlName = ToolsFactory.getPeopleUrlName(response.data.residents);
						}
						$scope.loaded = true;
					})
			}
			$scope.searchPlanets = function() {
				PlanetsService.searchPlanets($scope.planetsSearched)
					.then(function(response) {
						if (response != undefined) {
							console.log(response);
							console.log($scope.planetsSearched);
							$scope.searchResult = response;
						}
					})
			}
			$scope.extractUrlId = function(string) {
				return ToolsFactory.extractUrlId(string);
			}
			// $scope.extractUrlId = function(string){
			// 	var tab = string.split("/");
			// 	return tab[tab.length - 2];
			// }
			$scope.pageNumberIncrement = function() {
				$scope.pageNumber++;
				$scope.getAllPlanets();
			}
			$scope.pageNumberDecrement = function() {
				if ($scope.pageNumber > 1)
					$scope.pageNumber--;
				$scope.getAllPlanets();
			}
			$scope.start = function() {
				console.log($routeParams);
				$scope.loaded = false;
				$scope.planetsSearched = '';
				$scope.searchResult = null;
				$scope.planet = null;
				$scope.planets = null;
				$scope.filmsUrlName = [];
				$scope.peopleUrlName = [];
				if ($routeParams.planetId) {
					$scope.getPlanets();
				} else {
					$scope.pageNumber = 1;
					$scope.getAllPlanets();
				}
			}
			$scope.start();
		}
	])
