(function() {
    'use strict';
    
    angular
        .module('app.core')
        //declaring the service factory
        .factory('textMessageService', textMessageService);
    
    //injected services into a service
    textMessageService.$inject = ['firebaseDataService'];
    
    function textMessageService(firebaseDataService) {
        //Create service object
        var service = {
            sendTextMessage: sendTextMessage
        };
        
        //Add properties to the object
        
        //return the object
        return service
        
        ////////////////////
        //parties is vm.parties as it is called from the controller and passed into the function
        function sendTextMessage(party, parties) {
            //Constructing the object we'll save in Firebase
            var newTextMessage = {
                phoneNumber: party.phone,
                size: party.size,
                name: party.name
            };
            
            //This will push the above object to firebase
            firebaseDataService.textMessages.push(newTextMessage);
            
            //Update the notified variable in the column
            party.notified = true;
            
            //Have save the changes firebase to update the data
            parties.$save(party);
        }
    }
})();