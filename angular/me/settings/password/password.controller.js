(function () { 'use strict';

    angular
        .module('settings')
        .controller('SettingsPasswordController', SettingsPasswordController);

    /**
     * @type {string[]}
     */
    SettingsPasswordController.$inject = ['$rootScope', 'settingsPasswordService'];

    /**
     * @param $rootScope
     * @param settingsPasswordService
     * @constructor
     */
    function SettingsPasswordController($rootScope, settingsPasswordService) {
        var vm = this;
        vm.submit = submit;

        function submit() {
            settingsPasswordService.changePassword({
                username: $rootScope.currentUser.username,
                email: $rootScope.currentUser.email,
                password: vm.password,
                newPassword: vm.newPassword,
                newPasswordConfirmation: vm.newPasswordConfirmation
            }).then(success, error);
        }

        /**
         * Successfully updated password.
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
         * Error updating password.
         *
         * @param res
         */
        function error(res) {
            if (res.data && !res.data.error) { // Validation errors
                vm.errors = res.data;
                console.log(vm.errors);
            } else if (res.data.error) { // Incorrect password
                $rootScope.$broadcast('input:error', {
                    message: res.data.error.message
                });
            }
        }
    }

})();