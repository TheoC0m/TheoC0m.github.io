angular.module('DeezerAngularJS')
	.controller('DialogAddSongController', ['$scope', '$mdDialog', 'PlaylistService', function($scope, $mdDialog, PlaylistService) {


		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.add = function(tracks) {

			$mdDialog.hide(tracks);
		};


		$scope.searchTrack = function() {
			$scope.loading = true;
			PlaylistService.searchTrack($scope.trackSearched).then(function(response) {
				if (response != undefined) {
					//$scope.playlist = response;
					console.log(response);
					$scope.foundTracks = response
				}
				$scope.loading = false;
				// $scope.getUserPlaylists();
			})
		}


		$scope.selectTrack = function(song){
			//check if song exists in the array
			var index = $scope.selectedTracks.indexOf(song.id);
			if(index != -1){
				//if song is in the Array : remove it
				 $scope.selectedTracks.splice(index, 1);
			}
			else{
				//else : add it
				$scope.selectedTracks.push(song.id);
			}

			console.log($scope.selectedTracks);


		}

		$scope.start = function() {
			$scope.trackSearched = undefined;
			$scope.selectedTracks = new Array();
			$scope.foundTracks = undefined;
			$scope.loading = false;
		}

		$scope.start();



	}])
