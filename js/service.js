var rosettaSrv = angular.module('rosettaSrv', ['ngResource']);

rosettaSrv.factory('Auth', ['$resource',
    function ($resource) {
        return $resource('api/auth', { }, {
            post: {method: 'POST', isArray: false},
            get: {method: 'GET', isArray: false}
        });
    }]);

rosettaSrv.factory('Portal', ['$resource',
    function ($resource) {
        return $resource('api/portal/:method/:id', { method: "@method", id: "@id" }, {
            post: {method: 'POST', isArray: false},
            query: {method: 'GET', isArray: true},
            get: {method: 'GET', isArray: false}
        });
    }]);

rosettaSrv.factory('Vm', ['$resource',
    function ($resource) {
        return $resource('api/vm/:action/:id', { action: "@action", id: "@id" }, {
            query: {method: 'GET', isArray: true},
            get: {method: 'GET', isArray: false}
        });
    }]);
