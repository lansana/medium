(function () { 'use strict';

    angular
        .module('settings')
        .factory('settingsPasswordService', settingsPasswordService);

    /**
     * @type {string[]}
     */
    settingsPasswordService.$inject = ['$http', 'config', 'apiService'];

    /**
     * @param $http
     * @param config
     * @param apiService
     * @returns {{changePassword: changePassword}}
     */
    function settingsPasswordService($http, config, apiService) {
        var service = {
            changePassword: changePassword
        };

        return service;

        function changePassword(credentials) {
            return $http.put(config.url + '/settings/password', credentials)
                .then(apiService.handleSuccess, apiService.handleError);
        }
    }

})();