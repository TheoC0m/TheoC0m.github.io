angular.module('DeezerAngularJS')
	.controller('HomeController', ['$scope', '$location', '$routeParams', '$mdDialog', 'DeezerService', 'MyUserService',
		function($scope, $location, $routeParams, $mdDialog, DeezerService, UserService) {







			$scope.start = function() {
				console.log("start");
				console.log("home start connected : " + DeezerService.isConnected());
				//console.log($routeParams);

				if ($routeParams.error_reason == "user_denied") {
					console.log("user denied access to the application");
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#home-view')))
						.clickOutsideToClose(true)
						.title('Error')
						.textContent("User denied application's access to the deezer account")
						.ariaLabel('Alert Dialog')
						.ok('Got it!')
					);
				}


			}

			$scope.start();




		}
	]);
