(function() { 'use strict';

    angular
        .module('auth')
        .controller('SignupController', SignupController);

    /**
     * @type {string[]}
     */
    SignupController.$inject = ['$controller', 'authService'];

    /**
     * @param $controller
     * @param authService
     * @constructor
     */
    function SignupController($controller, authService) {
        var vm = this;
        vm.signup = signup;

        function signup() {
            authService
                .signup({
                    name: vm.name,
                    email: vm.email,
                    password: vm.password,
                    passwordConfirmation: vm.passwordConfirmation
                })
                .then(success, error);
        }

        /**
         * User successfully registered, now log in.
         */
        function success() {
            $controller('LoginController')
                .login({
                    email: vm.email,
                    password: vm.password
                });
        }

        /**
         * Error registering user.
         *
         * @param res
         */
        function error(res) {
            if (res.data && !res.data.error) { // Validation errors
                vm.errors = res.data;
                console.log(vm.errors);
            } else if (res.data.error) { // Other server error
                vm.errors = res.data.error.message;
                console.log(vm.errors);
            }
        }
    }

})();