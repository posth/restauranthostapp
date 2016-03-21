(function() {
    'use strict';
    
    angular
        //The module you want to attach the service too
        .module('app.core')
        //Registering the service - name it and a function that is ran when the service is created - will return an object when it is ran
        .factory('partyService', partyService);
    
        //Injecting firebaseArray service
        partyService.$inject = ['$firebaseArray', 'firebaseDataService'];
    
        function partyService($firebaseArray, firebaseDataService) {
            
            var service = {
                //To allow accessing the constructor
                Party: Party,
                //Property to give access to firebase parties - firebaseArray takes in a firebaseDataService (object) - the child method makes it go a data level deeper in firebase, which in this case is parties
                parties: $firebaseArray(firebaseDataService.root.child('parties'))
            };
            
            return service;
            
            ///////////////////////
            
            //Constructor function
            function Party() {
                this.name = '';
                this.phone = '';
                this.size = '';
                //Has this party been served?
                this.done = false;
                //Have they received a SMS message?
                this.notified = false;
            }
            
        }
})();