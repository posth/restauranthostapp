(function() {
    'use strict';
    
    angular
        //This returns the waitList module
        .module('app.waitList')
        //Create the controller on this module
        .controller('WaitListController', WaitListController);
    
    //Adding a dependency to the WaitListController function - this dependency comes from the angularfire.min.js
    //Last injection is the Party service 
    WaitListController.$inject = ['partyService', 'user'];
    
    //user injection allows us to access the return value of resolve user 
    function WaitListController(partyService, user) {
        //vm is for view model - this way we can reference this instance of our controller in different places in the code and it will be explicit that it is vm - we know we're pointing to the object instance of this controller - anything that is saved on vm will be accessible in the view
        var vm = this;

        //Wrap data inside an angular service, which is the dependency injected - placed it inside the vm object with this method so that it can be referenced inside the HTML
        vm.parties = partyService.getPartiesByUser(user.uid);
       
    }
    
})();