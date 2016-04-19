(function() { 'use strict';

    angular
        .module('auth')
        .controller('PasswordForgotController', PasswordForgotController);

    /**
     * @type {string[]}
     */
    PasswordForgotController.$inject = ['$rootScope', 'authService'];

    /**
     * @param $rootScope
     * @param authService
     * @constructor
     */
    function PasswordForgotController($rootScope, authService) {
        var vm = this;
        vm.sendResetLink = sendResetLink;

        /**
         * Send password reset link to users email.
         */
        function sendResetLink() {
            authService
                .sendResetLink({email: vm.email})
                .then(success, error);
        }

        /**
         * Password reset link successfully sent.
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
         * Error sending password reset link.
         *
         * @param res
         */
        function error(res) {
            if (res.data && !res.data.error) { // Validation errors
                vm.errors = res.data;
                console.log(vm.error);
            } else if (res.data.error) { // Can't find account with email
                $rootScope.$broadcast('input:error', {
                    message: res.data.error.message
                });
            }
        }
    }

})();