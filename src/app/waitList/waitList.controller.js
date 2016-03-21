(function() {
    'use strict';
    
    angular
        //This returns the waitList module
        .module('app.waitList')
        //Create the controller on this module
        .controller('WaitListController', WaitListController);
    
    //Adding a dependency to the WaitListController function - this dependency comes from the angularfire.min.js
    //Last injection is the Party service 
    WaitListController.$inject = ['FIREBASE_URL', 'partyService'];
    
    function WaitListController(FIREBASE_URL, partyService) {
        //vm is for view model - this way we can reference this instance of our controller in different places in the code and it will be explicit that it is vm - we know we're pointing to the object instance of this controller - anything that is saved on vm will be accessible in the view
        var vm = this;
        
        //Make a connection to firebase database you have setup at firebase 
        //Added the parties extension to the firebase URL to organize the data a bit more
        //This is commented out since it's beeing brought in by the injected partyService service at the top - refactored
        //        var fireParties = new Firebase(FIREBASE_URL + 'parties');
        
        //Where we'll be saving our text messages
        var fireTextMessages = new Firebase(FIREBASE_URL + 'textMessages');
                
        //New Party constructor from the injected service
        vm.newParty = new partyService.Party();
        
        //Wrap data inside an angular service, which is the dependency injected - placed it inside the vm object with this method so that it can be referenced inside the HTML
        vm.parties = partyService.parties;
        
        //To save this function to the view model so that the view can access it in the HTML
        vm.addParty = addParty;
        
        //Removing the party - calling a function defined at the bottom of the file
        vm.removeParty = removeParty;
        
        //Sending text message - function placed inside variable
        vm.sendTextMessage = sendTextMessage;
        
        //Toggle done
        vm.toggleDone = toggleDone;
        
        function addParty() {
            //Method in firebaseArrays is $add which will add the new party 
            vm.parties.$add(vm.newParty);
            
            //This will clear the form after you add a party
            vm.newParty = new partyService.Party();
        }
        
        function removeParty(party) {
            //Firebase array has remove method - need to provide it a record/index
            vm.parties.$remove(party);
        }
        
        function sendTextMessage(party) {
            //Constructing the object we'll save in Firebase
            var newTextMessage = {
                phoneNumber: party.phone,
                size: party.size,
                name: party.name
            };
            
            //This will the above object to firebase
            fireTextMessages.push(newTextMessage);
            
            //Update the notified variable in the column
            party.notified = true;
            
            //Have save the changes firebase to update the data
            vm.parties.$save(party);
        }
        
        function toggleDone(party) {
            //Grab the parties from firebase array - $save is a firebase method - $save saves local changes to firebase
            vm.parties.$save(party);
        }
    }
    
})();