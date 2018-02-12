angular.module("DeezerAngularJS")
	.service("DeezerService", ["$http", function($http) {

		var service = {};

		service.appID = "270562"

		service.redirectURI = "http://127.0.0.1/deezer-angularjs/";

		service.permissions = "basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history";

		service.apiUrl = "https://cors-anywhere.herokuapp.com/https://api.deezer.com";

		service.isConnected = function() {
			//if the access_token exists in localstorage then the user is connectde
			return (!(typeof localStorage.getItem('deezer-access_token') === 'undefined' || localStorage.getItem('deezer-access_token') === null));
		}

		service.deezerLogin = function() {
			console.log("deezer login window");

			window.location.href = "https://connect.deezer.com/oauth/auth.php?app_id=" + service.appID + "&redirect_uri=" + service.redirectURI + "&perms=" + service.permissions + "&response_type=token";

		}

		//extract token from location.hash param aand store it in the localstorage
		service.storeToken = function(hash) {
			//url is lke : http://127.0.0.1/pocket-angularjs/#access_token=frbTaXdXcWSgHjEJ8cZM5U6WyrvoIJnmsl1AFFUXmO3YWlttz0&expires=0
			//we have to split it if we want to get the token only
			var access_token = hash.split('=')[1].split('&')[0];
			console.log(access_token);
			localStorage.setItem('deezer-access_token', access_token);
			console.log("deezerservice storeToken connected : " + service.isConnected());

			//add the access token to every http requests header
			$http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('deezer-access_token');
		}

		service.deezerLogout = function() {
			localStorage.removeItem('deezer-access_token');
			localStorage.removeItem('deezer-user_infos');
			console.log("deezerservice logout connected : " + service.isConnected());
		}



		return service;
	}])
