//This is used to configure the routing of the landing page of the application
(function() {
    'use strict';
    
    //Want to add configuration to the landing page module
    angular
        //This will return the app.landing module
        .module('app.landing')
        //This will be runned on the app.landing module
        .config(configFunction)
    
    //Route provider allows us to specify where the app should go based on the URl you go to - Here it is injected into the function so that it's able to be used
    configFunction.$inject = ['$routeProvider'];
    
    //Function created here and passed to the config method above so that we don't have a large anonymous function created 
    //Route provider is injected and passed as a parameter to the function so that it can be used
    function configFunction($routeProvider) {
        $routeProvider.when('/', {
            //When you go to the / URl, you feed the URL below
            templateUrl: 'app/landing/landing.html'
        });
    }
    
})();