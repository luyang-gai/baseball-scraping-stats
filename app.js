var routerApp = angular.module('BaseballStats', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('main', {
      url: '/home',
      templateUrl: 'app/components/main/main.html',
      controller: 'MainController'
    })
});
