(function() {
    'use strict';
    
    angular
        .module('app.waitList')
        .directive('gzPartyForm', gzPartyForm);
    
    function gzPartyForm() {
        //factory function which returns a directive object with different properties and options to how we want the directive configured
        return {
            templateUrl: 'app/waitList/directives/partyForm.html',
            restrict: 'E',
            controller: PartyFormController,
            controllerAs: 'vm',
            //binds properties in the isolate scope to the controller
            bindToController: true,
            scope: {
                //pass a property to the scope of this controller
                parties: '='
            }
        };
    }
    
    PartyFormController.$inject = ['partyService'];
    
    function PartyFormController(partyService) {     
        var vm = this;
        
        vm.newParty = new partyService.Party();
        vm.addParty = addParty;
        
        function addParty() {
            //Method in firebaseArrays is $add which will add the new party 
            vm.parties.$add(vm.newParty);
            
            //This will clear the form after you add a party
            vm.newParty = new partyService.Party();
        }
        
    }
    
})();