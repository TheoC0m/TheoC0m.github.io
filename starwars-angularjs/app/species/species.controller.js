angular.module('StarWarsAngularJS')
	.controller('SpeciesController', ['$scope', '$location', '$routeParams', 'SpeciesService', 'ToolsFactory',
		function($scope, $location, $routeParams, SpeciesService, ToolsFactory) {


			$scope.getAllSpecies = function() {
				SpeciesService.getAllSpecies($scope.pageNumber)
					.then(function(response) {
						if (response != undefined) {
							$scope.species = response;
							console.log($scope.species);
						}
						$scope.loaded = true;
					})
			}

			$scope.getSpecies = function() {
				SpeciesService.getSpecies($routeParams.speciesId)
					.then(function(response) {
						if (response != undefined) {
							$scope.race = response;
							console.log($scope.race);

							$scope.filmsUrlName = ToolsFactory.getFilmUrlName(response.data.films);
							$scope.peopleUrlName = ToolsFactory.getPeopleUrlName(response.data.people);
							$scope.planetsUrlName = ToolsFactory.getPlanetsUrlName(response.data.homeworld);

						}
						$scope.loaded = true;
					})
			}

			$scope.searchSpecies = function() {
				SpeciesService.searchSpecies($scope.speciesSearched)
					.then(function(response) {
						if (response != undefined) {
							console.log(response);
							$scope.searchResult = response;
							console.log($scope.speciesSearched);
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
				$scope.getAllSpecies();
			}

			$scope.pageNumberDecrement = function() {
				if ($scope.pageNumber > 1)
					$scope.pageNumber--;
				$scope.getAllSpecies();
			}

			$scope.start = function() {
				console.log($routeParams);
				$scope.loaded = false;
				$scope.race = null;
				$scope.species = null;
				$scope.speciesSearched = '';
				$scope.searchResult = null;
				$scope.filmsUrlName = [];
				$scope.peopleUrlName = [];
				$scope.planetsUrlName = [];

				if ($routeParams.speciesId) {
					$scope.getSpecies();

				} else {
					$scope.pageNumber = 1;
					$scope.getAllSpecies();
				}
			}

			$scope.start();

		}
	])
