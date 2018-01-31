angular.module('StarWarsAngularJS')
	.controller('FilmsController', ['$scope', '$location', '$routeParams', 'FilmsService', 'ToolsFactory',
	 function($scope, $location, $routeParams, FilmsService, ToolsFactory){


		$scope.getAllFilms = function(){
			FilmsService.getAllFilms($scope.pageNumber)
				.then(function(response){
					if(response != undefined){
						$scope.films = response;
						console.log($scope.films);
					}
					$scope.loaded = true;
				})
		}

		$scope.getFilms = function(){
			FilmsService.getFilms($routeParams.filmId)
				.then(function(response){
					if(response != undefined){
						$scope.film = response;
						console.log($scope.film);

						$scope.peopleUrlName = ToolsFactory.getPeopleUrlName(response.data.characters);
						$scope.vehiclesUrlName = ToolsFactory.getVehiclesUrlName(response.data.vehicles);
						$scope.starshipsUrlName = ToolsFactory.getStarshipsUrlName(response.data.starships);
						$scope.planetsUrlName = ToolsFactory.getPlanetsUrlName(response.data.planets);
						$scope.speciesUrlName = ToolsFactory.getSpeciesUrlName(response.data.species);

						$scope.loaded = true;
					}
				})
		}

		$scope.extractUrlId = function(string){
			return ToolsFactory.extractUrlId(string);
		}

		$scope.pageNumberIncrement = function(){
				$scope.pageNumber ++;
				$scope.getAllFilms();
		}

		$scope.pageNumberDecrement = function(){
				if($scope.pageNumber > 0)
				$scope.pageNumber --;
				$scope.getAllFilms();
		}

		$scope.start = function(){
			console.log($routeParams);
			$scope.loaded = false;
			$scope.film = null;
			$scope.films = null;

			$scope.peopleUrlName = [];
			$scope.vehiclesUrlName = [];
			$scope.planetsUrlName = [];
			$scope.starshipsUrlName = [];
			$scope.speciesUrlName = [];


			if($routeParams.filmId){

				$scope.getFilms();

			}
			else{

				$scope.pageNumber = 1;
				$scope.getAllFilms();
			}
		}

		$scope.start();

	}])
