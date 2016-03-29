(function() {
    'use strict';
    
    angular
        //This returns the auth module
        .module('app.auth')
        .controller('AuthController', AuthController);
    
    //Injecting the angular dependency for routing and our own authentication service which has firebase details
    AuthController.$inject = ['$location', 'authService'];
    
    function AuthController($location, authService) {
        
        //Angular style guide recommendation - so we know exactly what this is referring to 
        var vm = this;
        
     
        
        //for error messages
        vm.error = null;
     
        //Expose the function to the HTML view
        vm.register = register;
        
        //Adding the login function to the view model in the HTML
        vm.login = login;
                
        function register(user) {
            //$createUser is a method that firebaseAuth provides, which takes a user object
            return authService.register(user)
            //Promises in a nutshell below, where it communicates with the server and two outcomes can happen:
                .then(function() {
                //1. Success: Firebase creates the new user.
                //Run a success function - then. 
                    vm.login(user);
                })
                //send welcome email
                .then(function() {
                    return authService.sendWelcomeEmail(user.email);
                })
                .catch(function(error){
                //2. Error: Firebase can't create the new user because the username already exists, for example
                //Run an error function - catch.
                    vm.error = error;
                });
        }    
        
        function login(user) {

            return authService.login(user)
                .then(function(loggedInUser){
                //Success function
                console.log(loggedInUser);
                //Redirecing users once they succesfully login
                $location.path('/waitList');
            })
                .catch(function(error){
                //Error function
                vm.error = error;
            });
        }
        
    }
    
})();