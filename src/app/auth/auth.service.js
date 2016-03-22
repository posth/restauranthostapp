(function() {
    'use strict';
    
    angular
        .module('app.auth')
        .factory('authService', authService);
    
    //Injecting the firebase auth service
    authService.$inject = ['$firebaseAuth', 'firebaseDataService'];
    
    function authService($firebaseAuth, firebaseDataService) {
        
        //firebaseDataService root property that is returned from the service is the firebase URL
        var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);
        
        //The register function below is the property of this object which this service returns
        var service = {
            //to only load the waitlist if the user is logged in, this propert is given to the service's object
            firebaseAuthObject: firebaseAuthObject,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        };
        
        return service;
        
        ///////////////
        
        function register(user) {
            //Creating a user using the unique firebase method from the $firebaseAuth injected service
            return firebaseAuthObject.$createUser(user);
        }
        
        function login(user) {
            //Unique firebase method
            return firebaseAuthObject.$authWithPassword(user);
        }
        
        function logout(user) {
            //Firebase method again to logout user
            return firebaseAuthObject.$unauth();
        }
        
        //function to let us know if a user is logged in or not
        function isLoggedIn() {
            //This will return a user object if the user is logged in, if they aren't, it will return null
            return firebaseAuthObject.$getAuth();
        }
        
    }
    
})();