angular.module('DeezerAngularJS')
	.controller('MainController', ['$scope', '$location', '$routeParams', '$timeout', '$mdSidenav', '$log', 'DeezerService', 'MyUserService', '$mdToast',
		function($scope, $location, $routeParams, $timeout, $mdSidenav, $log, DeezerService, MyUserService, $mdToast) {


			$scope.toggleLeft = buildDelayedToggler('left');

			$scope.closeSideNav = function() {
				// Component lookup should always be available since we are not using `ng-if`
				$mdSidenav('left').close()
					.then(function() {
						$log.debug("close LEFT is done");
					});

			};

			function buildDelayedToggler(navID) {
				return debounce(function() {
					// Component lookup should always be available since we are not using `ng-if`
					$mdSidenav(navID)
						.toggle()
						.then(function() {
							$log.debug("toggle " + navID + " is done");
						});
				}, 200);
			}

			function debounce(func, wait, context) {
				var timer;

				return function debounced() {
					var context = $scope,
						args = Array.prototype.slice.call(arguments);
					$timeout.cancel(timer);
					timer = $timeout(function() {
						timer = undefined;
						func.apply(context, args);
					}, wait || 10);
				};
			}

			$scope.deezerLogin = function() {
				DeezerService.deezerLogin();
				$scope.connected = DeezerService.isConnected();
				console.log("nav afeter login click connected : " + $scope.connected);
			}
			$scope.deezerLogout = function() {
				DeezerService.deezerLogout();
				$scope.connected = DeezerService.isConnected();
				// clear url and redirect to the home page
				$location.path('/');
				console.log("nav after logout click connected : : " + $scope.connected);
				$mdToast.show(
					$mdToast.simple()
					.position('top left')
					.textContent('Logged out !')
					.hideDelay(1500)
				);
			}


			$scope.afterLogin = function() {

				//store token
				DeezerService.storeToken($location.hash());
				console.log("main start : " + DeezerService.isConnected());
				//update connected var (change login button to logout button and other ui stuff)
				$scope.connected = DeezerService.isConnected();

				// store user informations for an easyer access  everywhere (only one request needed)
				$scope.storeMe()
				$mdToast.show(
					$mdToast.simple()
					.position('top left')
					.textContent('Successfully logged in !')
					.hideDelay(1500)
				);
			}



			$scope.storeMe = function() {
				MyUserService.getMe()
					.then(function(response) {
						if (response != undefined) {
							$scope.userInfos = response;
							console.log($scope.userInfos);
							localStorage.setItem('deezer-user_infos', angular.toJson(response));
						}

					})
			}

			$scope.start = function() {

				//Boolean used to display either login or logout buttons and some other stuff
				$scope.connected = DeezerService.isConnected();
				//get user inofs from local storage (if it exists)
				$scope.userInfos = JSON.parse(localStorage.getItem('deezer-user_infos'));

				console.log($scope.userInfos);

				//if current url has an hash with access_token
				if ($location.hash().startsWith("access_token=")) {
					$scope.afterLogin();
					// clear url (remove access token uri fragment)
					$location.url($location.path('/'));
				}
			}

			$scope.start();




		}
	])
