var app = angular.module('DeezerAngularJS', ['ngRoute', 'ngMaterial', 'ngResource', 'md.data.table']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'app/home/home.html',
			controller: 'HomeController'

		})
		.when('/playlist', {
			templateUrl: 'app/playlist/playlist.html',
			controller: 'PlaylistController'

		})
		.when('/playlist/:playlistId', {
			templateUrl: 'app/playlist/playlist.html',
			controller: 'PlaylistController'

		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);


}]);
