(function() {
    'use strict';
    
    angular
        //Without the dependency array, we will grab that existing module, with it, you make a new module
        .module('app.core')
        //Creating a service that is attached to the core module
        .constant('FIREBASE_URL', 'https://waitandeatposth.firebaseio.com/');
})();