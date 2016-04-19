(function() { 'use strict';

    angular
        .module('settings')
        .factory('settingsAccountService', settingsAccountService);

    /**
     * @type {string[]}
     */
    settingsAccountService.$inject = ['$http', 'apiService', 'config'];

    /**
     * @param $http
     * @param apiService
     * @param config
     * @returns {{updateUsername: updateUsername, updateBio: updateBio}}
     */
    function settingsAccountService($http, apiService, config) {
        var service = {
            updateUsername: updateUsername,
            updateBio: updateBio
        };

        return service;

        /**
         * Update users username.
         *
         * @param data
         * @returns {*}
         */
        function updateUsername(data) {
            return $http.put(config.url + '/settings/account/username', data)
                .then(apiService.handleSuccess, apiService.handleError);
        }

        /**
         * Update users bio.
         *
         * @param data
         * @returns {*}
         */
        function updateBio(data) {
            return $http.put(config.url + '/settings/account/bio', data)
                .then(apiService.handleSuccess, apiService.handleError);
        }
    }

})();