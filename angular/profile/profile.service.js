(function() { 'use strict';

    angular
        .module('profile')
        .factory('profileService', profileService);

    /**
     * @type {string[]}
     */
    profileService.$inject = ['$http', 'apiService', 'config'];

    /**
     * @param $http
     * @param apiService
     * @param config
     * @returns {{getUser: getUser}}
     */
    function profileService($http, apiService, config) {
        var service = {
            getUser: getUser
        };

        return service;

        function getUser(username) {
            return $http.get(config.url + '/profile/user/' + username)
                .then(apiService.handleSuccess, apiService.handleError);
        }
    }

})();