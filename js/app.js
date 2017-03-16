var rosetta = angular.module('rosetta', [
    'ngRoute',
    'rosettaCtrl',
    'rosettaDirectives',
    'rosettaSrv'
]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: 'assets/partials/home.html',
                    controller: 'homeController'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);
