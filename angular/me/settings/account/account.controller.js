(function () { 'use strict';

    angular
        .module('settings')
        .controller('SettingsAccountController', SettingsAccountController);

    /**
     * @type {string[]}
     */
    SettingsAccountController.$inject = ['$rootScope', 'settingsAccountService', 'userService'];

    /**
     * @param $rootScope
     * @param settingsAccountService
     * @param userService
     * @constructor
     */
    function SettingsAccountController($rootScope, settingsAccountService, userService) {
        var vm = this;
        vm.updateUsername = updateUsername;
        vm.updateBio = updateBio;
        vm.username = $rootScope.currentUser.username;
        vm.bio = $rootScope.currentUser.bio;

        /**
         * Change users username.
         */
        function updateUsername() {
            settingsAccountService
                .updateUsername({username: vm.username})
                .then(success, error);
        }

        /**
         * Change users bio.
         */
        function updateBio() {
            settingsAccountService
                .updateBio({bio: vm.bio})
                .then(success, error);
        }

        /**
         * Successfully updated data.
         *
         * @param res
         */
        function success(res) {
            vm.errors = [];

            $rootScope.$broadcast('input:success', {
                message: res.message
            });

            userService.setUser(res.user);
        }

        /**
         * Error updating data.
         *
         * @param res
         */
        function error(res) {
            if (res.data && !res.data.error) { // Validation errors
                vm.errors = res.data;
            } else if (res.data.error) {
                $rootScope.$broadcast('input:error', {
                    message: res.data.error.message
                });
            }
        }
    }

})();