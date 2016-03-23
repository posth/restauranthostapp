//Immediately Invoked Function Expression Standard - Angular JohnPapa standard - place code inside a function that you run immediately.  This prevents conflicts in variables which may occur not ony in the source JS code you write, but in third party libraries you bring in.  The code is only visible in this file and won't leak into other parts of your application
(function() {
    'use strict';
    
    angular
        .module('app', [
        //Angular modules.
        'ngRoute',
        
        //Third party modules
        'firebase',
        
        //Custom modules
        'app.landing',
        'app.waitList',
        'app.auth',
        'app.core',
        'app.layout'
    ]);   
      
})();
