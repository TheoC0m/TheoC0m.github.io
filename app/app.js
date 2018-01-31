var app = angular.module('StarWarsAngularJS', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'

        })
        .when('/people', {
            templateUrl: 'app/people/people.html',
            controller: 'PeopleController'

        })
        .when('/people/:peopleId', {
            templateUrl: 'app/people/people.html',
            controller: 'PeopleController'

        })
        .when('/vehicles', {
            templateUrl: 'app/vehicles/vehicles.html',
            controller: 'VehiclesController'

        })
        .when('/vehicles/:vehicleId', {
            templateUrl: 'app/vehicles/vehicles.html',
            controller: 'VehiclesController'

        })
        .when('/films', {
            templateUrl: 'app/films/films.html',
            controller: 'FilmsController'

        })
        .when('/films/:filmId', {
            templateUrl: 'app/films/films.html',
            controller: 'FilmsController'

        })
        .when('/starships', {
            templateUrl: 'app/starships/starships.html',
            controller: 'StarshipsController'

        })
        .when('/starships/:starshipId', {
            templateUrl: 'app/starships/starships.html',
            controller: 'StarshipsController'

        })
        .when('/species', {
            templateUrl: 'app/species/species.html',
            controller: 'SpeciesController'

        })
        .when('/species/:speciesId', {
            templateUrl: 'app/species/species.html',
            controller: 'SpeciesController'

        })
        .when('/planets', {
            templateUrl: 'app/planets/planets.html',
            controller: 'PlanetsController'

        })
        .when('/planets/:planetId', {
            templateUrl: 'app/planets/planets.html',
            controller: 'PlanetsController'

        })
        .otherwise({
            redirectTo: '/'
        });
}]);
