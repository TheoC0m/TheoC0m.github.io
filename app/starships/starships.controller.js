angular.module('StarWarsAngularJS')
	.controller('StarshipsController', ['$scope', '$location', '$routeParams', 'StarshipsService', 'ToolsFactory',
		function($scope, $location, $routeParams, StarshipsService, ToolsFactory) {


			$scope.getAllStarships = function() {
				StarshipsService.getAllStarships($scope.pageNumber)
					.then(function(response) {
						if (response != undefined) {
							$scope.starships = response;
							console.log($scope.starships);
						}
						$scope.loaded = true;
					})
			}

			$scope.getStarships = function() {
				StarshipsService.getStarships($routeParams.starshipId)
					.then(function(response) {
						if (response != undefined) {
							$scope.starship = response;
							console.log($scope.starship);

							$scope.filmsUrlName = ToolsFactory.getFilmUrlName(response.data.films);
							$scope.peopleUrlName = ToolsFactory.getPeopleUrlName(response.data.pilots);
						}
						$scope.loaded = true;
					})
			}

			$scope.searchStarships = function() {
				StarshipsService.searchStarships($scope.starshipsSearched)
					.then(function(response) {
						if (response != undefined) {
							console.log(response);
							console.log($scope.starshipsSearched);
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
				$scope.getAllStarships();
			}

			$scope.pageNumberDecrement = function() {
				if ($scope.pageNumber > 1)
					$scope.pageNumber--;
				$scope.getAllStarships();
			}

			$scope.start = function() {
				console.log($routeParams);
				$scope.loaded = false;
				$scope.starshipsSearched = '';
				$scope.searchResult = null;
				$scope.starship = null;
				$scope.starships = null;
				$scope.filmsUrlName = [];
				$scope.peopleUrlName = [];

				if ($routeParams.starshipId) {
					$scope.getStarships();

				} else {
					$scope.pageNumber = 1;
					$scope.getAllStarships();
				}
			}

			$scope.start();

		}
	])
