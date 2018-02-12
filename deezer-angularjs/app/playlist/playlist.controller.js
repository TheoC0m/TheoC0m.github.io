angular.module('DeezerAngularJS')
	.controller('PlaylistController', ['$scope', '$location', '$routeParams', 'PlaylistService', '$mdDialog', '$mdToast',
		function($scope, $location, $routeParams, PlaylistService, $mdDialog, $mdToast) {


			$scope.getUserPlaylists = function() {
				$scope.loading = true;
				PlaylistService.getUserPlaylists().then(function(response) {
					if (response != undefined) {
						$scope.userPlaylists = response;
						console.log($scope.userPlaylists);
					}
					$scope.loading = false;
				})
			}


			$scope.getPlaylist = function(playlistId) {
				$scope.loading = true;
				PlaylistService.getPlaylist(playlistId).then(function(response) {
					if (response != undefined) {
						$scope.playlist = response;
						console.log($scope.playlist);
					}
					$scope.loading = false;
				})
			}

			$scope.addUserPlaylist = function(title) {
				$scope.loading = true;
				PlaylistService.addUserPlaylist(title).then(function(response) {
					if (response != undefined) {
						//$scope.playlist = response;
						console.log(response);
					}
					$scope.loading = false;
					$mdToast.show(
						$mdToast.simple()
						.position('top left')
						.textContent('Playlist added')
						.hideDelay(3000)
					);
					$scope.getUserPlaylists();
				})
			}

			$scope.addSongsToPlaylist = function(tracks) {
				$scope.loading = true;
				PlaylistService.addSongsToPlaylist(tracks, $scope.playlistId).then(function(response) {
					if (response != undefined) {
						//$scope.playlist = response;
						console.log(response);
						$mdToast.show(
							$mdToast.simple()
							.position('top left')
							.textContent('Song(s) added to the playlist')
							.hideDelay(3000)
						);
					}
					$scope.loading = false;

					$scope.getPlaylist($scope.playlistId);
				})

			}





			$scope.addPlaylistDialog = function(ev) {

				//if this is the general playlists list view
				if ($scope.userPlaylists && !$scope.playlist) {

					var confirm = $mdDialog.prompt()
						.title('Create a new Playlist')
						.textContent('Name of the new playlist')
						.placeholder('playlist title')
						.ariaLabel('Playlist title')
						.initialValue('')
						.targetEvent(ev)
						.required(true)
						.ok('Create')
						.cancel('Cancel');

					$mdDialog.show(confirm).then(function(result) {
						//$scope.status = 'You decided to name your dog ' + result + '.';
						$scope.addUserPlaylist(result);
					}, function() {
						$mdToast.show(
							$mdToast.simple()
							.textContent('cancelled')
							.hideDelay(3000)
						);
					});

				}
				// if this is a specific playlist view
				if (!$scope.userPlaylists && $scope.playlist) {

					//if playlist's creator is not the current user
					if ($scope.playlist.creator.id != $scope.currentUserId) {
						$mdToast.show(
							$mdToast.simple()
							.textContent("Can't add songs to other user's playlists")
							.hideDelay(3000)
						);
					} else {


						$mdDialog.show({
								controller: 'DialogAddSongController',
								templateUrl: 'app/playlist/dialogAddSong.tmpl.html',
								parent: angular.element(document.body),
								targetEvent: ev,
								clickOutsideToClose: true,
								fullscreen: true,
							})
							.then(function(tracks) {
								console.log('You added song : ' + tracks);
								$scope.addSongsToPlaylist(tracks);
							}, function() {
								console.log('You cancelled the dialog.');
							});


					}
				}
			};


			$scope.previousPage = function() {
				window.history.back();
			}


			$scope.start = function() {
				$scope.playlistId = null;
				$scope.userPlaylists = null;
				$scope.playlist = null;
				$scope.textSearched = undefined;
				$scope.loading = true;
				$scope.customFullscreen = false;
				$scope.currentUserId = angular.fromJson(localStorage.getItem('deezer-user_infos')).id;





				if ($routeParams.playlistId) {
					console.log($routeParams.playlistId);
					$scope.playlistId = $routeParams.playlistId;
					$scope.getPlaylist($scope.playlistId);

				} else {


					$scope.getUserPlaylists();
				}

			}

			$scope.start();


		}
	])
