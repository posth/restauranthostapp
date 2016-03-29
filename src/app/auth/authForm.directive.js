(function() {
    'use strict';
    
    angular
        .module('app.auth')
        .directive('gzAuthForm', gzAuthForm);
    
    function gzAuthForm() {
        return {
            templateUrl: 'app/auth/authForm.html',
            restrict: 'E',
            controller: AuthFormController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                error: '=',
                //@ sign is to bind strings
                formTitle: '@',
                //bind function expression
                submitAction: '&'
            }
        };    
    }
    
    function AuthFormController() {
        var vm = this; 
        
        //making the user accessible through directive controller
        vm.user = {
            email: '',
            password: ''
        };
        
    }
    
})();