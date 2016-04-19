(function () { 'use strict';

    angular
        .module('auth')
        .controller('PasswordResetController', PasswordResetController);

    /**
     * @type {string[]}
     */
    PasswordResetController.$inject = ['$rootScope', '$stateParams', 'authService'];

    /**
     * @param $rootScope
     * @param $stateParams
     * @param authService
     * @constructor
     */
    function PasswordResetController($rootScope, $stateParams, authService) {
        var vm = this;
        vm.resetPassword = resetPassword;

        /**
         * Reset users password.
         */
        function resetPassword() {
            authService
                .resetPassword($stateParams.token, {
                    token: $stateParams.token,
                    password: vm.password,
                    passwordConfirmation: vm.passwordConfirmation
                })
                .then(success, error);
        }

        /**
         * Password was successfully reset.
         *
         * @param res
         */
        function success(res) {
            vm.errors = [];

            $rootScope.$broadcast('input:success', {
                message: res.message
            });
        }

        /**
         * Password could not be reset.
         *
         * @param res
         */
        function error(res) {
            if (res.data && !res.data.error) { // Validation errors
                vm.errors = res.data;
            } else if (res.data.password) { // Other validation errors
                vm.errors = res.data.password;
                console.log(vm.errors);
            } else if (res.data.error) { // Other server errors
                $rootScope.$broadcast('input:error', {
                    message: res.data.error.message
                });
            }
        }
    }

})();