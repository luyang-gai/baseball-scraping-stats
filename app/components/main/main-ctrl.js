angular.module('BaseballStats')
	.controller('MainController',
	[
		'$scope',
		'$http',
		'$window',
		function($scope, $http, $window) {
			$scope.orderProp = 'xFIP';
			$scope.playersArray = [];
			$scope.freeAgents = [];

			$scope.$watch("orderProp", function change(oldValue, newValue) {
				console.log('orderProp changed from: ' + oldValue + ' to ' + newValue);
			});

			$scope.order = function(orderProp) {
				$scope.reverse = ($scope.orderProp === orderProp) ? !$scope.reverse : false;
				$scope.orderProp = orderProp;
			};

			$scope.goToFangraphs = function(playerName) {
				$window.location.href = 'http://fangraphs.com/players.aspx?lastname=' + playerName;
			}

			var init = function() {
				$http.get('../../lib/espn/data.json').then(function (freeAgents) {
					$http.get('../../lib/data.json').then(function (results) {
						filterData(freeAgents.data.data, results.data);
					});
				})
			};

			var getESPNData = function() {
				return $http.get('../../lib/espn/data.json');
			};

			var getFangraphsData = function() {
				return $http.get('../../lib/data.json');
			};

			var filterData = function(freeAgents, allPlayers) {
				for (var player in allPlayers) {
					var freeAgentPlayer = checkIfPlayerIsFreeAgent(freeAgents, player)
					if (freeAgentPlayer && freeAgentPlayer.nextStart) {
						removeSlashForField(allPlayers[player]);
						allPlayers[player]['DL'] = freeAgentPlayer.dl;
						allPlayers[player]['nextStart'] = freeAgentPlayer.nextStart;
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