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
            controllerAs: 'vm',
            //The controller will only instantiate if this promise is resolved, if it's rejected, the controller won't load and the page won't load
            resolve: {user: resolveUser}
        });
    }
    
    //Injected to the function below the authService
    resolveUser.$inject = ['authService'];
    
    
    //ensures you are logged in before it loads the controller
    function resolveUser(authService) {
        //if the user is logged in, it will return the logged in user
        return authService.firebaseAuthObject.$requireAuth();
    }
    
})();