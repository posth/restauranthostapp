(function() {
    'use strict';
    
    angular
        //the module you want to attach this directive to
        .module('app.layout')
        //directive function to create directive, takes string for name and function to define directive
        .directive('gzNavbar', gzNavbar);
    
    //gz prefix is custom to you to know which custom elements are yours
    function gzNavbar() {
        //expected to return directive definition object
        return {
           //reference file for template
          templateUrl: 'app/layout/navbar.html',
          //a way to tell angular how to use directive, in this case as an element
          restrict: 'E',
          //allows this directive to only access the data that is defined in this controller
          scope: {},
          //specifying controller for directive
          controller: NavbarController,
          controllerAs: 'vm'
        };
    }
    
    //injecting services
    NavbarController.$inject = ['$location', 'authService'];
    
    function NavbarController($location, authService) {
        var vm = this;
        
        //exposing to methods to the view model
        vm.isLoggedIn = authService.isLoggedIn;
        vm.logout = logout;
        
        function logout() {
            authService.logout();
            $location.path('/');
        }
    }
    
})();