(function(){
    'use strict';
    
    angular
        .module('app.waitList')
        .config(configFunction);
    
    configFunction.$inject = ['$routeProvider'];
    
    function configFunction($routeProvider) {
        $routeProvider.when('/waitList', {
            templateUrl: 'app/waitList/waitList.html',
            //Including it for the waitlist module - these are new properties for the controller
            controller: 'WaitListController',
            //The property we can use to reference the object instance of the Controller in the HTML, which we can reference via 'vm'
            controllerAs: 'vm'
        });
    }
    
})();