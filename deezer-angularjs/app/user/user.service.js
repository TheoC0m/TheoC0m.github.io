angular.module("DeezerAngularJS")
	.service("MyUserService", ["$http", 'DeezerService', function($http, DeezerService) {
		//the service is named MyUserService instead of UserService because 'UserService' was causing a bug

		// var service = {};

	this.getMe = function() {
			return $http({
					method: "GET",
					url: DeezerService.apiUrl + '/user/me' + '?output=json&access_token=' + localStorage.getItem('deezer-access_token')
				})
				.then(function(response) {

					//console.log(response);
					var data = response.data;
					//console.log(data);
					return data;
				})
				.catch(function() {
					return undefined;
				})
		}




		// return service;
	}])
