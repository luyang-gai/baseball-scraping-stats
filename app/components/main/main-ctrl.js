angular.module('BaseballStats')
	.controller('MainController',
	[
		'$scope',
		'$http',
		'$window',
		'$uibModal',
		function($scope, $http, $window, $modal) {
			$scope.orderProp = 'xFIP';
			$scope.playersArray = [];
			$scope.freeAgents = [];

			var espnData = '../../lib/espn/data.json';
			var fangraphsData = '../../lib/data.json';

			$scope.$watch("orderProp", function change(oldValue, newValue) {
				console.log('orderProp changed from: ' + oldValue + ' to ' + newValue);
			});

			$scope.order = function(orderProp) {
				$scope.reverse = ($scope.orderProp === orderProp) ? !$scope.reverse : false;
				$scope.orderProp = orderProp;
			};

			$scope.goToFangraphs = function(playerName) {
				$window.location.href = 'http://fangraphs.com/players.aspx?lastname=' + playerName;
			};

			$scope.openPlayerModal = function(player) {
				var modalInstance = $modal.open({
					templateUrl: 'app/components/player-modal/player-modal.html',
					controller: 'PlayerModalCtrl',
					backdrop: true,
					keyboard: false,
					size: 'lg',
					resolve: {
						player: function () {
							return player;
						}
					}
				});

				modalInstance.result.then(function(item) {

				}, function() {

				});
			};

			var init = function() {
				$http.get(espnData).then(function (freeAgents) {
					$http.get(fangraphsData).then(function (results) {
						filterData(freeAgents.data.data, results.data);
					});
				})
			};

			var filterData = function(freeAgents, allPlayers) {
				for (var player in allPlayers) {
					var freeAgentPlayer = checkIfPlayerIsFreeAgent(freeAgents, player)
					if (freeAgentPlayer && freeAgentPlayer.nextStart) {
						removeSlashForField(allPlayers[player]);
						allPlayers[player]['DL'] = freeAgentPlayer.dl;
						allPlayers[player]['nextStart'] = freeAgentPlayer.nextStart.replace("PP", "");
						$scope.playersArray.push(allPlayers[player]);
					}
				}
			};

			var checkIfPlayerIsFreeAgent = function(freeAgents, player) {
				for (var freeAgent in freeAgents) {
					if (freeAgents[freeAgent].name === player) {
						return freeAgents[freeAgent];
					}
				}
				return null;
			};


			var removeSlashForField = function(player) {
				player['K9'] = Number(player['K/9']);
				player['BB9'] = Number(player['BB/9']);
			};

			init();
		}
	]
);