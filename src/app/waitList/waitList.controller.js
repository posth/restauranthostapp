(function() {
    'use strict';
    
    angular
        //This returns the waitList module
        .module('app.waitList')
        //Create the controller on this module
        .controller('WaitListController', WaitListController);
    
    //Adding a dependency to the WaitListController function - this dependency comes from the angularfire.min.js
    //Last injection is the Party service 
    WaitListController.$inject = ['textMessageService', 'partyService', 'user'];
    
    //user injection allows us to access the return value of resolve user 
    function WaitListController(textMessageService, partyService, user) {
        //vm is for view model - this way we can reference this instance of our controller in different places in the code and it will be explicit that it is vm - we know we're pointing to the object instance of this controller - anything that is saved on vm will be accessible in the view
        var vm = this;
        
        //Log user to the console
        console.log(user);
                
        //New Party constructor from the injected service
        vm.newParty = new partyService.Party();
        
        //Wrap data inside an angular service, which is the dependency injected - placed it inside the vm object with this method so that it can be referenced inside the HTML
        vm.parties = partyService.getPartiesByUser(user.uid);
        
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
            //Using the injected textMessage service, and its function to send a text to the party - it has 2 parameters
            textMessageService.sendTextMessage(party, vm.parties);
        }
        
        function toggleDone(party) {
            //Grab the parties from firebase array - $save is a firebase method - $save saves local changes to firebase
            vm.parties.$save(party);
        }
    }
    
})();