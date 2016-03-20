(function() {
    'use strict';
    
    angular
        .module('app.auth')
        .config(configFunction);
    
    configFunction.$inject = ['$routeProvider'];
    
    function configFunction($routeProvider) {
        //Routes take a string and a routing object of where it will go to
        $routeProvider.when('/register', {
            templateUrl: 'app/auth/register.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        });
        
        $routeProvider.when('/login', {
            templateUrl: 'app/auth/login.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        }); 
    }
    
})();