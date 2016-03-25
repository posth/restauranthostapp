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
            
            var parties = null;
            
            var service = {
                //To allow accessing the constructor
                Party: Party,
                //Property which uses function below to get parties based on unique user id
                getPartiesByUser: getPartiesByUser,
                reset: reset
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
            
            //This function gives us individual party objects, using the waitListController to get parties based on particlar user's id
            function getPartiesByUser(uid) {
                // If parties is null, then we create a $firebaseArray and set it equal to parties so that it isn't null anymore
                if (!parties) {
                    parties = $firebaseArray(firebaseDataService.users.child(uid).child('parties'));    
                }
                return parties;
            }
            
            function reset() {
                // purpose is to break the connection established by the $firebaseArray
                if (parties) {
                    //firebase method
                    parties.$destroy();
                    //reset the service to the way it was before
                    parties = null;
                }
            }
            
        }
})();