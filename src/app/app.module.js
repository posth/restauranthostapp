//Immediately Invoked Function Expression Standard - Angular JohnPapa standard - place code inside a function that you run immediately.  This prevents conflicts in variables which may occur not ony in the source JS code you write, but in third party libraries you bring in.  The code is only visible in this file and won't leak into other parts of your application
(function() {
    'use strict';
    
    angular
        .module('app', [
        //Angular modules.
        'ngRoute',
        
        //Third party modules
        'firebase',
        
        //Custom modules
        'app.landing',
        'app.waitList',
        'app.auth',
        'app.core',
        'app.layout'
    ])
    .config(configFunction)
    .run(runFunction);   
    
    configFunction.$inject = ['$routeProvider'];
    
    //code to handle URLS we don't know about
    function configFunction($routeProvider) {
        
        $routeProvider.otherwise({
           redirectTo: '/' 
        });
    }
    
    //injecting angular services - rootScope
    runFunction.$inject = ['$rootScope', '$location'];
    
    //listens for route change errors, and when it finds it will send users back to the landing page
    function runFunction($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event, next, previous, error){
           if (error === "AUTH_REQUIRED") {
               $location.path('/');
           } 
        });
    }
      
})();
