(function() {
    'use strict';
    
    angular
        .module('app.core')
        .factory('firebaseDataService', firebaseDataService);
    
    //Injecting the dependency of the firebase constant we'll need
    firebaseDataService.$inject = ['FIREBASE_URL'];
    
    function firebaseDataService(FIREBASE_URL) {
        //This represents the root of our firebase data - the top level of data
        var root = new Firebase(FIREBASE_URL);
        
        //Making the firebase object available to this service 
        var service = {
            root: root,
            users: root.child('users'),
            //Child method allows to go one level deeper in firebase data
            textMessages: root.child('textMessages')
        };
        
        return service;
        
    }
})();