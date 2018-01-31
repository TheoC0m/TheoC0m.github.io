angular.module('StarWarsAngularJS')
	.controller('VehiclesController', ['$scope', '$location', '$routeParams', 'VehiclesService', 'ToolsFactory',
		function($scope, $location, $routeParams, VehiclesService, ToolsFactory) {


			$scope.getAllVehicles = function() {
				VehiclesService.getAllVehicles($scope.pageNumber)
					.then(function(response) {
						if (response != undefined) {
							$scope.vehicles = response;
							console.log($scope.vehicles);
						}
						$scope.loaded = true;
					})
			}

			$scope.getVehicles = function() {
				VehiclesService.getVehicles($routeParams.vehicleId)
					.then(function(response) {
						if (response != undefined) {
							$scope.vehicle = response;
							console.log($scope.vehicle);
							$scope.filmsUrlName = ToolsFactory.getFilmUrlName(response.data.films);
							$scope.peopleUrlName = ToolsFactory.getPeopleUrlName(response.data.pilots);
						}
						$scope.loaded = true;
					})
			}

			$scope.searchVehicles = function() {
				VehiclesService.searchVehicles($scope.vehiclesSearched)
					.then(function(response) {
						if (response != undefined) {
							console.log(response);
							console.log($scope.vehiclesSearched);
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
				$scope.getAllVehicles();
			}

			$scope.pageNumberDecrement = function() {
				if ($scope.pageNumber > 1)
					$scope.pageNumber--;
				$scope.getAllVehicles();
			}

			$scope.start = function() {
				console.log($routeParams);
				$scope.loaded = false;
				$scope.vehiclesSearched = '';
				$scope.searchResult = null;
				$scope.vehicle = null;
				$scope.vehicles = null;
				$scope.filmsUrlName = [];
				$scope.peopleUrlName = [];
				if ($routeParams.vehicleId) {
					$scope.getVehicles();

				} else {
					$scope.pageNumber = 1;
					$scope.getAllVehicles();
				}
			}

			$scope.start();

		}
	])
