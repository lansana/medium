(function() { 'use strict';

    angular
        .module('auth')
        .controller('LoginController', LoginController);

    /**
     * @type {string[]}
     */
    LoginController.$inject = ['$rootScope', '$state', 'userService', 'authService'];

    /**
     * @param $rootScope
     * @param $state
     * @param userService
     * @param authService
     * @constructor
     */
    function LoginController($rootScope, $state, userService, authService) {
        var vm = this;
        vm.login = login;

        /**
         * Log in with given credentials.
         *
         * @param credentials {email, password}
         */
        function login(credentials) {
            authService
                .login(credentials)
                .then(success, error);
        }

        /**
         * User successfully logged in on server; set user and go
         * to home state.
         *
         * @param res
         */
        function success(res) {
            userService.setUser(res.user);
            $state.go('app.home');
        }

        /**
         * User not logged in on server. Either validation errors
         * occurred, or something went wrong.
         *
         * @param res
         */
        function error(res) {
            if (res.data && !res.data.error) {
                vm.errors = res.data;
                console.log(vm.errors);
            } else if (res.data.error) {
                $rootScope.$broadcast('input:error', {
                    message: res.data.error.message
                });
            }
        }
    }

})();