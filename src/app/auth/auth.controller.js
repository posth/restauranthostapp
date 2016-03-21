(function() {
    'use strict';
    
    angular
        //This returns the auth module
        .module('app.auth')
        .controller('AuthController', AuthController);
    
    //Inject the dependency of the firebase authentication
    //Also injected our own service for the FIREBASE_URL from the constants 
    AuthController.$inject = ['$location', '$firebaseAuth', 'FIREBASE_URL'];
    
    function AuthController($location, $firebaseAuth, FIREBASE_URL) {
        
        //Angular style guide recommendation - so we know exactly what this is referring to 
        var vm = this;
        
        //Firebase references to be able to connect to the firebase application
        var firebaseReference = new Firebase(FIREBASE_URL);
        
        //Create firebase auth object, and will have all firebase authentication methods on it
        var firebaseAuthObject = $firebaseAuth(firebaseReference);
        
        vm.user = {
            email: '',
            password: ''
        };
     
        //Expose the function to the HTML view
        vm.register = register;
        
        //Adding the login function to the view model in the HTML
        vm.login = login;
        
        vm.logout = logout;
        
        function register(user) {
            //$createUser is a method that firebaseAuth provides, which takes a user object
            return firebaseAuthObject.$createUser(user)
            //Promises in a nutshell below, where it communicates with the server and two outcomes can happen:
                .then(function() {
                //1. Success: Firebase creates the new user.
                //Run a success function - then. 
                    vm.login(user);
                })
                .catch(function(error){
                //2. Error: Firebase can't create the new user because the username already exists, for example
                //Run an error function - catch.
                    console.log(error);
                });
        }    
        
        function login(user) {
            //Unique firebase method
            return firebaseAuthObject.$authWithPassword(user)
                .then(function(loggedInUser){
                //Success function
                console.log(loggedInUser);
                //Redirecing users once they succesfully login
                $location.path('/waitList');
            })
                .catch(function(error){
                //Error function
                console.log(error);
            });
        }
        
        function logout() {
            //Firebase method
            firebaseAuthObject.$unauth();
            
            //Redirecting users after logging out
            $location.path('/');
        }
    }
    
})();